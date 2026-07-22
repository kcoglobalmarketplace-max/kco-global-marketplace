// ============================================
// K.C.O. GLOBE MARKETPLACE - PAYMENT PAGE LOGIC
// ============================================

// Bank Details Data
const bankDetailsData = {
  'CA': {
    flag: '🇨🇦',
    country: 'Canada',
    currency: 'Canadian Dollar (CAD)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank NA Canadian Branch',
    transferType: 'Local Transfer',
    bankAddress: '123 Front St. West\nToronto, ON M5J 2M3\nCanada',
    fields: [
      { label: 'Institution Number', value: '0328', id: 'institutionNumber' },
      { label: 'Transit Number', value: '20012', id: 'transitNumber' },
      { label: 'Account Type', value: 'CHECKING', id: 'accountType' },
      { label: 'Account Number', value: '3001440544', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'institutionNumber', 'transitNumber']
  },
  'SG': {
    flag: '🇸🇬',
    country: 'Singapore',
    currency: 'Singapore Dollar (SGD)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank N.A., Singapore Branch',
    transferType: 'Local Transfer',
    bankAddress: '8 Marina View\n#17-01 Asia Square Tower 1\nSingapore 018960',
    fields: [
      { label: 'Bank Code', value: '7214', id: 'bankCode' },
      { label: 'Branch Code', value: '001', id: 'branchCode' },
      { label: 'SWIFT Code', value: 'CITISGSG', id: 'swiftCode' },
      { label: 'Account Number', value: '44990709533', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'swiftCode']
  },
  'US': {
    flag: '🇺🇸',
    country: 'United States',
    currency: 'US Dollar (USD)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank',
    transferType: 'Local Transfer',
    bankAddress: '111 Wall Street\nNew York, NY 10043\nUSA',
    fields: [
      { label: 'Routing (ABA)', value: '031100209', id: 'routingNumber' },
      { label: 'SWIFT Code', value: 'CITIUS33', id: 'swiftCode' },
      { label: 'Account Type', value: 'CHECKING', id: 'accountType' },
      { label: 'Account Number', value: '70589490002447647', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'routingNumber', 'swiftCode']
  },
  'AU': {
    flag: '🇦🇺',
    country: 'Australia',
    currency: 'Australian Dollar (AUD)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank',
    transferType: 'Local Transfer',
    bankAddress: '2 Park Street\nSydney NSW 2000\nAustralia',
    fields: [
      { label: 'BSB Code', value: '248024', id: 'bsbCode' },
      { label: 'Account Number', value: '10674571', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'bsbCode']
  },
  'JP': {
    flag: '🇯🇵',
    country: 'Japan',
    currency: 'Japanese Yen (JPY)',
    beneficiaryName: 'ペイオニア ジャパン(カ',
    bankName: 'MUFG Bank, Ltd.',
    transferType: 'Local Transfer',
    bankAddress: '7-1 Marunouchi 2-Chome\nChiyoda-ku\nTokyo\nJapan',
    fields: [
      { label: 'Bank Code', value: '0005', id: 'bankCode' },
      { label: 'Branch Code', value: '869', id: 'branchCode' },
      { label: 'Account Type', value: 'Savings / Futsu', id: 'accountType' },
      { label: 'Account Number', value: '4682719', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'bankCode', 'branchCode']
  },
  'ID': {
    flag: '🇮🇩',
    country: 'Indonesia',
    currency: 'Indonesian Rupiah (IDR)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Deutsche Bank AG Jakarta Branch',
    transferType: 'Local Transfer',
    bankAddress: 'Deutsche Bank Building\n5th Floor\nJl. Imam Bonjol 80\nJakarta 10310\nIndonesia',
    fields: [
      { label: 'Branch Code', value: '0670304', id: 'branchCode' },
      { label: 'Account Number', value: '974400000904', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'branchCode']
  },
  'MX': {
    flag: '🇲🇽',
    country: 'Mexico',
    currency: 'Mexican Peso (MXN)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Sistema de Transferencias y Pagos',
    transferType: 'Local Transfer',
    bankAddress: 'Av. Insurgentes Sur 1425\nInsurgentes Mixcoac\nBenito Juárez\n03920 Ciudad de México\nCDMX\nMéxico',
    fields: [
      { label: 'Bank Code', value: '646', id: 'bankCode' },
      { label: 'Branch Code', value: '010', id: 'branchCode' },
      { label: 'Account Number', value: '646010504200345127', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'bankCode', 'branchCode']
  },
  'EU': {
    flag: '🇪🇺',
    country: 'Eurozone (European Union)',
    currency: 'Euro (EUR)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank',
    transferType: 'Local Transfer',
    bankAddress: '1 North Wall Quay\nInternational Financial Services Centre (IFSC)\nDublin 1\nIreland',
    fields: [
      { label: 'IBAN', value: 'IE70CITI99005171297018', id: 'iban' },
      { label: 'BIC', value: 'CITIIE2X', id: 'bic' }
    ],
    copyButtons: ['iban', 'bic']
  },
  'GB': {
    flag: '🇬🇧',
    country: 'United Kingdom',
    currency: 'British Pound (GBP)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Citibank',
    transferType: 'Local Transfer',
    bankAddress: 'Canada Square\nCanary Wharf\nLondon\nE14 5LB\nUnited Kingdom',
    fields: [
      { label: 'Sort Code', value: '185008', id: 'sortCode' },
      { label: 'IBAN', value: 'GB94CITI18500856468624', id: 'iban' },
      { label: 'BIC', value: 'CITIGB2L', id: 'bic' },
      { label: 'Account Number', value: '56468624', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber', 'sortCode', 'iban', 'bic']
  },
  'NG': {
    flag: '🇳🇬',
    country: 'Nigeria',
    currency: 'Nigerian Naira (NGN)',
    beneficiaryName: 'KENNETH CHIDERA ODENYI',
    bankName: 'Wema Bank',
    transferType: 'Local Transfer',
    bankAddress: 'Nigeria',
    fields: [
      { label: 'Account Number', value: '7650653734', id: 'accountNumber' }
    ],
    copyButtons: ['accountNumber']
  }
};

// Global State
let selectedPaymentMethod = 'bank-transfer';
let selectedCountry = null;
let uploadedFile = null;
let isConfirmed = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializePaymentMethods();
  initializeFileUpload();
  initializeConfirmation();
});

// Payment Method Selection
function initializePaymentMethods() {
  const methodCards = document.querySelectorAll('.payment-method-card');
  
  methodCards.forEach(card => {
    card.addEventListener('click', function() {
      if (this.classList.contains('disabled')) {
        showToast('⚠️ This payment method is coming soon!', 'warning');
        return;
      }

      // Remove active from all cards
      methodCards.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked card
      this.classList.add('active');
      
      // Get selected method
      selectedPaymentMethod = this.dataset.method;
      
      // Show relevant section
      showPaymentSection(selectedPaymentMethod);
    });
  });
}

// Show relevant payment section
function showPaymentSection(method) {
  const bankSection = document.getElementById('bankTransferSection');
  const cardSection = document.getElementById('cardPaymentSection');
  const mobileSection = document.getElementById('mobileMoneySection');
  const uploadSection = document.getElementById('uploadSection');
  const confirmationSection = document.getElementById('confirmationSection');
  const orderStatus = document.getElementById('orderStatus');

  // Hide all sections first
  bankSection.classList.add('hidden');
  cardSection.classList.add('hidden');
  mobileSection.classList.add('hidden');
  uploadSection.classList.add('hidden');
  confirmationSection.classList.add('hidden');
  orderStatus.classList.add('hidden');

  // Show relevant section
  if (method === 'bank-transfer') {
    bankSection.classList.remove('hidden');
    uploadSection.classList.remove('hidden');
    confirmationSection.classList.remove('hidden');
  } else if (method === 'card') {
    cardSection.classList.remove('hidden');
    // For card payment, hide upload and confirmation sections
    // as payment is handled directly through Flutterwave
    updateCardPaymentDetails();
  } else if (method === 'mobile-money') {
    mobileSection.classList.remove('hidden');
    uploadSection.classList.remove('hidden');
    confirmationSection.classList.remove('hidden');
  }
}

// Update card payment details with order information
function updateCardPaymentDetails() {
  const order = getOrderData();
  
  if (!order) {
    console.warn('No order data found for card payment');
    return;
  }

  // Update payment summary
  const productNameEl = document.getElementById('cardProductName');
  const amountEl = document.getElementById('cardAmount');
  const customerNameEl = document.getElementById('cardCustomerName');
  const customerEmailEl = document.getElementById('cardCustomerEmail');

  if (productNameEl) {
    productNameEl.textContent = order.productName || order.items?.[0]?.name || 'Account Purchase';
  }
  
  if (amountEl) {
    amountEl.textContent = order.total || order.price || '--';
  }
  
  if (customerNameEl && order.customer) {
    customerNameEl.textContent = order.customer.name || '--';
  }
  
  if (customerEmailEl && order.customer) {
    customerEmailEl.textContent = order.customer.email || '--';
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

// Country Selection
document.addEventListener('DOMContentLoaded', function() {
  const countrySelect = document.getElementById('paymentCountry');
  
  if (countrySelect) {
    countrySelect.addEventListener('change', function() {
      selectedCountry = this.value;
      
      if (selectedCountry && bankDetailsData[selectedCountry]) {
        displayBankDetails(selectedCountry);
      } else {
        hideBankDetails();
      }
    });
  }
});

// Display Bank Details
function displayBankDetails(countryCode) {
  const data = bankDetailsData[countryCode];
  if (!data) return;

  const bankDetails = document.getElementById('bankDetails');
  
  // Update header
  document.getElementById('bankFlag').textContent = data.flag;
  document.getElementById('bankCountryName').textContent = data.country;
  document.getElementById('bankCurrency').textContent = data.currency;
  
  // Update static fields
  document.getElementById('beneficiaryName').textContent = data.beneficiaryName;
  document.getElementById('bankName').textContent = data.bankName;
  document.getElementById('transferType').textContent = data.transferType;
  document.getElementById('bankAddress').textContent = data.bankAddress.replace(/\n/g, ', ');
  
  // Clear and populate dynamic fields
  const dynamicFields = document.getElementById('dynamicFields');
  dynamicFields.innerHTML = '';
  
  data.fields.forEach(field => {
    const fieldRow = document.createElement('div');
    fieldRow.className = 'detail-row';
    fieldRow.innerHTML = `
      <span class="detail-label">${field.label}:</span>
      <span class="detail-value" id="${field.id}">${field.value}</span>
    `;
    dynamicFields.appendChild(fieldRow);
  });
  
  // Update copy buttons
  updateCopyButtons(data.copyButtons);
  
  // Show bank details
  bankDetails.classList.remove('hidden');
}

// Hide Bank Details
function hideBankDetails() {
  const bankDetails = document.getElementById('bankDetails');
  bankDetails.classList.add('hidden');
}

// Update Copy Buttons
function updateCopyButtons(buttonIds) {
  const copyActions = document.querySelector('.copy-actions');
  copyActions.innerHTML = '';
  
  buttonIds.forEach(fieldId => {
    const button = document.createElement('button');
    button.className = 'btn-copy';
    button.onclick = () => copyToClipboard(fieldId);
    
    // Get field label
    const fieldLabel = getFieldLabel(fieldId);
    button.textContent = `📋 Copy ${fieldLabel}`;
    
    copyActions.appendChild(button);
  });
}

// Get Field Label
function getFieldLabel(fieldId) {
  const labels = {
    'accountNumber': 'Account Number',
    'institutionNumber': 'Institution Number',
    'transitNumber': 'Transit Number',
    'bankCode': 'Bank Code',
    'branchCode': 'Branch Code',
    'swiftCode': 'SWIFT Code',
    'iban': 'IBAN',
    'bic': 'BIC',
    'sortCode': 'Sort Code',
    'bsbCode': 'BSB Code',
    'routingNumber': 'Routing Number'
  };
  return labels[fieldId] || fieldId;
}

// Copy to Clipboard
function copyToClipboard(fieldId) {
  let textToCopy = '';
  
  // Try to get value from element
  const element = document.getElementById(fieldId);
  if (element) {
    textToCopy = element.textContent.trim();
  } else {
    // Fallback to bank details data
    if (selectedCountry && bankDetailsData[selectedCountry]) {
      const field = bankDetailsData[selectedCountry].fields.find(f => f.id === fieldId);
      if (field) {
        textToCopy = field.value;
      }
    }
  }
  
  if (textToCopy) {
    // Use modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showCopySuccess(fieldId);
        showToast(`✓ ${getFieldLabel(fieldId)} copied to clipboard!`, 'success');
      }).catch(err => {
        fallbackCopy(textToCopy, fieldId);
      });
    } else {
      fallbackCopy(textToCopy, fieldId);
    }
  }
}

// Fallback Copy Method
function fallbackCopy(text, fieldId) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopySuccess(fieldId);
    showToast(`✓ ${getFieldLabel(fieldId)} copied to clipboard!`, 'success');
  } catch (err) {
    showToast('✗ Failed to copy. Please try again.', 'error');
  }
  
  document.body.removeChild(textArea);
}

// Show Copy Success
function showCopySuccess(fieldId) {
  // Find and update the button that was clicked
  const buttons = document.querySelectorAll('.btn-copy');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(fieldId)) {
      btn.classList.add('copied');
      const originalText = btn.textContent;
      btn.textContent = '✓ Copied!';
      
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = originalText;
      }, 2000);
    }
  });
}

