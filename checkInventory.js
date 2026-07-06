const fs = require('fs');

try {
    const data = fs.readFileSync('database_payload.json', 'utf8');
    const items = JSON.parse(data);
    
    console.log("--- K.C.O MARKETPLACE INVENTORY SUMMARY ---");
    console.log(`Total Items Aggregated: ${items.length}`);
    
    // Grouping by Category
    const counts = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});
    
    console.table(counts);
    console.log("------------------------------------------");
} catch (error) {
    console.log("Database payload not found. Run dbSeeder.js first!");
}