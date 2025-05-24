document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'section-header'
    const sectionHeaders = document.querySelectorAll('.section-header');

    // Loop through each section header
    sectionHeaders.forEach(header => {
        // Add a click event listener to each header
        header.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked header.
            // This class can be used by CSS to change the appearance of the header
            // (e.g., changing the plus/minus icon).
            header.classList.toggle('active');

            // Get the very next sibling element after the header.
            // In our HTML structure, this is the 'subsection-list' (the content to be toggled).
            const subsectionList = header.nextElementSibling;

            // Check the current display style of the subsection list.
            // If it's 'block' (meaning it's currently visible), set it to 'none' to hide it.
            // Otherwise, set it to 'block' to make it visible.
            if (subsectionList.style.display === 'block') {
                subsectionList.style.display = 'none';
            } else {
                subsectionList.style.display = 'block';
            }
        });
    });
});