// File Upload Functionality
function initializeFileUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('receiptUpload');
  
  if (!uploadArea || !fileInput) return;

  // Click to upload
  uploadArea.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') {
      fileInput.click();
    }
  });

  // File input change
  fileInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
      handleFileUpload(this.files[0]);
    }
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });
}

// Handle File Upload
function handleFileUpload(file) {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    showToast('✗ Invalid file type. Please upload JPG, PNG, WEBP, or PDF.', 'error');
    return;
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast('✗ File size too large. Maximum size is 10MB.', 'error');
    return;
  }

  uploadedFile = file;
  
  // Show preview
  const uploadPreview = document.getElementById('uploadPreview');
  const uploadArea = document.getElementById('uploadArea');
  const imagePreview = document.getElementById('imagePreview');
  const pdfPreview = document.getElementById('pdfPreview');
  const pdfFileName = document.getElementById('pdfFileName');
  
  uploadArea.classList.add('hidden');
  uploadPreview.classList.remove('hidden');
  
  // Show progress
  simulateUpload();
  
  // Handle image preview
  if (file.type.startsWith('image/')) {
    imagePreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Receipt preview">`;
    pdfPreview.classList.add('hidden');
  } else if (file.type === 'application/pdf') {
    imagePreview.innerHTML = '';
    pdfPreview.classList.remove('hidden');
    pdfFileName.textContent = file.name;
  }
}

