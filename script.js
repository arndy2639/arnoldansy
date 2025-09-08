// Arnold Arndy Portfolio Website - Optimized Script
// Enhanced with performance optimizations and accessibility features

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initWebsite();
});

/**
 * Initialize all website functionality
 */
function initWebsite() {
  // Header shrink on scroll
  initHeaderScroll();
  
  // Smooth scrolling for navigation
  initSmoothScrolling();
  
  // Portfolio video modal
  initVideoModal();
  
  // Typed hero text animation
  initTypedAnimation();
  
  // Mobile menu functionality
  initMobileMenu();
  
  // Work tabs functionality
  initWorkTabs();
  
  // Form submission handling
  initQuoteForm();
  
  // Handle video loading errors
  initVideoErrorHandling();
  
  // Lazy load images with Intersection Observer
  initLazyLoading();
  
  // Initialize "More" buttons functionality
  initMoreButtons();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize quote toggle
  initQuoteToggle();
}

/**
 * Header shrink on scroll functionality
 */
function initHeaderScroll() {
  const header = document.querySelector('.header-bar');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  const scrollThreshold = 50;
  
  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
    
    lastScrollY = window.scrollY;
  };
  
  // Use requestAnimationFrame for smoother scrolling performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  // Smooth scroll for logo click
  const logoLink = document.querySelector('.logo a');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#home');
    });
  }
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      smoothScrollTo(targetId);
    });
  });
}

/**
 * Smooth scroll to element
 * @param {string} target - CSS selector of target element
 */
function smoothScrollTo(target) {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update URL hash without scrolling
    if (history.pushState && target !== '#home') {
      history.pushState(null, null, target);
    } else if (target === '#home') {
      history.pushState(null, null, ' ');
    }
  }
}

/**
 * Portfolio Video Modal functionality
 */
function initVideoModal() {
  const videoProjects = document.querySelectorAll('.video-project');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const closeBtn = document.querySelector('.close-btn');
  
  if (!modal || !modalVideo || !closeBtn) return;
  
  // Function to open modal with video
  const openModal = (videoSrc) => {
    modalVideo.querySelector('source').src = videoSrc;
    modalVideo.load();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Play video after a short delay to ensure it's loaded
    setTimeout(() => {
      modalVideo.play().catch(e => console.error('Video play failed:', e));
    }, 300);
  };
  
  // Function to close modal
  const closeModal = () => {
    modalVideo.pause();
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };
  
  // Add click event to each video project
  videoProjects.forEach(project => {
    project.addEventListener('click', () => {
      const videoSrc = project.querySelector('video source').src;
      openModal(videoSrc);
    });
  });
  
  // Close modal when clicking close button
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

/**
 * Typed Hero Text Animation
 */
function initTypedAnimation() {
  const typedHw = document.getElementById('typed-hw');
  const typedArndy = document.getElementById('typed-arndy');
  const typedSubtitle1 = document.getElementById('typed-subtitle1');
  const typedSubtitle2 = document.getElementById('typed-subtitle2');
  const viewWorkBtn = document.getElementById('view-work-btn');
  
  if (!typedHw || !typedArndy || !typedSubtitle1 || !typedSubtitle2 || !viewWorkBtn) return;
  
  const howdyLanguages = [
    "Howdy", "Hola", "Bonjour", "Ciao", "Hallo", "Olá", "Hej", "Salam", "Namaste",
    "Konnichiwa", "Ni Hao", "Annyeong", "Shalom", "Sawubona", "Merhaba", "Szia",
    "Ahoj", "Zdravo", "Hej hej", "Yassas", "Sannu", "Sveiki", "Dzień dobry",
    "Xin chào", "Kamusta", "Tere", "Labas", "Bună", "Hei", "Halo", "Aloha",
    "Goddag", "Privet", "Selam", "Helo", "Salve", "Moi", "Saluton", "Sawadee",
    "Jambo", "Talofa", "Kia ora", "Yōkoso", "Bonjourno", "Salaam", "Sveikas",
    "Shwmae", "Dia dhuit"
  ];
  
  const subtitle1Text = "Art Director | 2D/3D Animator | Visual Storyteller";
  const subtitle2Text = "Boosting Brand Engagement with Stunning Visual Experiences";
  
  let langIndex = 0;
  let animationStage = 0; // 0: Howdy, 1: I'm Arndy, 2: Subtitle1, 3: Subtitle2, 4: Button
  
  /**
   * Main typing function
   */
  function typeHero() {
    const currentLang = howdyLanguages[langIndex];
    let hwIndex = 0;
  
    // Type Howdy character by character
    function typeHowdyChar() {
      if (hwIndex <= currentLang.length) {
        typedHw.textContent = currentLang.slice(0, hwIndex);
        hwIndex++;
        setTimeout(typeHowdyChar, 150);
      } else {
        // After Howdy is typed, move to next animation stage
        if (animationStage === 0) {
          animationStage = 1;
          setTimeout(typeArndyChar, 300); // Add space after Howdy
        } else {
          // If all animations are done, just continue with next greeting
          setTimeout(() => {
            langIndex = (langIndex + 1) % howdyLanguages.length;
            typedHw.textContent = ""; // clear Howdy for next language
            typeHero();
          }, 2000);
        }
      }
    }
  
    function typeArndyChar() {
      // Added proper spacing between Howdy and I'm Arndy
      const arndyText = " I'm Arndy";
      let arndyIndex = 0;
  
      function typeChar() {
        if (arndyIndex <= arndyText.length) {
          typedArndy.textContent = arndyText.slice(0, arndyIndex);
          arndyIndex++;
          setTimeout(typeChar, 120);
        } else {
          // After "I'm Arndy" is typed, move to subtitle1
          animationStage = 2;
          setTimeout(typeSubtitle1Char, 500);
        }
      }
  
      typeChar();
    }
  
    function typeSubtitle1Char() {
      let subtitle1Index = 0;
  
      function typeChar() {
        if (subtitle1Index <= subtitle1Text.length) {
          typedSubtitle1.textContent = subtitle1Text.slice(0, subtitle1Index);
          subtitle1Index++;
          setTimeout(typeChar, 50);
        } else {
          // After subtitle1 is typed, move to subtitle2
          animationStage = 3;
          setTimeout(typeSubtitle2Char, 500);
        }
      }
  
      // Make subtitle1 visible before typing
      typedSubtitle1.style.opacity = 1;
      typeChar();
    }
  
    function typeSubtitle2Char() {
      let subtitle2Index = 0;
  
      function typeChar() {
        if (subtitle2Index <= subtitle2Text.length) {
          typedSubtitle2.textContent = subtitle2Text.slice(0, subtitle2Index);
          subtitle2Index++;
          setTimeout(typeChar, 40);
        } else {
          // After subtitle2 is typed, show the button
          animationStage = 4;
          setTimeout(showButton, 500);
        }
      }
  
      // Make subtitle2 visible before typing
      typedSubtitle2.style.opacity = 1;
      typeChar();
    }
  
    function showButton() {
      viewWorkBtn.classList.add('visible');
      
      // Continue with greeting rotation
      setTimeout(() => {
        langIndex = (langIndex + 1) % howdyLanguages.length;
        typedHw.textContent = ""; // clear Howdy for next language
        typeHero();
      }, 2000);
    }
  
    typeHowdyChar();
  }
  
  // Start the typing animation
  typeHero();
}

/**
 * Mobile Menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', 
      mobileMenuBtn.classList.contains('active').toString());
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };
  
  // Add click event to mobile menu button
  mobileMenuBtn.addEventListener('click', toggleMenu);
  
  // Close mobile menu when clicking on overlay
  overlay.addEventListener('click', toggleMenu);
  
  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    });
  });
}

/**
 * Work Tabs functionality
 */
function initWorkTabs() {
  const workTabs = document.querySelectorAll('.work-tab');
  const workContents = document.querySelectorAll('.work-content');
  
  if (workTabs.length === 0 || workContents.length === 0) return;
  
  workTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      workTabs.forEach(t => t.classList.remove('active'));
      workContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      const contentElement = document.getElementById(`${tabId}-content`);
      
      if (contentElement) {
        contentElement.classList.add('active');
      }
    });
  });
}

