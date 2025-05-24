const container = document.getElementById('container');
const overlayBtn = document.getElementById('overlayBtn');
const signUpButton = document.querySelector('.overlay-panel.overlay-right button');
const signInButton = document.querySelector('.overlay-panel.overlay-left button');
const signUpForm = document.querySelector('.sign-up-container form');
const signUpFormButton = signUpForm.querySelector('button');

// Add event listener to the "Sign Up" button in the overlay
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

// Add event listener to the "Sign In" button in the overlay
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Add event listener to the overlay button (if needed)
overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');
});

signUpForm.addEventListener('submit', function(event) {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const mobile = signUpForm.querySelector('input[name="mobile"]').value;
    const otpInput = document.getElementById('signup-otp');
    const passwordErrorDiv = document.getElementById('password-error');
    const mobileErrorDiv = document.getElementById('mobile-error');
    const otpMessageDiv = document.getElementById('otp-message');
    const otpErrorDiv = document.getElementById('otp-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;
    passwordErrorDiv.textContent = '';
    mobileErrorDiv.textContent = '';
    otpMessageDiv.textContent = '';
    otpErrorDiv.textContent = '';

    // If OTP is not yet generated, validate all fields, generate OTP, and prompt for OTP
    if (!signUpForm.dataset.otpGenerated) {
        if (!emailPattern.test(email)) {
            event.preventDefault();
            passwordErrorDiv.textContent = '';
            mobileErrorDiv.textContent = '';
            otpMessageDiv.textContent = '';
            otpErrorDiv.textContent = '';
            alert('Please enter a valid email address!');
            return;
        }
        if (!mobilePattern.test(mobile)) {
            event.preventDefault();
            passwordErrorDiv.textContent = '';
            mobileErrorDiv.textContent = 'Please enter a valid 10-digit mobile number!';
            otpMessageDiv.textContent = '';
            otpErrorDiv.textContent = '';
            return;
        }
        // Password requirements
        let passwordErrors = [];
        if (password.length < 6) {
            passwordErrors.push('at least 6 characters');
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push('1 uppercase letter');
        }
        if (!/[0-9]/.test(password)) {
            passwordErrors.push('1 number');
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            passwordErrors.push('1 special character');
        }
        if (passwordErrors.length > 0) {
            event.preventDefault();
            passwordErrorDiv.textContent = 'Password must contain: ' + passwordErrors.join(', ');
            otpMessageDiv.textContent = '';
            otpErrorDiv.textContent = '';
            return;
        }
        if (password !== confirmPassword) {
            event.preventDefault();
            passwordErrorDiv.textContent = 'Password and Confirm Password do not match!';
            otpMessageDiv.textContent = '';
            otpErrorDiv.textContent = '';
            return;
        }
        passwordErrorDiv.textContent = '';
        mobileErrorDiv.textContent = '';
        // Generate OTP and show message
        event.preventDefault();
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        signUpForm.dataset.generatedOtp = generatedOTP;
        signUpForm.dataset.otpGenerated = 'true';
        otpMessageDiv.textContent = `Please enter the OTP sent to your mobile/email: ${generatedOTP}`;
        otpInput.focus();
        return;
    }

    // If OTP is generated, check OTP
    const enteredOtp = otpInput.value.trim();
    const generatedOtp = signUpForm.dataset.generatedOtp;
    if (enteredOtp !== generatedOtp) {
        event.preventDefault();
        otpErrorDiv.textContent = 'Invalid OTP. Please enter the correct OTP.';
        otpInput.focus();
        return;
    }
    // OTP is correct, proceed with registration
    otpErrorDiv.textContent = '';
    otpMessageDiv.textContent = 'Registration successful!';
    // Save user to localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        event.preventDefault();
        passwordErrorDiv.textContent = 'This email is already registered!';
        return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    // Reset OTP state
    delete signUpForm.dataset.generatedOtp;
    delete signUpForm.dataset.otpGenerated;
});

// Live password validation feedback
const passwordInput = document.getElementById('signup-password');
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const passwordErrorDiv = document.getElementById('password-error');
    let passwordErrors = [];
    if (password.length < 6) {
        passwordErrors.push('at least 6 characters');
    }
    if (!/[A-Z]/.test(password)) {
        passwordErrors.push('1 uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
        passwordErrors.push('1 number');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        passwordErrors.push('1 special character');
    }
    if (passwordErrors.length > 0) {
        passwordErrorDiv.textContent = 'Password must contain: ' + passwordErrors.join(', ');
    } else {
        passwordErrorDiv.textContent = '';
    }
});

// Live mobile validation feedback
const mobileInput = signUpForm.querySelector('input[name="mobile"]');
mobileInput.addEventListener('input', function() {
    const mobile = mobileInput.value;
    const mobileErrorDiv = document.getElementById('mobile-error');
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
        mobileErrorDiv.textContent = 'Please enter a valid 10-digit mobile number!';
    } else {
        mobileErrorDiv.textContent = '';
    }
});

// Login validation
const signInForm = document.querySelector('.sign-in-container form');
const loginErrorDiv = document.getElementById('login-error');
const loginPasswordInput = document.getElementById('login-password');
signInForm.addEventListener('submit', function(event) {
    const email = signInForm.querySelector('input[name="email"]').value;
    const password = loginPasswordInput.value;
    loginErrorDiv.textContent = '';
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (!user) {
        event.preventDefault();
        loginErrorDiv.textContent = 'Your email is not valid.';
        return;
    }
    if (user.password !== password) {
        event.preventDefault();
        loginErrorDiv.textContent = 'Please enter a valid password.';
        return;
    }
});