// Simulate Upload Progress
function simulateUpload() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressFill.style.width = progress + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      progressText.textContent = 'Upload complete!';
      progressFill.classList.add('complete');
      showToast('✓ File uploaded successfully!', 'success');
    }
  }, 200);
}

// Remove File
function removeFile() {
  uploadedFile = null;
  
  const uploadPreview = document.getElementById('uploadPreview');
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('receiptUpload');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  uploadPreview.classList.add('hidden');
  uploadArea.classList.remove('hidden');
  fileInput.value = '';
  
  progressFill.style.width = '0%';
  progressFill.classList.remove('complete');
  progressText.textContent = 'Upload complete!';
}

// Payment Confirmation
function initializeConfirmation() {
  const checkbox = document.getElementById('confirmPayment');
  const submitButton = document.getElementById('submitPayment');
  
  if (!checkbox || !submitButton) return;
  
  checkbox.addEventListener('change', function() {
    isConfirmed = this.checked;
    submitButton.disabled = !(isConfirmed && uploadedFile);
  });
}

// Submit Payment
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submitPayment');
  
  if (submitButton) {
    submitButton.addEventListener('click', function() {
      if (!isConfirmed) {
        showToast('⚠️ Please confirm your payment first.', 'warning');
        return;
      }
      
      if (!uploadedFile) {
        showToast('⚠️ Please upload your payment receipt.', 'warning');
        return;
      }
      
      submitPayment();
    });
  }
});

