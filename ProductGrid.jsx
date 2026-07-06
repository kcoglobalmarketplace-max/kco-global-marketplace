import React from 'react';

export default function ProductGrid({ products, searchQuery, convertPrice, symbol, currency, onAddToCart }) {
    // Filter down items dynamically based on the global header search input text string
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition hover:border-gray-700">
                    
                    {/* Image Container Panel */}
                    <div className="h-48 w-full bg-gray-900 relative overflow-hidden group">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                                // Fallback image if a link ever breaks
                                e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500";
                            }}
                        />
                        <span className="absolute top-3 right-3 bg-black/70 text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Metadata & Action Control Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                            <h3 className="font-bold text-white tracking-wide text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Settlement Price</span>
                                <span className="text-base font-black text-orange-500 font-mono">
                                    {symbol}{convertPrice(product.priceUSD).toLocaleString()} <span className="text-[10px] text-gray-400 font-sans font-normal">{currency}</span>
                                </span>
                            </div>

                            <button 
                                onClick={() => onAddToCart(product)}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition"
                            >
                                Acquire
                            </button>
                        </div>
                    </div>

                </div>
            ))}

            {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-xs text-gray-500 uppercase tracking-widest font-mono">
                    No Assets Matching Query Matrix Found.
                </div>
            )}
        </div>
    );
}