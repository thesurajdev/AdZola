/**
 * Form Handler Module
 * Handles form submission with webhook integration and API calls
 */

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Collect selected services
    const services = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        services.push(checkbox.value);
    });
    data.services = services.length > 0 ? services : 'Not specified';

    // Send to webhook for automation
    fetch('https://hook.us2.make.com/18f8m4u0t997fcryqtdltsughi7b2h88', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).catch(error => {
        console.error('Webhook error:', error);
    });

    // Submit form to backend API
    fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(formData),
    })
    .then(response => {
        if (response.ok) {
            // Redirect to thank you page
            window.location.href = '/thank-you.html';
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        const failMessage = document.querySelector('.w-form-fail');
        if (failMessage) {
            failMessage.style.display = 'block';
        }
    })
    .finally(() => {
        // Hide loading overlay
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    });
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleSubmit };
}
