async updateInventory(id, newStock) {
    const client = await pgPool.connect();
    try {
        await client.query('BEGIN');
        
        // 1. Update Product
        await client.query('UPDATE products ...');
        
        // 2. Add to Outbox (The "Atomically Reliable" step)
        await client.query('INSERT INTO product_outbox (product_id) VALUES ($1)', [id]);
        
        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}