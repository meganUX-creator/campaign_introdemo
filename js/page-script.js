document.addEventListener('DOMContentLoaded', () => {
    function updateLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang') || 'sc';

        const langContents = document.querySelectorAll('.lang-content');
        langContents.forEach(content => {
            if (content.classList.contains(`lang-${lang}`)) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Initial check
    updateLanguage();

    // Image Zoom (Lightbox) Functionality
    const initLightbox = () => {
        // Create lightbox element if it doesn't exist
        let lightbox = document.querySelector('.lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<img src="" alt="Enlarged view">';
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });
        }

        const images = document.querySelectorAll('.img-container img, .table-img');
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });
    };

    initLightbox();

    // Listen for changes
    window.addEventListener('popstate', () => {
        updateLanguage();
        initLightbox();
    });
});
