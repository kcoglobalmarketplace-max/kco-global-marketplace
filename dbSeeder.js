/**
 * Upserts a product into PostgreSQL and Elasticsearch.
 * @param {Object} product - The validated product object.
 * @returns {Promise<string>} - 'created' or 'updated'.
 */
async function upsertToDb(product) {
    const client = await pgPool.connect();
    try {
        await client.query('BEGIN');

        // 1. PostgreSQL Upsert
        // We use the EXCLUDED table to detect if an update occurred
        const query = `
            INSERT INTO products (id, data, updated_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (id) 
            DO UPDATE SET data = $2, updated_at = NOW()
            RETURNING (xmax = 0) AS is_insert;
        `;
        
        const res = await client.query(query, [product.id, JSON.stringify(product)]);
        const isInsert = res.rows[0].is_insert;

        // 2. Elasticsearch Upsert
        // We use the 'index' operation which functions as an upsert in ES
        await esClient.index({
            index: 'products',
            id: product.id,
            document: product,
            refresh: 'wait_for'
        });

        await client.query('COMMIT');
        
        return isInsert ? 'created' : 'updated';

    } catch (err) {
        await client.query('ROLLBACK');
        
        // Enhance error context
        err.context = { productId: product.id };
        throw err; 
    } finally {
        client.release();
    }
}