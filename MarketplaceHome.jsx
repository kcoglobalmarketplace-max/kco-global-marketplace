import React, { useState, useEffect } from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceInfoBar from './MarketplaceInfoBar';
import MarketplaceAdBanner from './MarketplaceAdBanner';
import ProductGrid from './ProductGrid';
import MarketplaceFooter from './MarketplaceFooter';
import PaymentGateway from './PaymentGateway';
import NotificationManager from './NotificationManager';
import productsData from './products.json';

export default function MarketplaceHome({ user, onLogout }) {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
    
    // Notification states
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    const [currency, setCurrency] = useState('USD');
    const [symbol, setSymbol] = useState('$');
    const [exchangeRates, setExchangeRates] = useState({ USD: 1 });

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => { if(data && data.rates) setExchangeRates(data.rates); })
            .catch(err => console.error("FX System Pipeline Offline", err));
        
        // Trigger welcome broadcast notification
        triggerNotification(`Secure session established for user sequence. Welcome back.`, 'success');
    }, []);

    const triggerNotification = (msg, type = 'success') => {
        setAlertMessage(msg);
        setAlertType(type);
    };

    const handleCurrencyChange = (newCountry, marketMap) => {
        const config = marketMap[newCountry] || { cur: "USD", sym: "$" };
        setCurrency(config.cur);
        setSymbol(config.sym);
        triggerNotification(`Terminal localized to currency matrix: ${config.cur}`, 'info');
    };

    const getConvertedPrice = (priceUSD) => {
        const rate = exchangeRates[currency] || 1;
        return Math.round(priceUSD * rate);
    };

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        triggerNotification(`Allocated "${product.name}" to your processing basket vector.`, 'success');
    };

    const handlePaymentSuccess = (receiptId) => {
        setIsPaymentGatewayOpen(false);
        setCart([]);
        triggerNotification(`Clearing authorized! Receipt assigned: ${receiptId}`, 'success');
    };

    const totalCartUSD = cart.reduce((sum, item) => sum + item.priceUSD, 0);
    const totalCartConverted = getConvertedPrice(totalCartUSD);

    return (
        <div className="min-h-screen bg-[#0b0f19] text-gray-100 selection:bg-orange-500 selection:text-black">
            <MarketplaceHeader 
                cartCount={cart.length} 
                onSearch={setSearchQuery} 
                onCartToggle={() => setIsCartOpen(!isCartOpen)} 
                onRegionChange={handleCurrencyChange}
            />
            
            <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-12">
                <MarketplaceAdBanner />
                <MarketplaceInfoBar />
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold uppercase tracking-tight text-white">Live Operations Inventory Grid</h2>
                        {onLogout && (
                            <button onClick={onLogout} className="text-xs text-red-400 font-mono hover:underline uppercase">
                                Terminate Session
                            </button>
                        )}
                    </div>
                    <ProductGrid 
                        products={productsData} 
                        searchQuery={searchQuery} 
                        convertPrice={getConvertedPrice} 
                        symbol={symbol} 
                        currency={currency}
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </main>

            {/* Slide-out Checkout Basket Drawer */}
            {isCartOpen && (
                <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#111827] border-l border-gray-800 z-50 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
                            <h3 className="font-bold text-white uppercase tracking-wider">Your Shopping Basket</h3>
                            <button onClick={() => setIsCartOpen(false)} className="text-xl">&times;</button>
                        </div>
                        <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between p-3 bg-gray-900 border border-gray-800 rounded-lg text-xs">
                                    <span>{item.name}</span>
                                    <span className="text-orange-500 font-bold">{symbol}{getConvertedPrice(item.priceUSD).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-4">
                        <div className="flex justify-between text-sm font-bold text-white mb-4">
                            <span>Estimated Total:</span>
                            <span>{symbol}{totalCartConverted.toLocaleString()} {currency}</span>
                        </div>
                        <button 
                            disabled={cart.length === 0}
                            onClick={() => { setIsCartOpen(false); setIsPaymentGatewayOpen(true); }}
                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 text-black font-black uppercase tracking-widest text-xs rounded-lg transition"
                        >
                            Open Payment Terminals
                        </button>
                    </div>
                </div>
            )}

            {/* Live Gateway Overlay */}
            {isPaymentGatewayOpen && (
                <PaymentGateway 
                    total={totalCartConverted} 
                    currency={currency} 
                    symbol={symbol} 
                    onPaymentSuccess={handlePaymentSuccess} 
                    onClose={() => setIsPaymentGatewayOpen(false)} 
                />
            )}

            {/* Global Broadcasting Alert Center Node */}
            <NotificationManager 
                message={alertMessage} 
                type={alertType} 
                onClose={() => setAlertMessage('')} 
            />

            <MarketplaceFooter />
        </div>
    );
}