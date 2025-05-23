document.addEventListener('DOMContentLoaded', () => {
    const applyButton = document.querySelector('.apply-now-btn');
    const featureItems = document.querySelectorAll('.feature-item');
    const backToMain = document.querySelector('.back-to-main');

    // Simple alert on Apply Now click
    applyButton.addEventListener('click', () => {
        // alert('Thank you for your interest! Your application is being processed.');
        // In a real application, you would typically redirect to a form or show a modal.
    });

    // Add a subtle animation/effect on feature item hover (already handled in CSS, but keeping this for potential JS animations)
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Can add more complex JS animations here if needed,
            // but CSS transform is efficient for simple hover effects.
        });
        item.addEventListener('mouseleave', () => {
            // Reset state if JS animation was applied
        });
    });

    // Back to Main link functionality (can be adapted for SPA or simple redirect)
    backToMain.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        // In a real application, you might use:
        // history.back(); // Go back to the previous page
        // window.location.href = 'main-page.html'; // Or redirect to a specific main page
        // alert('Navigating back to main page...'); // For demonstration
    });

    // Example of a dynamic content update (can be extended)
    // For instance, if you had different program types and wanted to update details
    // program-details.textContent = 'New dynamic text based on user selection or API call';
});