// Submit Payment Function
function submitPayment() {
  const submitBtn = document.getElementById('submitPayment');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  
  // Simulate API call
  setTimeout(() => {
    // Hide confirmation section
    document.getElementById('confirmationSection').classList.add('hidden');
    
    // Show order status
    showOrderStatus('pending');
    
    // Save to localStorage (simulated database)
    savePaymentRecord();
    
    showToast('✓ Payment submitted successfully!', 'success');
  }, 1500);
}

// Show Order Status
function showOrderStatus(status) {
  const orderStatus = document.getElementById('orderStatus');
  const statusIcon = document.getElementById('statusIcon');
  const statusTitle = document.getElementById('statusTitle');
  const statusMessage = document.getElementById('statusMessage');
  
  orderStatus.classList.remove('hidden');
  
  const statusData = {
    'pending': {
      icon: '⏳',
      title: 'Payment Pending',
      message: 'Your payment is being processed and will be reviewed shortly.',
      activeStep: 1
    },
    'review': {
      icon: '🔍',
      title: 'Under Review',
      message: 'Our team is reviewing your payment receipt.',
      activeStep: 2
    },
    'approved': {
      icon: '✓',
      title: 'Payment Approved',
      message: 'Your payment has been approved! Your order is being processed.',
      activeStep: 3
    },
    'rejected': {
      icon: '✗',
      title: 'Payment Rejected',
      message: 'Your payment could not be verified. Please contact support.',
      activeStep: 1
    },
    'processing': {
      icon: '📦',
      title: 'Processing Order',
      message: 'Your order is being prepared for shipment.',
      activeStep: 3
    },
    'shipped': {
      icon: '🚚',
      title: 'Shipped',
      message: 'Your order has been shipped! Track your delivery.',
      activeStep: 4
    },
    'delivered': {
      icon: '✓',
      title: 'Delivered',
      message: 'Your order has been delivered successfully!',
      activeStep: 4
    }
  };
  
  const data = statusData[status] || statusData['pending'];
  
  statusIcon.textContent = data.icon;
  statusTitle.textContent = data.title;
  statusMessage.textContent = data.message;
  
  // Update timeline
  updateTimeline(data.activeStep);
}

