document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = link.textContent.trim().toLowerCase();
            let targetElement = null;

            switch (targetSection) {
                case 'home': targetElement = document.querySelector('.header'); break;
                case 'about': targetElement = document.querySelector('.decoration'); break;
                case 'gallery': targetElement = document.querySelector('.gallery'); break;
                case 'blog': targetElement = document.querySelector('.testimonials'); break;
                case 'contact': targetElement = document.querySelector('.contact'); break;
            }

            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
                if (window.innerWidth < 700) hideMenu();
            }
        });
    });

    // Responsive video switching
    function handleVideoResponsiveness() {
        const desktopVideo = document.querySelector('.desktop-video');
        const mobileVideo = document.querySelector('.mobile-video');
        const header = document.querySelector('.header');

        function sizeVideo(video, visible) {
            if (!video) return;
            video.style.display = visible ? 'block' : 'none';
            if (visible) {
                if (video.paused) video.play();
                video.style.width = '100%';
                video.style.height = '100%';
                if (window.innerWidth <= 700 && header) header.style.height = '100vh';
            } else {
                video.pause();
            }
        }

        if (window.innerWidth <= 700) {
            sizeVideo(desktopVideo, false);
            sizeVideo(mobileVideo, true);
        } else {
            sizeVideo(mobileVideo, false);
            sizeVideo(desktopVideo, true);
        }
    }

    handleVideoResponsiveness();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleVideoResponsiveness, 100);
    });
    window.addEventListener('orientationchange', handleVideoResponsiveness);

    // Image slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let slideInterval;

    if (slides.length && dots.length) {
        function showSlides() {
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;

            slides.forEach(slide => slide.style.display = "none");
            dots.forEach(dot => dot.classList.remove("active"));

            slides[slideIndex].style.display = "block";
            dots[slideIndex].classList.add("active");
        }

        function changeSlide(n) {
            slideIndex += n;
            showSlides();
        }

        function currentSlide(n) {
            slideIndex = n;
            showSlides();
        }

        function startSlideShow() {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        }

        function resetSlideShow() {
            clearInterval(slideInterval);
            startSlideShow();
        }

        startSlideShow();
        showSlides();

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation();
                changeSlide(-1);
                resetSlideShow();
            });

            nextButton.addEventListener('click', (e) => {
                e.stopPropagation();
                changeSlide(1);
                resetSlideShow();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide(index);
                resetSlideShow();
            });
        });

        window.changeSlide = changeSlide;
        window.currentSlide = currentSlide;
    }

    // Touch swipe support for gallery
    const galleryContainer = document.querySelector('.gallery-container');
    let touchStartX = 0, touchEndX = 0;

    if (galleryContainer) {
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) changeSlide(1);
            else if (touchEndX > touchStartX + threshold) changeSlide(-1);
            resetSlideShow();
        }, false);
    }

    // Form validation
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }

            if (phone && !/^\d{10,}$/.test(phone.replace(/[^0-9]/g, ''))) {
                e.preventDefault();
                alert('Please enter a valid phone number');
                return false;
            }

            return true;
        });
    }

    // Remove text nodes from social icons
    function removeTextNodes(parent) {
        Array.from(parent.childNodes).forEach(node => {
            if (node.nodeType === 3) node.textContent = '';
        });
    }

    const headerIcons = document.querySelector('.text-box .iconss');
    const footerIcons = document.querySelector('.footer .icons');
    if (headerIcons) removeTextNodes(headerIcons);
    if (footerIcons) removeTextNodes(footerIcons);

    // Background slideshow
    const slidesw = document.querySelectorAll('.bg-slide');
    let current = 0;
    setInterval(() => {
        slidesw[current].classList.remove('active');
        current = (current + 1) % slidesw.length;
        slidesw[current].classList.add('active');
    }, 4000);

    // Resize videos for background sections
    function adjustVideoSizes() {
        const backgroundVideos = document.querySelectorAll('video');
        backgroundVideos.forEach(video => {
            if (video.classList.contains('background-video')) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                if (window.innerWidth < 700) {
                    video.style.width = 'auto';
                    video.style.height = `${headerHeight}px`;
                } else {
                    video.style.width = '100%';
                    video.style.height = '100%';
                }
            } else if (video.classList.contains('facility-video')) {
                video.style.width = '100%';
                video.style.height = 'auto';
            }
        });
    }

    adjustVideoSizes();
    window.addEventListener('resize', adjustVideoSizes);
});

// Navigation menu toggle
function showMenu() {
    document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
    document.getElementById("navLinks").style.right = "-200px";
}
