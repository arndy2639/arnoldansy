// Multi-page compatible JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePageSpecificFeatures();
});

function initializePageSpecificFeatures() {
    // Initialize features based on current page
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('.html') === false) {
        initializeHomePageFeatures();
    }
    
    if (currentPage.includes('stupid-shots.html')) {
        initializeStupidShotsFeatures();
    }
    
    initializeCommonFeatures();
}

function initializeHomePageFeatures() {
    initializeSmoothScrolling();
    initializeRotatingTitle();
    initializePlayMeButton();
    initializeViewMoreButton();
}

function initializeStupidShotsFeatures() {
    // Initialize stupid shots specific features
    initializeStupidShotsVideos();
}

function initializeCommonFeatures() {
    initializeIntersectionObserver();
    initializeVideoFunctionality();
    initializeGlowEffects();
    initializeModals();
    initializeVideoAutoplay();
}

// Enhanced Video Autoplay with Fallback
function initializeVideoAutoplay() {
    const allVideos = document.querySelectorAll('video');
    
    allVideos.forEach(video => {
        // Add fallback class for browsers that block autoplay
        video.classList.add('autoplay-fallback');
        
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, show fallback
                video.classList.add('paused');
                video.controls = true;
                
                // Add click to play functionality
                video.addEventListener('click', function() {
                    this.play().then(() => {
                        this.classList.remove('paused');
                        this.controls = false;
                    }).catch(e => {
                        console.log('Video play failed:', e);
                    });
                });
            }).then(() => {
                // Autoplay worked, remove controls
                video.controls = false;
                video.classList.remove('paused');
            });
        }
    });
}

// View More/Less functionality for Recent Work
function initializeViewMoreButton() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const additionalProjects = document.querySelectorAll('.additional-project');
    
    if (!viewMoreBtn || additionalProjects.length === 0) return;
    
    let isExpanded = false;
    
    viewMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Show additional projects
            additionalProjects.forEach(project => {
                project.classList.add('visible');
            });
            
            viewMoreBtn.textContent = 'View Less';
            viewMoreBtn.classList.add('expanded');
            isExpanded = true;
            
            // Scroll to show the new content
            setTimeout(() => {
                viewMoreBtn.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 300);
        } else {
            // Hide additional projects
            additionalProjects.forEach(project => {
                project.classList.remove('visible');
            });
            
            viewMoreBtn.textContent = 'View More';
            viewMoreBtn.classList.remove('expanded');
            isExpanded = false;
        }
        
        // Reinitialize video functionality for new elements
        initializeVideoFunctionality();
        initializeVideoAutoplay();
    });
}

// Stupid Shots video initialization
function initializeStupidShotsVideos() {
    const stupidShotItems = document.querySelectorAll('.stupid-shot-item');
    
    stupidShotItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            openVideo(videoSrc, this);
        });
    });
}

// Smooth scrolling for anchor links (Home page only)
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add intersection observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.work-item, .stupid-shot-item, .list-item').forEach(el => {
        observer.observe(el);
    });
}

// Video functionality
function initializeVideoFunctionality() {
    // Add click event listeners to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            openVideo(videoSrc, this);
        });
    });

    // Add click event listeners to stupid shot items
    const stupidShotItems = document.querySelectorAll('.stupid-shot-item');
    stupidShotItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            openVideo(videoSrc, this);
        });
    });
}

// Play Me button functionality
function initializePlayMeButton() {
    const playMeButton = document.getElementById('playMeButton');
    if (!playMeButton) return;
    
    const playMeModal = document.getElementById('playMeModal');
    const closePlayMeModal = document.getElementById('closePlayMeModal');
    const playMeVideo = document.getElementById('playMeVideo');
    const prevButton = document.getElementById('prevVideo');
    const nextButton = document.getElementById('nextVideo');
    
    const videoPlaylist = [
        'Ice Cream Pack Reveal.mp4',
        'Ceres Orange & apple Juice Animation.mp4',
        'Minute Maid CGI_01.mp4',
        'Tusker CGI_1.mp4',
        'Bata 3D OOH.mp4',
        'LG QNED EVO Post 1 .mp4'
    ];
    
    let currentVideoIndex = 0;
    
    playMeButton.addEventListener('click', function() {
        currentVideoIndex = 0;
        playVideoInModal(videoPlaylist[currentVideoIndex]);
        playMeModal.classList.add('active');
    });
    
    closePlayMeModal.addEventListener('click', function() {
        playMeVideo.pause();
        playMeModal.classList.remove('active');
    });
    
    prevButton.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex - 1 + videoPlaylist.length) % videoPlaylist.length;
        playVideoInModal(videoPlaylist[currentVideoIndex]);
    });
    
    nextButton.addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
        playVideoInModal(videoPlaylist[currentVideoIndex]);
    });
    
    function playVideoInModal(videoSrc) {
        playMeVideo.src = videoSrc;
        playMeVideo.play().catch(e => {
            console.log('Play Me video play failed:', e);
        });
    }
}

// Rotating titles with typing animation
function initializeRotatingTitle() {
    const rotatingTitle = document.getElementById('rotating-title');
    if (!rotatingTitle) return;

    const titles = ['3D ANIMATOR', 'ART DIRECTOR', 'VISUAL DESIGNER'];
    let currentIndex = 0;
    
    function typeText(element, text, speed = 100, callback) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }
    
    function eraseText(element, speed = 50, callback) {
        const text = element.textContent;
        let i = text.length;
        
        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erase, speed);
            } else {
                if (callback) callback();
            }
        }
        erase();
    }
    
    function rotateTitle() {
        currentIndex = (currentIndex + 1) % titles.length;
        
        eraseText(rotatingTitle, 50, function() {
            setTimeout(() => {
                typeText(rotatingTitle, titles[currentIndex], 100, function() {
                    setTimeout(rotateTitle, 1000);
                });
            }, 500);
        });
    }
    
    setTimeout(() => {
        rotateTitle();
    }, 12000);
}

// Enhanced Interactive Glow Effects
function initializeGlowEffects() {
    const workItems = document.querySelectorAll('.work-item, .stupid-shot-item');
    const ctaSection = document.querySelector('.cta');
    const listItems = document.querySelectorAll('.list-item');
    
    workItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    if (ctaSection) {
        ctaSection.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    listItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// Modal functionality
function initializeModals() {
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVideo);
    }

    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideo();
            }
        });
    }

    const playMeModal = document.getElementById('playMeModal');
    if (playMeModal) {
        playMeModal.addEventListener('click', function(e) {
            if (e.target === this) {
                const playMeVideo = document.getElementById('playMeVideo');
                playMeVideo.pause();
                playMeModal.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideo();
            const playMeModal = document.getElementById('playMeModal');
            if (playMeModal) {
                const playMeVideo = document.getElementById('playMeVideo');
                playMeVideo.pause();
                playMeModal.classList.remove('active');
            }
        }
    });
}

function openVideo(videoSrc, clickedElement) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!modal || !modalVideo) return;
    
    modalVideo.src = videoSrc;
    modal.classList.add('active');
    
    modalVideo.play().catch(e => {
        console.log('Modal video play failed:', e);
    });
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (!modal || !modalVideo) return;
    
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modal.classList.remove('active');
}