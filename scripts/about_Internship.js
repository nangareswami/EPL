// JavaScript to enhance mobile responsiveness
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if device is mobile
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // Adjust AOS animation duration and delay for mobile
    if (isMobile()) {
        // Get all elements with AOS attributes
        const aosElements = document.querySelectorAll('[data-aos]');
        
        // Reduce animation duration and delay for mobile
        aosElements.forEach(element => {
            // Set shorter duration for mobile
            element.setAttribute('data-aos-duration', '400');
            
            // Reduce delay for mobile
            const currentDelay = element.getAttribute('data-aos-delay');
            if (currentDelay && parseInt(currentDelay) > 50) {
                element.setAttribute('data-aos-delay', '50');
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reinitialize AOS on window resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});