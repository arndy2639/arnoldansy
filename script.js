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
  
  // Typed hero text animation with language switching
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
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize quote toggle
  initQuoteToggle();
  
  // Initialize drag and drop for about section
  initDragAndDrop();
  
  // Initialize horizontal wheel scrolling for projects
  initHorizontalScroll();
  
  // Initialize WhatsApp chat button
  initWhatsAppChat();
}

/**
 * Header shrink on scroll functionality
 */
function initHeaderScroll() {
  const header = document.querySelector('.header-bar');
  if (!header) return;
  
  const scrollThreshold = 50;
  
  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
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
  const videoProjects = document.querySelectorAll('.video-project, .video-bento');
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
      const videoElement = project.querySelector('video');
      if (videoElement) {
        const videoSrc = videoElement.querySelector('source').src;
        openModal(videoSrc);
      }
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
 * Typed Hero Text Animation with word-by-word fade-in and language switching
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
  let isAnimationComplete = false;

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
        } else if (!isAnimationComplete) {
          // If animation is complete, cycle through languages
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
      // Make subtitle1 visible before typing
      typedSubtitle1.style.opacity = 1;
      
      // Split the subtitle into words for word-by-word animation
      const words = subtitle1Text.split(' ');
      let wordIndex = 0;
      
      function typeWordByWord() {
        if (wordIndex < words.length) {
          // Add each word with a span for individual animation
          const wordSpan = document.createElement('span');
          wordSpan.textContent = words[wordIndex] + ' ';
          wordSpan.style.opacity = '0';
          wordSpan.style.animation = 'wordByWord 0.5s ease forwards';
          wordSpan.style.animationDelay = (wordIndex * 0.1) + 's';
          typedSubtitle1.appendChild(wordSpan);
          
          wordIndex++;
          setTimeout(typeWordByWord, 100);
        } else {
          // After subtitle1 is typed, move to subtitle2
          animationStage = 3;
          setTimeout(typeSubtitle2Char, 500);
        }
      }
      
      // Clear any existing content
      typedSubtitle1.textContent = '';
      typeWordByWord();
    }

    function typeSubtitle2Char() {
      // Make subtitle2 visible before typing
      typedSubtitle2.style.opacity = 1;
      
      // Split the subtitle into words for word-by-word animation
      const words = subtitle2Text.split(' ');
      let wordIndex = 0;
      
      function typeWordByWord() {
        if (wordIndex < words.length) {
          // Add each word with a span for individual animation
          const wordSpan = document.createElement('span');
          wordSpan.textContent = words[wordIndex] + ' ';
          wordSpan.style.opacity = '0';
          wordSpan.style.animation = 'wordByWord 0.5s ease forwards';
          wordSpan.style.animationDelay = (wordIndex * 0.1) + 's';
          typedSubtitle2.appendChild(wordSpan);
          
          wordIndex++;
          setTimeout(typeWordByWord, 100);
        } else {
          // After subtitle2 is typed, show the button
          animationStage = 4;
          isAnimationComplete = true;
          setTimeout(showButton, 500);
          
          // Start language cycling after animation is complete
          setTimeout(startLanguageCycling, 3000);
        }
      }
      
      // Clear any existing content
      typedSubtitle2.textContent = '';
      typeWordByWord();
    }

    function showButton() {
      viewWorkBtn.classList.add('visible');
    }

    typeHowdyChar();
  }

  /**
 * Start cycling through languages with typing animation
 */
function startLanguageCycling() {
  let currentIndex = 0;
  
  function typeLanguage(text, index = 0) {
    if (index === 0) {
      typedHw.textContent = '';
    }
    
    if (index < text.length) {
      typedHw.textContent += text.charAt(index);
      setTimeout(() => typeLanguage(text, index + 1), 100);
    } else {
      // Wait before erasing
      setTimeout(eraseLanguage, 2000);
    }
  }
  
  function eraseLanguage() {
    const text = typedHw.textContent;
    if (text.length > 0) {
      typedHw.textContent = text.slice(0, -1);
      setTimeout(eraseLanguage, 50);
    } else {
      // Move to next language
      currentIndex = (currentIndex + 1) % howdyLanguages.length;
      setTimeout(() => typeLanguage(howdyLanguages[currentIndex]), 500);
    }
  }
  
  // Start the typing cycle
  if (isAnimationComplete) {
    typeLanguage(howdyLanguages[currentIndex]);
  }
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
 * Theme toggle functionality
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on system preference
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else if (prefersDark) {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  } else {
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  }
  
  // Update header bar color based on theme
  updateHeaderBarColor();
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
    }
    
    // Update header bar color after theme change
    updateHeaderBarColor();
  });
}

/**
 * Update header bar color based on current theme
 */
function updateHeaderBarColor() {
  const headerBar = document.querySelector('.header-bar');
  const isLightTheme = document.body.classList.contains('light-theme');
  
  if (headerBar) {
    if (isLightTheme) {
      headerBar.style.background = 'rgba(255, 255, 255, 0.9)';
    } else {
      headerBar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
  }
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

/**
 * Initialize drag and drop functionality for about section
 */
function initDragAndDrop() {
  const draggableContainer = document.getElementById('draggable-container');
  const draggableItems = document.querySelectorAll('.draggable');
  
  if (!draggableContainer || draggableItems.length === 0) return;
  
  let draggedItem = null;
  
  // Add event listeners for each draggable item
  draggableItems.forEach(item => {
    // Drag start event
    item.addEventListener('dragstart', function(e) {
      draggedItem = this;
      setTimeout(() => {
        this.classList.add('dragging');
      }, 0);
    });
    
    // Drag end event
    item.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      draggedItem = null;
      
      // Save the new layout to localStorage
      saveLayout();
    });
  });
  
  // Add event listeners to the container
  draggableContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
    // Add visual indicator for drop target
    e.dataTransfer.dropEffect = 'move';
  });
  
  draggableContainer.addEventListener('dragenter', function(e) {
    e.preventDefault();
  });
  
  draggableContainer.addEventListener('drop', function(e) {
    e.preventDefault();
    if (draggedItem) {
      // Get all draggable items
      const items = Array.from(this.querySelectorAll('.draggable:not(.dragging)'));
      
      // Find the item to insert before
      const nextItem = items.find(item => {
        const rect = item.getBoundingClientRect();
        return e.clientY <= rect.top + rect.height / 2;
      });
      
      if (nextItem) {
        this.insertBefore(draggedItem, nextItem);
      } else {
        this.appendChild(draggedItem);
      }
    }
  });
  
  // Load saved layout if available
  loadLayout();
}

