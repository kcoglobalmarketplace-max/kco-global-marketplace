// backend/controllers/productController.js
const { buildQuery } = require('../utils/searchUtils');
const client = require('../config/elasticsearch'); // Assume client is initialized here

exports.searchProducts = async (req, res) => {
    const { filters, sort, pagination } = req.body;
    
    const esQuery = buildQuery(filters || []);
    
    const result = await client.search({
        index: 'products',
        body: {
            query: esQuery,
            sort: sort || [{ "_score": "desc" }], // Default sort by relevance
            from: ((pagination?.page || 1) - 1) * (pagination?.limit || 20),
            size: pagination?.limit || 20
        }
    });

    res.json({
        status: "success",
        data: {
            products: result.body.hits.hits.map(h => h._source),
            meta: { total: result.body.hits.total.value }
        }
    });
};