/**
 * "More" buttons functionality with toggle text and slide-up animation
 */
function initMoreButtons() {
  const moreButtons = document.querySelectorAll('.more-btn');
  
  moreButtons.forEach(button => {
    // Store original text
    const originalText = button.textContent;
    const lessText = 'Show Less';
    let isExpanded = false;
    
    button.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      const hiddenItems = document.querySelectorAll(`.${type}-content .hidden-item`);
      
      if (hiddenItems.length > 0 && !isExpanded) {
        // Show all hidden items with slide-up animation
        hiddenItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove('hidden-item');
            item.classList.add('show-item');
          }, index * 100); // Stagger the animations
        });
        
        // Change button text
        this.textContent = lessText;
        isExpanded = true;
      } else {
        // Hide items with slide-down animation
        const allItems = document.querySelectorAll(`.${type}-content .project, .${type}-content .bento-item`);
        for (let i = 6; i < allItems.length; i++) {
          setTimeout(() => {
            allItems[i].classList.remove('show-item');
            allItems[i].classList.add('hidden-item');
          }, (allItems.length - i - 1) * 100); // Reverse stagger for hide animation
        }
        
        // Change button text back
        this.textContent = originalText;
        isExpanded = false;
        
        // Scroll to section to see the first items
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else if (prefersDark) {
    body.classList.add('dark-theme');
  } else {
    body.classList.add('light-theme');
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  });
}

/**
 * Quote toggle functionality
 */
function initQuoteToggle() {
  const quoteToggle = document.getElementById('quote-toggle');
  const quoteFormContainer = document.getElementById('quote-form-container');
  
  if (!quoteToggle || !quoteFormContainer) return;
  
  let isExpanded = false;
  
  quoteToggle.addEventListener('click', () => {
    if (!isExpanded) {
      // Expand the form
      quoteFormContainer.classList.add('expanded');
      quoteToggle.textContent = 'Hide Form';
      isExpanded = true;
      
      // Scroll to the form
      setTimeout(() => {
        document.getElementById('get-quote').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      // Collapse the form
      quoteFormContainer.classList.remove('expanded');
      quoteToggle.textContent = 'Get A Quote';
      isExpanded = false;
    }
  });
}

/**
 * Quote Form handling
 */
function initQuoteForm() {
  const quoteForm = document.getElementById('quote-form');
  if (!quoteForm) return;
  
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      alert('Thank you for your inquiry! I will get back to you soon.');
      this.reset();
    }, 1500);
  });
}

/**
 * Video Error Handling
 */
function initVideoErrorHandling() {
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      document.querySelector('.hero-section').classList.add('video-failed');
    });
  }
}

/**
 * Lazy Loading with Intersection Observer
 */
function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length === 0) return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load the image
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        // Remove lazy class if it exists
        img.classList.remove('lazy');
        
        // Stop observing the image
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px', // Start loading 200px before element is in view
    threshold: 0.01
  });

  // Observe all lazy images
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initWebsite,
    initHeaderScroll,
    initSmoothScrolling,
    initVideoModal,
    initTypedAnimation,
    initMobileMenu,
    initWorkTabs,
    initMoreButtons,
    initThemeToggle,
    initQuoteToggle,
    initQuoteForm,
    initVideoErrorHandling,
    initLazyLoading
  };
}