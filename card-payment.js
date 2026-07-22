// ============================================
// EVERYHANDLE MARKETPLACE - FLUTTERWAVE CARD PAYMENT
// ============================================

// Flutterwave Configuration
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-68077a508f28acedb751c074d1d55435-X';
const FLUTTERWAVE_SANDBOX = true; // Set to false for production

// Global State
let cardPaymentInitialized = false;
let currentTransactionRef = null;

// Initialize Flutterwave SDK
function initializeFlutterwave() {
  // Load Flutterwave inline script
  const script = document.createElement('script');
  script.src = 'https://checkout.flutterwave.com/v3.js';
  script.async = true;
  script.onload = () => {
    console.log('✅ Flutterwave SDK loaded successfully');
    cardPaymentInitialized = true;
  };
  script.onerror = () => {
    console.error('❌ Failed to load Flutterwave SDK');
  };
  document.head.appendChild(script);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeFlutterwave();
});

// Process Card Payment
function processCardPayment() {
  if (!cardPaymentInitialized || typeof FlutterwaveCheckout === 'undefined') {
    showToast('⚠️ Payment system is loading. Please try again in a moment.', 'warning');
    return;
  }

  // Get order and customer information
  const order = getOrderData();
  
  if (!order) {
    showToast('⚠️ No order found. Please start checkout again.', 'error');
    setTimeout(() => {
      window.location.href = 'showroom.html';
    }, 2000);
    return;
  }

  // Generate unique transaction reference
  currentTransactionRef = generateTransactionRef();
  
  // Prepare Flutterwave payment data
  const paymentData = {
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: currentTransactionRef,
    amount: parseFloat(order.amount) || 100,
    currency: order.currency || 'USD',
    country: order.country || 'US',
    payment_options: 'card,banktransfer',
    redirect_url: getRedirectUrl(),
    meta: {
      order_id: order.orderId,
      customer_id: order.customerId || 'guest'
    },
    customer: {
      email: order.customerEmail,
      phone_number: order.customerPhone,
      name: order.customerName
    },
    customizations: {
      title: 'EveryHandle Marketplace',
      description: `Payment for ${order.productName || 'Account Purchase'}`,
      logo: getLogoUrl()
    },
    callback: function(response) {
      // Payment successful callback
      handlePaymentSuccess(response);
    },
    onclose: function() {
      // Payment modal closed callback
      handlePaymentClose();
    }
  };

  // Open Flutterwave payment modal
  try {
    FlutterwaveCheckout(paymentData);
  } catch (error) {
    console.error('Payment error:', error);
    showToast('⚠️ Failed to initialize payment. Please try again.', 'error');
  }
}

// Get Order Data from localStorage
function getOrderData() {
  try {
    const orderData = localStorage.getItem('currentOrder');
    if (orderData) {
      return JSON.parse(orderData);
    }
  } catch (error) {
    console.error('Error parsing order data:', error);
  }
  return null;
}

// Generate Transaction Reference
function generateTransactionRef() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `EH-${timestamp}-${random}`;
}

// Get Redirect URL
function getRedirectUrl() {
  // Return to payment page with success parameter
  return `${window.location.origin}${window.location.pathname.replace('payment.html', '')}order-success.html`;
}

// Get Logo URL
function getLogoUrl() {
  // Use a placeholder or your actual logo URL
  return `${window.location.origin}${window.location.pathname.replace('payment.html', '')}logo.png`;
}

// Handle Payment Success
function handlePaymentSuccess(response) {
  console.log('✅ Payment successful:', response);

  // Verify payment (in production, verify on backend)
  const paymentVerified = verifyPayment(response);

  if (paymentVerified) {
    // Save successful payment record
    saveSuccessfulPayment(response);

    // Clear current order from localStorage
    localStorage.removeItem('currentOrder');

    // Show success message
    showToast('✓ Payment successful! Redirecting...', 'success');

    // Redirect to success page after short delay
    setTimeout(() => {
      redirectToSuccessPage(response);
    }, 1500);
  } else {
    showToast('⚠️ Payment verification failed. Please contact support.', 'error');
  }
}

// Handle Payment Close (user closed modal without completing)
function handlePaymentClose() {
  console.log('ℹ️ Payment modal closed');
  showToast('ℹ️ Payment cancelled. You can try again.', 'warning');
}

// Verify Payment (Client-side verification - in production, do this on backend)
function verifyPayment(response) {
  // In production, you should verify the payment on your backend
  // This is a simplified client-side check
  
  if (!response || !response.status) {
    return false;
  }

  // Check if transaction was successful
  if (response.status === 'successful' || response.status === 'completed') {
    return true;
  }

  return false;
}

// Save Successful Payment Record
function saveSuccessfulPayment(response) {
  const order = getOrderData();
  
  const paymentRecord = {
    id: generatePaymentId(),
    orderId: order ? order.orderId : 'N/A',
    transactionRef: currentTransactionRef,
    flutterwaveTxId: response.tx_id || response.transaction_id,
    amount: response.amount,
    currency: response.currency,
    status: 'successful',
    paymentMethod: 'card',
    customerName: order ? order.customer.name : 'N/A',
    customerEmail: order ? order.customer.email : 'N/A',
    customerPhone: order ? order.customer.phone : 'N/A',
    productName: order ? order.productName : 'N/A',
    timestamp: new Date().toISOString(),
    response: response
  };

  // Get existing records
  const records = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
  records.push(paymentRecord);

  // Save to localStorage
  localStorage.setItem('paymentRecords', JSON.stringify(records));
  
  console.log('💾 Payment record saved:', paymentRecord);
}

// Redirect to Success Page
function redirectToSuccessPage(response) {
  const order = getOrderData();
  
  // Build success page URL with parameters
  const params = new URLSearchParams({
    orderId: order ? order.orderId : 'N/A',
    transactionRef: currentTransactionRef,
    amount: response.amount,
    currency: response.currency,
    paymentMethod: 'ATM/Debit/Credit Card',
    customerEmail: order ? order.customer.email : '',
    timestamp: new Date().toISOString()
  });

  window.location.href = `order-success.html?${params.toString()}`;
}

// Generate Payment ID
function generatePaymentId() {
  return 'PAY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Show Toast Notification
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">✓</span>
        <span class="toast-message" id="toastMessage"></span>
      </div>
    `;
    document.body.appendChild(toast);
  }

  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('.toast-icon');
  
  toastMessage.textContent = message;
  
  if (type === 'success') {
    toastIcon.textContent = '✓';
    toast.style.borderColor = 'var(--success-green)';
  } else if (type === 'error') {
    toastIcon.textContent = '✗';
    toast.style.borderColor = 'var(--error-red)';
  } else if (type === 'warning') {
    toastIcon.textContent = '⚠️';
    toast.style.borderColor = 'var(--accent-orange)';
  }
  
  toast.classList.remove('hidden');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 400);
  }, 3000);
}

// Utility: Format currency
function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Log initialization
console.log('💳 EveryHandle Marketplace - Card Payment Module Initialized');
console.log('🔑 Flutterwave Public Key:', FLUTTERWAVE_PUBLIC_KEY);
console.log('🌍 Environment:', FLUTTERWAVE_SANDBOX ? 'Sandbox' : 'Production');