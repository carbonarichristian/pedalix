//logic for our custom contact form
// Get the necessary elements
const businessAccountCheckbox = document.getElementById('businessAccount');
const companyInfoField = document.getElementById('companyInfo');
const contactReasonSelect = document.getElementById('contactReason');
const productNameField = document.getElementById('productNameField');
const orderNumberField = document.getElementById('orderNumberField');

// Function to show or hide the company info field
function toggleCompanyInfoField() {
  if (businessAccountCheckbox.checked) {
    companyInfoField.classList.remove('hidden');
  } else {
    companyInfoField.classList.add('hidden');
  }
}

// Function to show or hide the product name field
function toggleProductNameField() {
  if (contactReasonSelect.value === 'product') {
    productNameField.style.display = 'block';
  } else {
    productNameField.style.display = 'none';
  }
}

// Function to show or hide the order number field
function toggleOrderNumberField() {
  if (contactReasonSelect.value === 'order') {
    orderNumberField.style.display = 'block';
  } else {
    orderNumberField.style.display = 'none';
  }
}

// Add event listeners to the necessary elements
businessAccountCheckbox.addEventListener('change', toggleCompanyInfoField);
contactReasonSelect.addEventListener('change', toggleProductNameField);
contactReasonSelect.addEventListener('change', toggleOrderNumberField);

// Call the functions initially to set the initial state
toggleCompanyInfoField();
toggleProductNameField();
toggleOrderNumberField();
