// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for animations
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

// Observe sections for glow activation
document.querySelectorAll('.about, .recent-work, .skills, .cta').forEach(el => {
    observer.observe(el);
});

// Observe elements for animation
document.querySelectorAll('.work-item, .list-item').forEach(el => {
    observer.observe(el);
});

// Button hover effects
document.querySelectorAll('.button-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Video preview functionality
document.addEventListener('DOMContentLoaded', function() {
    // Play video previews on hover
    const videoPreviews = document.querySelectorAll('.video-preview');
    
    videoPreviews.forEach(video => {
        // Ensure videos are loaded and ready
        video.addEventListener('loadeddata', function() {
            this.currentTime = 0;
        });
        
        video.addEventListener('mouseenter', function() {
            this.play().catch(e => {
                console.log('Video play failed:', e);
            });
        });
        
        video.addEventListener('mouseleave', function() {
            this.pause();
            this.currentTime = 0;
        });
    });

    // Add click event listeners to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            openVideo(videoSrc, this);
        });
    });

    // View More/Less functionality
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const additionalProjects = document.querySelectorAll('.additional-project');
    let isExpanded = false;

    viewMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show additional projects
            additionalProjects.forEach(project => {
                project.classList.add('show');
            });
            this.innerHTML = 'View Less <i class="fas fa-chevron-up"></i>';
            this.classList.add('expanded');
        } else {
            // Hide additional projects
            additionalProjects.forEach(project => {
                project.classList.remove('show');
            });
            this.innerHTML = 'View More <i class="fas fa-chevron-down"></i>';
            this.classList.remove('expanded');
        }
    });
});

// Video modal functionality
function openVideo(videoSrc, clickedElement) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Set video source
    modalVideo.src = videoSrc;
    modal.classList.add('active');
    
    // Play the video
    modalVideo.play().catch(e => {
        console.log('Modal video play failed:', e);
    });
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideo();
    }
});

// Close modal button
document.getElementById('closeModal').addEventListener('click', closeVideo);

// Rotating titles with typing animation
document.addEventListener('DOMContentLoaded', function() {
    const rotatingTitle = document.getElementById('rotating-title');
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
        
        // Erase current text, then type new text
        eraseText(rotatingTitle, 50, function() {
            setTimeout(() => {
                typeText(rotatingTitle, titles[currentIndex], 100, function() {
                    // Wait before starting next rotation
                    setTimeout(rotateTitle, 1000);
                });
            }, 500);
        });
    }
    
    // Start rotating after initial animation completes (12 seconds)
    setTimeout(() => {
        rotateTitle();
    }, 12000);
});

// Enhanced Interactive Glow Effects
function initializeGlowEffects() {
    const workItems = document.querySelectorAll('.work-item');
    const ctaSection = document.querySelector('.cta');
    const listItems = document.querySelectorAll('.list-item');
    
    // Enhanced work item hover effects
    workItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // CTA section glow effect
    ctaSection.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        this.style.setProperty('--mouse-x', `${x}%`);
        this.style.setProperty('--mouse-y', `${y}%`);
    });

    // Skills list items glow effect
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

// Initialize all glow effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGlowEffects();
    console.log('Enhanced glassmorphism with interactive glow effects activated!');
});

// Performance optimized scroll handler
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            ticking = false;
        });
        ticking = true;
    }
});