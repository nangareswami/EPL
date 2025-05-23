document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'section-header'
    const sectionHeaders = document.querySelectorAll('.section-header');

    // Loop through each section header
    sectionHeaders.forEach(header => {
        
        header.addEventListener('click', () => {
           
            header.classList.toggle('active');

           
            const subsectionList = header.nextElementSibling;

            
            if (subsectionList.style.display === 'block') {
                subsectionList.style.display = 'none';
            } else {
                subsectionList.style.display = 'block';
            }
        });
    });
});