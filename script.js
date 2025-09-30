// script.js
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
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