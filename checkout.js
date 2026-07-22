// ============================================
// EVERYHANDLE MARKETPLACE - CHECKOUT FLOW
// ============================================

// Global State
let currentOrder = null;
let customerInfo = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeCheckout();
  initializeSuccessPage();
});

// Initialize Checkout
function initializeCheckout() {
  // Load order from localStorage
  const savedOrder = localStorage.getItem('currentOrder');
  
  if (savedOrder) {
    currentOrder = JSON.parse(savedOrder);
    displayOrderSummary();
  } else {
    // If no order, redirect to showroom
    window.location.href = 'showroom.html';
    return;
  }

  // Setup form submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

// Display Order Summary
function displayOrderSummary() {
  if (!currentOrder) return;

  const orderItemsContainer = document.getElementById('orderItems');
  const orderTotalElement = document.getElementById('orderTotal');

  // Clear existing content
  orderItemsContainer.innerHTML = '';

  // Add order items
  if (currentOrder.items && currentOrder.items.length > 0) {
    currentOrder.items.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-platform">${item.platform}</div>
        </div>
        <div class="item-price">${item.price}</div>
      `;
      orderItemsContainer.appendChild(orderItem);
    });
  } else {
    // Single item order
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="item-details">
        <div class="item-name">${currentOrder.productName || 'Account Purchase'}</div>
        <div class="item-platform">${currentOrder.platform || 'Social Media Account'}</div>
      </div>
      <div class="item-price">${currentOrder.price || '--'}</div>
    `;
    orderItemsContainer.appendChild(orderItem);
  }

  // Set total
  if (orderTotalElement) {
    orderTotalElement.textContent = currentOrder.total || currentOrder.price || '--';
  }
}

// Handle Checkout Form Submit
function handleCheckoutSubmit(e) {
  e.preventDefault();

  // Get customer information
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();

  // Validate
  if (!name || !email || !phone) {
    showToast('⚠️ Please fill in all required fields.', 'warning');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('⚠️ Please enter a valid email address.', 'warning');
    return;
  }

  // Phone validation
  const phoneRegex = /^[+]?[\d\s()-]+$/;
  if (!phoneRegex.test(phone) || phone.length < 10) {
    showToast('⚠️ Please enter a valid phone number.', 'warning');
    return;
  }

  // Save customer info
  customerInfo = {
    name: name,
    email: email,
    phone: phone
  };

  // Update order with customer info
  if (currentOrder) {
    currentOrder.customer = customerInfo;
    currentOrder.orderId = generateOrderId();
    currentOrder.timestamp = new Date().toISOString();
    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
  }

  // Disable button and show loading
  const proceedBtn = document.getElementById('proceedToPayment');
  proceedBtn.disabled = true;
  proceedBtn.textContent = 'Processing...';

  // Simulate processing delay
  setTimeout(() => {
    // Redirect to payment page
    window.location.href = 'payment.html';
  }, 800);
}

// Generate Order ID
function generateOrderId() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Toast Notification
function showToast(message, type = 'success') {
  // Create toast element if it doesn't exist
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
  
  // Update icon based on type
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
  
  // Show toast
  toast.classList.remove('hidden');
  toast.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 400);
  }, 3000);
}

// Prevent form submission on Enter key (except in forms)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
  }
});

// Initialize Success Page (for order-success.html)
function initializeSuccessPage() {
  // Check if we're on the success page
  if (!window.location.pathname.includes('order-success.html')) {
    return;
  }

  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  
  // Populate success page with order details
  const orderIdEl = document.getElementById('orderId');
  const transactionRefEl = document.getElementById('transactionRef');
  const paymentMethodEl = document.getElementById('paymentMethod');
  const amountPaidEl = document.getElementById('amountPaid');
  const orderDateEl = document.getElementById('orderDate');
  const customerEmailDisplayEl = document.getElementById('customerEmailDisplay');

  if (orderIdEl) {
    orderIdEl.textContent = params.get('orderId') || 'N/A';
  }
  
  if (transactionRefEl) {
    transactionRefEl.textContent = params.get('transactionRef') || 'N/A';
  }
  
  if (paymentMethodEl) {
    paymentMethodEl.textContent = params.get('paymentMethod') || 'N/A';
  }
  
  if (amountPaidEl) {
    const amount = params.get('amount');
    const currency = params.get('currency');
    amountPaidEl.textContent = amount && currency ? `${currency} ${amount}` : 'N/A';
  }
  
  if (orderDateEl) {
    const timestamp = params.get('timestamp');
    if (timestamp) {
      const date = new Date(timestamp);
      orderDateEl.textContent = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      orderDateEl.textContent = new Date().toLocaleString('en-US');
    }
  }
  
  if (customerEmailDisplayEl) {
    customerEmailDisplayEl.textContent = params.get('customerEmail') || 'your email';
  }

  // Clear the current order from localStorage
  localStorage.removeItem('currentOrder');

  console.log('✅ Order Success Page Initialized');
  console.log('📋 Order Details:', Object.fromEntries(params));
}

// Log initialization
console.log('🛒 EveryHandle Marketplace - Checkout Initialized');
console.log('💳 Ready to process order');
