document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin credentials
    initializeAdmin();
    
    // Password strength meter
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Form validation
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                registerUser();
            }
        });
    }
    
    // Initialize admin credentials if they don't exist
    function initializeAdmin() {
        const adminExists = localStorage.getItem('adminInitialized');
        
        if (!adminExists) {
            // Set static admin credentials
            const adminUser = {
                firstName: 'EPL',
                lastName: 'Shevgoan',
                email: 'eplcls@gmail.com',
                phone: '7741954147',
                password: 'epl@123',
                userType: 'admin'
            };
            
            // Store admin in users array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Mark admin as initialized
            localStorage.setItem('adminInitialized', 'true');
            console.log('Admin account initialized');
        }
    }
    
    // Password strength checker
    function updatePasswordStrength(password) {
        // Reset strength
        passwordStrength.className = 'password-strength-meter';
        
        if (!password) {
            passwordStrength.style.width = '0';
            return;
        }
        
        // Check strength
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
        
        let strength = 0;
        if (hasLetter) strength++;
        if (hasNumber) strength++;
        if (hasSpecial) strength++;
        if (isLongEnough) strength++;
        
        // Update UI
        if (strength <= 2) {
            passwordStrength.classList.add('weak');
        } else if (strength === 3) {
            passwordStrength.classList.add('medium');
        } else {
            passwordStrength.classList.add('strong');
        }
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // First name validation
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (!firstName.value.trim()) {
            firstNameError.style.display = 'block';
            isValid = false;
        } else {
            firstNameError.style.display = 'none';
        }
        
        // Last name validation
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (!lastName.value.trim()) {
            lastNameError.style.display = 'block';
            isValid = false;
        } else {
            lastNameError.style.display = 'none';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const emailExists = users.some(user => user.email === email.value);
        if (emailExists) {
            emailError.textContent = 'This email is already registered';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Phone validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }
        
        // Password validation
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        if (password.value.length < 8) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }
        
        // Confirm password validation
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        } else {
            confirmPasswordError.style.display = 'none';
        }
        
        return isValid;
    }
    
    // Register user
    function registerUser() {
        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        
        // Create user object
        const newUser = {
            firstName,
            lastName,
            email,
            phone,
            password,
            userType: 'student' // Default to student
        };
        
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Add new user
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        alert('Registration successful! You can now login with your email and password.');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
});