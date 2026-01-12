// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Fade in section on load
    const contactSection = document.getElementById('contactSection');
    setTimeout(() => {
        contactSection.classList.add('visible');
    }, 100);

    // Form elements
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Input fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const company = document.getElementById('company');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const service = document.getElementById('service');
    const budget = document.getElementById('budget');
    const timeline = document.getElementById('timeline');
    const description = document.getElementById('description');

    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const mobileError = document.getElementById('mobileError');
    const companyError = document.getElementById('companyError');
    const cityError = document.getElementById('cityError');
    const serviceError = document.getElementById('serviceError');
    const budgetError = document.getElementById('budgetError');
    const timelineError = document.getElementById('timelineError');

    // Mobile number validation - only allow numbers
    mobile.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Clear error on focus
    const inputs = [fullName, email, mobile, company, city, service, budget, timeline];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clearError(this);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all errors
        clearAllErrors();

        // Validate form
        let isValid = true;

        // Validate Full Name
        if (fullName.value.trim() === '') {
            showError(fullName, fullNameError, 'Please enter your full name');
            isValid = false;
        }

        // Validate Email
        if (email.value.trim() === '') {
            showError(email, emailError, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Mobile Number
        if (mobile.value.trim() === '') {
            showError(mobile, mobileError, 'Please enter your mobile number');
            isValid = false;
        } else if (mobile.value.trim().length !== 10) {
            showError(mobile, mobileError, 'Mobile number must be 10 digits');
            isValid = false;
        }

        // Validate Company
        if (company.value.trim() === '') {
            showError(company, companyError, 'Please enter your company name');
            isValid = false;
        }

        // Validate City
        if (city.value.trim() === '') {
            showError(city, cityError, 'Please enter your city');
            isValid = false;
        }

        // Validate Service
        if (service.value === '') {
            showError(service, serviceError, 'Please select a service');
            isValid = false;
        }

        // Validate Budget
        if (budget.value === '') {
            showError(budget, budgetError, 'Please select your budget range');
            isValid = false;
        }

        // Validate Timeline
        if (timeline.value === '') {
            showError(timeline, timelineError, 'Please select your project timeline');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                fullName: fullName.value,
                email: email.value,
                mobile: mobile.value,
                company: company.value,
                city: city.value,
                state: state.value,
                service: service.value,
                budget: budget.value,
                timeline: timeline.value,
                description: description.value
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                // ✅ ONLY NOW show success
                form.style.display = "none";
                successMessage.classList.add("show");
                } else {
                alert("Email failed. Try again.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Server error. Email not sent.");
            });
            }

    });

    // Show error function
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Clear error function
    function clearError(input) {
        input.classList.remove('error');
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
            setTimeout(() => {
                errorElement.textContent = '';
            }, 300);
        }
    }

    // Clear all errors
    function clearAllErrors() {
        inputs.forEach(input => {
            clearError(input);
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scroll animation when section comes into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    observer.observe(contactSection);
});