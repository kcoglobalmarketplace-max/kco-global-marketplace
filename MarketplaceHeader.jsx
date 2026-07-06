import React from 'react';

export default function MarketplaceHeader({ cartCount, onSearch, onCartToggle, onRegionChange }) {
    
    // Complete global currency mapping dataset
    const baseMarkets = {
        US: { name: "United States", cur: "USD", sym: "$" },
        UK: { name: "United Kingdom", cur: "GBP", sym: "£" },
        EU: { name: "Eurozone", cur: "EUR", sym: "€" },
        CA: { name: "Canada", cur: "CAD", sym: "CA$" },
        AU: { name: "Australia", cur: "AUD", sym: "A$" },
        JP: { name: "Japan", cur: "JPY", sym: "¥" },
        CN: { name: "China", cur: "CNY", sym: "¥" },
        IN: { name: "India", cur: "INR", sym: "₹" },
        BR: { name: "Brazil", cur: "BRL", sym: "R$" },
        ZA: { name: "South Africa", cur: "ZAR", sym: "R" },
        AE: { name: "United Arab Emirates", cur: "AED", sym: "د.إ" },
        SA: { name: "Saudi Arabia", cur: "SAR", sym: "ر.س" },
        RU: { name: "Russia", cur: "RUB", sym: "₽" },
        KR: { name: "South Korea", cur: "KRW", sym: "₩" },
        MX: { name: "Mexico", cur: "MXN", sym: "$" },
        SG: { name: "Singapore", cur: "SGD", sym: "S$" },
        NZ: { name: "New Zealand", cur: "NZD", sym: "NZ$" },
        CH: { name: "Switzerland", cur: "CHF", sym: "CHF" },
        HK: { name: "Hong Kong", cur: "HKD", sym: "HK$" },
        SE: { name: "Sweden", cur: "SEK", sym: "kr" },
        NO: { name: "Norway", cur: "NOK", sym: "kr" },
        DK: { name: "Denmark", cur: "DKK", sym: "kr" },
        PL: { name: "Poland", cur: "PLN", sym: "zł" },
        TR: { name: "Turkey", cur: "TRY", sym: "₺" },
        AR: { name: "Argentina", cur: "ARS", sym: "$" },
        CL: { name: "Chile", cur: "CLP", sym: "$" },
        CO: { name: "Colombia", cur: "COP", sym: "$" },
        PE: { name: "Peru", cur: "PEN", sym: "S/." },
        ID: { name: "Indonesia", cur: "IDR", sym: "Rp" },
        MY: { name: "Malaysia", cur: "MYR", sym: "RM" },
        PH: { name: "Philippines", cur: "PHP", sym: "₱" },
        TH: { name: "Thailand", cur: "THB", sym: "฿" },
        VN: { name: "Vietnam", cur: "VND", sym: "₫" },
        EG: { name: "Egypt", cur: "EGP", sym: "E£" },
        GH: { name: "Ghana", cur: "GHS", sym: "GH₵" },
        KE: { name: "Kenya", cur: "KES", sym: "KSh" },
        MA: { name: "Morocco", cur: "MAD", sym: "DH" },
        PK: { name: "Pakistan", cur: "PKR", sym: "₨" },
        BD: { name: "Bangladesh", cur: "BDT", sym: "৳" },
        IL: { name: "Israel", cur: "ILS", sym: "₪" },
        UA: { name: "Ukraine", cur: "UAH", sym: "₴" },
        NZ: { name: "New Zealand", cur: "NZD", sym: "$" },
        // NIGERIA forced strictly second to last
        NG: { name: "Nigeria", cur: "NGN", sym: "₦" },
        // GLOBAL / CRYPTO fallback forced strictly last
        GL: { name: "Global Terminal", cur: "USD", sym: "🌐" }
    };

    // Convert the dictionary into a clean array layout to cleanly map out options
    const marketOptions = Object.keys(baseMarkets).map(key => ({
        code: key,
        ...baseMarkets[key]
    }));

    return (
        <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/80 backdrop-blur-md border-b border-gray-800 px-4 sm:px-8 lg:px-12 py-4">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Brand Identity Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-black font-black tracking-tighter text-sm">
                        KCO
                    </div>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-widest text-white">K.C.O. Marketplace</h1>
                        <p className="text-[9px] text-gray-500 uppercase tracking-tight font-mono">Secured Worldwide Node v2.6</p>
                    </div>
                </div>

                {/* Real-time Dynamic Inventory Search */}
                <div className="w-full md:w-96 relative">
                    <input 
                        type="text" 
                        placeholder="Search global assets matrix..." 
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full bg-[#111827] border border-gray-800 rounded-lg px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition font-mono"
                    />
                </div>

                {/* Regional Currency Selectors & Cart Operations */}
                <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
                    
                    {/* Localization Selector Node */}
                    <div className="flex items-center space-x-1.5 bg-[#111827] border border-gray-800 rounded-lg p-1 text-[11px] font-mono max-w-xs">
                        <span className="text-gray-500 px-1.5 uppercase font-bold text-[9px]">Market:</span>
                        <select 
                            onChange={(e) => onRegionChange(e.target.value, baseMarkets)}
                            className="bg-transparent text-gray-300 focus:outline-none cursor-pointer pr-1 max-w-[180px] truncate"
                        >
                            {marketOptions.map((market) => (
                                <option key={market.code} value={market.code} className="bg-[#111827]">
                                    {market.name} ({market.cur})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Interactive Cart Toggle Button */}
                    <button 
                        onClick={onCartToggle}
                        className="relative p-2.5 bg-[#111827] border border-gray-800 rounded-lg hover:border-gray-700 transition flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>

                </div>

            </div>
        </header>
    );
}