// Update Timeline
function updateTimeline(activeStep) {
  const steps = document.querySelectorAll('.timeline-step');
  
  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    const stepIcon = step.querySelector('.step-icon');
    
    step.classList.remove('completed', 'active');
    
    if (stepNumber < activeStep) {
      step.classList.add('completed');
      stepIcon.textContent = '✓';
    } else if (stepNumber === activeStep) {
      step.classList.add('active');
      stepIcon.textContent = '⏳';
    } else {
      stepIcon.textContent = '⏳';
    }
  });
}

// Save Payment Record
function savePaymentRecord() {
  const paymentRecord = {
    id: generatePaymentId(),
    date: new Date().toISOString(),
    method: selectedPaymentMethod,
    country: selectedCountry,
    amount: 'TBD',
    status: 'pending',
    fileName: uploadedFile ? uploadedFile.name : null,
    fileData: uploadedFile ? URL.createObjectURL(uploadedFile) : null
  };
  
  // Get existing records
  const records = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
  records.push(paymentRecord);
  
  // Save to localStorage
  localStorage.setItem('paymentRecords', JSON.stringify(records));
}

// Generate Payment ID
function generatePaymentId() {
  return 'PAY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
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

// Utility: Format currency
function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Prevent form submission on Enter key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
  }
});

// Log initialization
console.log('🔒 K.C.O. Globe Marketplace - Secure Payment Portal Initialized');
console.log('💳 Available Payment Methods: Bank Transfer, Mobile Money');
console.log('🌍 Supported Countries: 10 countries with local bank details');