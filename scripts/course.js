// Header animations on load
document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('.header-title');
    const headerSubtitle = document.querySelector('.header-subtitle');

    if (headerTitle) headerTitle.classList.add('fade-in-down');
    if (headerSubtitle) headerSubtitle.classList.add('fade-in');

    // Cards scroll-triggered animation
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});