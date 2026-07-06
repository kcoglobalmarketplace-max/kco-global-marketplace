import React, { useState } from 'react';

export default function PaymentGateway({ total, currency, symbol, onPaymentSuccess, onClose }) {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({ name: '', number: '', expiry: '', cvc: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate high-security enterprise verification terminal lag
        setTimeout(() => {
            setIsProcessing(false);
            const receiptId = 'KCO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            onPaymentSuccess(receiptId);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f172a] border border-gray-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
                    &times;
                </button>

                <div className="mb-6">
                    <h2 className="text-lg font-black text-white uppercase tracking-wider">K.C.O. Clearing Terminal</h2>
                    <p className="text-xs text-gray-400 mt-1">
                        Secure transaction amount: <span className="text-orange-500 font-bold">{symbol}{total.toLocaleString()} {currency}</span>
                    </p>
                </div>

                {/* Navigation Method Selector Tabs */}
                <div className="flex border-b border-gray-800 mb-6 text-xs font-bold uppercase tracking-wider">
                    <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 pb-3 text-center ${paymentMethod === 'card' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Card</button>
                    <button type="button" onClick={() => setPaymentMethod('crypto')} className={`flex-1 pb-3 text-center ${paymentMethod === 'crypto' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Crypto</button>
                    <button type="button" onClick={() => setPaymentMethod('wire')} className={`flex-1 pb-3 text-center ${paymentMethod === 'wire' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Wire</button>
                </div>

                {isProcessing ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs text-gray-400 animate-pulse uppercase tracking-widest font-mono">Securing Gateway Assets...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        {paymentMethod === 'card' && (
                            <>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-400 mb-1">Cardholder Name</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-400 mb-1">Card Number</label>
                                    <input type="text" required placeholder="•••• •••• •••• ••••" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 font-mono" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase font-bold text-gray-400 mb-1">Expiry</label>
                                        <input type="text" required placeholder="MM/YY" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 font-mono" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold text-gray-400 mb-1">CVC</label>
                                        <input type="text" required placeholder="•••" value={formData.cvc} onChange={e => setFormData({...formData, cvc: e.target.value})} className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 font-mono" />
                                    </div>
                                </div>
                            </>
                        )}

                        {paymentMethod === 'crypto' && (
                            <div className="bg-[#1e293b] border border-gray-800 p-4 rounded-xl text-center space-y-3">
                                <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center text-black font-black">QR Code Block</div>
                                <p className="text-[11px] text-gray-400 font-mono select-all bg-black/40 py-1.5 px-2 rounded break-all">0xKCO777MarketplaceRoutingEngineAddressTx993</p>
                                <p className="text-[10px] text-orange-400">Send equivalent asset values to settle allocation invoices immediately.</p>
                            </>
                        )}

                        {paymentMethod === 'wire' && (
                            <div className="bg-[#1e293b] border border-gray-800 p-4 rounded-xl space-y-2 text-xs font-mono text-gray-300">
                                <p><span className="text-gray-500">Bank:</span> K.C.O. Institutional Trust Clearing</p>
                                <p><span className="text-gray-500">Routing/Sort:</span> 99-88-77</p>
                                <p><span className="text-gray-500">Account No:</span> 777123456</p>
                                <p className="text-[10px] text-gray-500 mt-2 italic">Note: High-value assets like hypercars and luxury villas will hold escrow allocations for up to 48 hours waiting wire clearance verification.</p>
                            </>
                        )}

                        <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-wider rounded-lg transition mt-4">
                            Authorize Settlement
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}