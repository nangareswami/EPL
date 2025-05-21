document.addEventListener('DOMContentLoaded', function() {
    // User type selector
    const userTypeOptions = document.querySelectorAll('.user-type-option');
    const userTypeInput = document.getElementById('userType');
    
    userTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            userTypeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Set user type value
            userTypeInput.value = this.getAttribute('data-type');
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Check if user type matches
            if (user.userType === userType) {
                // Store login info in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userType', user.userType);
                localStorage.setItem('userEmail', user.email);
                
                // Set user name
                const displayName = user.userType === 'admin' 
                    ? `Admin: ${user.firstName}` 
                    : `Welcome: ${user.firstName} Role: Student`;
                localStorage.setItem('userName', displayName);
                
                // Redirect back to home page
                window.location.href = '../../index.html';
            } else {
                alert(`This account is not registered as a ${userType}. Please select the correct user type.`);
            }
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
    
    // Start animations
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        element.classList.add('active');
    });
});