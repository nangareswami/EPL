
  // view button functionality
  const viewButtons = document.querySelectorAll('.view-btn');

viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const courseTitle = card.querySelector('h2').textContent;
        
        // In a real application, you might redirect to a course details page here.
    });
});
// Buy button functionality
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('Course added to cart! Checkout coming soon.');
  });
});