/**
 * Save the current layout to localStorage
 */
function saveLayout() {
  const draggableContainer = document.getElementById('draggable-container');
  if (!draggableContainer) return;
  
  const items = Array.from(draggableContainer.querySelectorAll('.draggable'));
  const layout = items.map(item => item.id);
  
  localStorage.setItem('aboutLayout', JSON.stringify(layout));
}

/**
 * Load the saved layout from localStorage
 */
function loadLayout() {
  const savedLayout = localStorage.getItem('aboutLayout');
  if (!savedLayout) return;
  
  try {
    const layout = JSON.parse(savedLayout);
    const draggableContainer = document.getElementById('draggable-container');
    
    if (!draggableContainer) return;
    
    // Reorder items based on saved layout
    layout.forEach(id => {
      const item = document.getElementById(id);
      if (item) {
        draggableContainer.appendChild(item);
      }
    });
  } catch (e) {
    console.error('Error loading layout:', e);
  }
}

/**
 * Initialize scroll behavior for projects and bentos containers
 */
function initHorizontalScroll() {
  const projectsContainer = document.querySelector('.projects-scroll-container');
  const bentosContainer = document.querySelector('.bentos-scroll-container');
  
  if (!projectsContainer && !bentosContainer) return;
  
  function initScrollContainer(container) {
    let isScrolling = false;
    let startY = null;
    let startX = null;
    let scrollLeft = 0;
    let scrollTop = 0;

    // Touch event handlers
    container.addEventListener('touchstart', (e) => {
      startY = e.touches[0].pageY;
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!startY || !startX) return;

      const deltaY = startY - e.touches[0].pageY;
      const deltaX = startX - e.touches[0].pageX;
      
      // Mobile: vertical scroll only
      if (window.innerWidth <= 768) {
        container.scrollTop = scrollTop + deltaY;
        return;
      }
      
      // Desktop/Tablet: prefer horizontal scroll
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        container.scrollLeft = scrollLeft + deltaX;
        e.preventDefault();
      } else {
        container.scrollTop = scrollTop + deltaY;
      }
    }, { passive: false });

    container.addEventListener('touchend', () => {
      startY = null;
      startX = null;
    });

    // Mouse wheel handler
    container.addEventListener('wheel', (e) => {
      // Mobile: allow normal vertical scrolling
      if (window.innerWidth <= 768) return;

      if (!isScrolling) {
        isScrolling = true;
        
        // Handle vertical scrolling with wheel
        if (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          container.scrollTop += e.deltaY;
        } else {
          // Handle horizontal scrolling
          container.scrollLeft += e.deltaX || e.deltaY;
          e.preventDefault();
        }

        // Debounce scroll handling
        requestAnimationFrame(() => {
          isScrolling = false;
        });
      }
    }, { passive: false });

    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
      const SCROLL_AMOUNT = 100;
      
      switch(e.key) {
        case 'ArrowRight':
          container.scrollLeft += SCROLL_AMOUNT;
          e.preventDefault();
          break;
        case 'ArrowLeft':
          container.scrollLeft -= SCROLL_AMOUNT;
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (window.innerWidth <= 768) {
            container.scrollTop += SCROLL_AMOUNT;
          }
          break;
        case 'ArrowUp':
          if (window.innerWidth <= 768) {
            container.scrollTop -= SCROLL_AMOUNT;
          }
          break;
      }
    });
  }

  // Initialize scroll behavior for both containers
  if (projectsContainer) initScrollContainer(projectsContainer);
  if (bentosContainer) initScrollContainer(bentosContainer);
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reset scroll position on layout change
      if (projectsContainer) {
        projectsContainer.scrollLeft = 0;
        projectsContainer.scrollTop = 0;
      }
      if (bentosContainer) {
        bentosContainer.scrollLeft = 0;
        bentosContainer.scrollTop = 0;
      }
    }, 150);
  });
}

/**
 * Initialize WhatsApp chat button functionality
 */
function initWhatsAppChat() {
  const whatsappButton = document.getElementById('whatsapp-chat');
  if (!whatsappButton) return;
  
  // Set up WhatsApp link based on device
  function setupWhatsAppLink() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = '254790489904'; // Your WhatsApp number
    
    if (isMobile) {
      // Use WhatsApp deep link for mobile devices
      whatsappButton.href = `whatsapp://send?phone=${phoneNumber}`;
    } else {
      // Use web WhatsApp for desktop
      whatsappButton.href = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    }
  }
  
  // Set up the link initially
  setupWhatsAppLink();
  
  // Update link on orientation change or resize (for devices that might change)
  window.addEventListener('resize', setupWhatsAppLink);
  window.addEventListener('orientationchange', setupWhatsAppLink);
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
    initThemeToggle,
    initQuoteToggle,
    initQuoteForm,
    initVideoErrorHandling,
    initLazyLoading,
    initDragAndDrop,
    initHorizontalScroll,
    initWhatsAppChat
  };
}