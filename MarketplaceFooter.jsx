import React from 'react';

const MarketplaceFooter = () => {
    return (
        <footer className="kco-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About K.C.O</h3>
                    <p>The premier marketplace for luxury automotive and exclusive goods.</p>
                </div>
                <div className="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li>24/7 Customer Service</li>
                        <li>Worldwide Shipping</li>
                        <li>Buyer Protection</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Policy</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <p>Connect with us on social media for exclusive updates.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} K.C.O Vehicle Group. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default MarketplaceFooter;