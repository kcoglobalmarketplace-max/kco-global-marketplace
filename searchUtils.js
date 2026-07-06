// backend/utils/searchUtils.js

/**
 * Transforms client-side filters into an Elasticsearch Query DSL.
 * @param {Array} filters - Array of filter objects {field, operator, value}
 */
exports.buildQuery = (filters = []) => {
    const must = [];
    const filter = [];

    filters.forEach(({ field, operator, value }) => {
        switch (operator) {
            case 'match':
                must.push({ match: { [field]: value } });
                break;
            case 'range':
                filter.push({ range: { [field]: { gte: value.min, lte: value.max } } });
                break;
            case 'term':
                filter.push({ term: { [field]: value } });
                break;
            case 'nested':
                // Handles dynamic attributes (e.g., "Engine Size", "Property Type")
                filter.push({ nested: { path: "attributes", query: { term: { [`attributes.${field}`]: value } } } });
                break;
        }
    });

    return {
        bool: {
            must: must.length > 0 ? must : { match_all: {} },
            filter: filter
        }
    };
};