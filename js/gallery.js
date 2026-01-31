/**
 * Photography Gallery & Lightbox Script
 * Handles masonry behavior (via CSS) and Unsplash-like Lightbox interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxMainImg = document.getElementById('lightbox-main-image');
    const lightboxFeed = document.getElementById('lightbox-feed');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    // Convert NodeList to Array for easier data handling
    const imagesData = Array.from(galleryItems).map((item, index) => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt,
            index: index
        };
    });

    /**
     * Open Lightbox at specific index
     */
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        lightbox.focus();
    }

    /**
     * Close Lightbox
     */
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll

        // Clear feed to save memory/DOM weight
        setTimeout(() => {
            lightboxFeed.innerHTML = '';
            lightboxMainImg.src = '';
        }, 300); // Wait for fade out
    }

    /**
     * Update Lightbox Content (Main Image + Feed)
     */
    function updateLightboxContent() {
        if (currentIndex < 0) currentIndex = imagesData.length - 1;
        if (currentIndex >= imagesData.length) currentIndex = 0;

        const currentImgData = imagesData[currentIndex];

        // Update Main Image
        lightboxMainImg.src = currentImgData.src;
        lightboxMainImg.alt = currentImgData.alt;
        lightboxMainImg.style.opacity = 0;

        // Smooth fade in
        setTimeout(() => {
            lightboxMainImg.style.opacity = 1;
        }, 50);

        // Update Feed (Next images)
        renderFeed(currentIndex);
    }

    /**
     * Render the vertical feed of "Next" images below the main image
     */
    function renderFeed(startIndex) {
        lightboxFeed.innerHTML = ''; // Clear existing

        // Decide how many to show. Showing all subsequent images, or loop? 
        // "Unsplash-like" usually continues the stream.
        // We will show the next 5 images for performance, adding a "Load More" logic could be extended.

        const feedCount = 5;

        for (let i = 1; i <= feedCount; i++) {
            let feedIndex = startIndex + i;
            if (feedIndex >= imagesData.length) break; // Stop at end of gallery

            const imgData = imagesData[feedIndex];

            const feedItem = document.createElement('div');
            feedItem.className = 'lightbox-feed-item';

            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.alt;
            img.loading = 'lazy';

            // If user clicks a feed image, it becomes the main image? 
            // Or usually scrolling just acts as viewing. 
            // Let's make it interactive: Click to make it the "Main" focused image (with nav reset)
            feedItem.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(feedIndex);
                // Scroll lightbox to top
                lightbox.scrollTop = 0;
            });

            feedItem.appendChild(img);
            lightboxFeed.appendChild(feedItem);
        }
    }

    // Event Listeners for Grid Items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    // Close Button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation Buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(currentIndex + 1);
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
    });

    // Close on Click Outside
    // We attach click to lightbox (overlay) and stop propagation on content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
});
