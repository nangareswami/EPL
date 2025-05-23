
        document.addEventListener('DOMContentLoaded', () => {
            const sectionHeaders = document.querySelectorAll('.section-header');

            sectionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    // Find the immediately following sibling, which should be the subsection-list
                    const subsectionList = header.nextElementSibling;

                    // Toggle the 'active' class on the header
                    header.classList.toggle('active');
                    // Toggle the 'show' class on the subsection-list to control its visibility and animation
                    subsectionList.classList.toggle('show');
                });

                // Optional: Add keyboard accessibility for Enter key
                header.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') { // Spacebar also triggers click
                        event.preventDefault(); // Prevent default scroll behavior for spacebar
                        header.click(); // Simulate a click
                    }
                });
            });
        });
    