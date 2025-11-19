
window.addEventListener('DOMContentLoaded', () => {
  let intro = document.querySelector('.intro');
  let introLogo = document.querySelector('.intro-logo');

  if (intro && introLogo) {
    let isSplashScreenShown = localStorage.getItem('isSplashScreenShown');

    if (!isSplashScreenShown) {
      localStorage.setItem('isSplashScreenShown', 'true');
    
      setTimeout(() => {
        introLogo.classList.add('active');
      }, 500);
    
      setTimeout(() => {
        introLogo.classList.remove('active');
        introLogo.classList.add('fade');
      }, 2000);
    
      setTimeout(() => {
        intro.style.top = '-100vh';
      }, 2300);
    
      setTimeout(() => {
        localStorage.removeItem('isSplashScreenShown');
      }, 1800000);
    } else {
      intro.style.display = 'none';
    }
  }
})

document.querySelector('.hamburger-icon').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.middle-section').classList.toggle('hiddenText');
});

document.querySelectorAll('.nav-link a').forEach(function(link) {
    link.addEventListener('click', function() {
      document.querySelector('.hamburger-icon').classList.remove('active');
      document.querySelector('.nav-menu').classList.remove('active');
    });
});

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var toPageUp = document.getElementById('toPageUp');
  var footerPosition = document.getElementById('footer').getBoundingClientRect().top;
  var navbar = document.querySelector('.navbar');

  // Modern navbar scroll effect (desktop only)
  if (window.innerWidth >= 651 && navbar) {
    if (scrollPosition > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (toPageUp) {
    if (scrollPosition > (0.5 * document.documentElement.clientHeight)) {
      toPageUp.classList.add('show'); 
    } else {
      toPageUp.classList.remove('show');
    }

    if (footerPosition <= document.documentElement.clientHeight) {
      toPageUp.classList.add('hide');
    } else {
      toPageUp.classList.remove('hide');
    }
  }
});

var toPageUpBtn = document.getElementById('toPageUp');

if (toPageUpBtn) {
  toPageUpBtn.addEventListener('click', function(e) {
    e.preventDefault();

    window.scrollTo ({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Modern Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.galleria-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            // Add stagger animation
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, Math.random() * 200);
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
  
  // Lightbox functionality
  const modal = document.getElementById('lightbox-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');
  const expandButtons = document.querySelectorAll('.expand-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentImageIndex = 0;
  let visibleImages = [];
  
  function updateVisibleImages() {
    visibleImages = Array.from(document.querySelectorAll('.galleria-item:not(.hidden) img'));
  }
  
  function openModal(imageSrc, index) {
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeydown);
  }
  
  function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeydown);
  }
  
  function showPrevImage() {
    updateVisibleImages();
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : visibleImages.length - 1;
    modalImage.src = visibleImages[currentImageIndex].src;
  }
  
  function showNextImage() {
    updateVisibleImages();
    currentImageIndex = currentImageIndex < visibleImages.length - 1 ? currentImageIndex + 1 : 0;
    modalImage.src = visibleImages[currentImageIndex].src;
  }
  
  function handleKeydown(e) {
    switch(e.key) {
      case 'Escape':
        closeModalFunc();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }
  
  // Event listeners
  if (expandButtons.length > 0) {
    expandButtons.forEach((btn, index) => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const imageSrc = this.getAttribute('data-src');
        updateVisibleImages();
        const actualIndex = visibleImages.findIndex(img => img.src.includes(imageSrc.split('/').pop()));
        openModal(imageSrc, actualIndex >= 0 ? actualIndex : index);
      });
    });
  }
  
  // Also allow clicking on images to open modal
  const galleryImages = document.querySelectorAll('.galleria-card img');
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      updateVisibleImages();
      const actualIndex = visibleImages.findIndex(visibleImg => visibleImg.src === this.src);
      openModal(this.src, actualIndex >= 0 ? actualIndex : index);
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', showPrevImage);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', showNextImage);
  }
  
  // Close modal when clicking outside the image
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModalFunc();
      }
    });
  }
  
  // Image loading management
  const galleryWrapper = document.querySelector('.galleria-wrapper');
  const allImages = document.querySelectorAll('.galleria-card img');
  let imagesLoaded = 0;
  
  if (galleryWrapper && allImages.length > 0) {
    galleryWrapper.classList.add('loading');
    
    allImages.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
        imagesLoaded++;
      } else {
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          imagesLoaded++;
          
          if (imagesLoaded === allImages.length) {
            galleryWrapper.classList.remove('loading');
          }
        });
        
        img.addEventListener('error', function() {
          imagesLoaded++;
          if (imagesLoaded === allImages.length) {
            galleryWrapper.classList.remove('loading');
          }
        });
      }
    });
    
    // Remove loading if all images are already loaded
    if (imagesLoaded === allImages.length) {
      galleryWrapper.classList.remove('loading');
    }
  }
  
  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe gallery items for scroll animation
    galleryItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });
  }
  
  // Smooth scroll for gallery navigation
  const galleryLinks = document.querySelectorAll('a[href*="galleria"]');
  galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').includes('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Modern Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    initializeModernForm();
  }
});

// Modern Form Functions
function initializeModernForm() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
  const charCountInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const progressBar = document.getElementById('progressBar');
  const submitBtn = document.getElementById('submitBtn');

  // Character counter
  if (charCountInput && charCount) {
    charCountInput.addEventListener('input', function() {
      charCount.textContent = this.value.length;
      updateProgress();
    });
  }

  // Input validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
      updateProgress();
    });

    input.addEventListener('input', function() {
      validateField(this);
      updateProgress();
    });

    input.addEventListener('focus', function() {
      clearError(this.id);
    });
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Validate GDPR checkbox
    const gdprCheckbox = document.getElementById('gdpr');
    if (!gdprCheckbox.checked) {
      showError('gdpr', 'Sinun tulee hyväksyä tietojesi käsittely');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Submit form
    setTimeout(() => {
      form.submit();
    }, 500);
  });

  // Validate on GDPR checkbox change
  const gdprCheckbox = document.getElementById('gdpr');
  if (gdprCheckbox) {
    gdprCheckbox.addEventListener('change', function() {
      if (this.checked) {
        clearError('gdpr');
      }
    });
  }
}

function validateField(field) {
  const fieldName = field.name || field.id;
  let isValid = true;
  let errorMessage = '';

  // Skip non-required fields that are empty
  if (!field.hasAttribute('required') && field.value.trim() === '') {
    clearStatus(field.id);
    return true;
  }

  // Validate required fields
  if (field.hasAttribute('required') && field.value.trim() === '') {
    isValid = false;
    errorMessage = 'Tämä kenttä on pakollinen';
  }

  // Specific field validations
  if (isValid) {
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Syötä kelvollinen sähköpostiosoite';
      }
    }

    if (field.type === 'tel') {
      const phoneRegex = /^[0-9\s\-\+()]{6,}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        isValid = false;
        errorMessage = 'Syötä kelvollinen puhelinnumero';
      }
    }

    if (field.name === 'message' && field.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Viestin tulee olla vähintään 10 merkkiä pitkä';
    }
  }

  if (!isValid) {
    showError(field.id, errorMessage);
  } else {
    setStatus(field.id, 'valid');
  }

  return isValid;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');
  const statusElement = document.getElementById(fieldId + 'Status');

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }

  if (statusElement) {
    statusElement.textContent = '❌';
    statusElement.classList.remove('valid');
    statusElement.classList.add('invalid');
  }

  if (field) {
    const wrapper = field.closest('.input-wrapper, .textarea-wrapper');
    if (wrapper) {
      wrapper.style.borderColor = '#dc3545';
    }
  }
}

function clearError(fieldId) {
  const errorElement = document.getElementById(fieldId + 'Error');
  const statusElement = document.getElementById(fieldId + 'Status');

  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }

  if (statusElement) {
    statusElement.classList.remove('invalid');
  }

  const field = document.getElementById(fieldId);
  if (field) {
    const wrapper = field.closest('.input-wrapper, .textarea-wrapper');
    if (wrapper) {
      wrapper.style.borderColor = '#e9ecef';
    }
  }
}

function setStatus(fieldId, status) {
  const field = document.getElementById(fieldId);
  const statusElement = document.getElementById(fieldId + 'Status');
  const errorElement = document.getElementById(fieldId + 'Error');

  if (statusElement) {
    if (status === 'valid') {
      statusElement.textContent = '✅';
      statusElement.classList.add('valid');
      statusElement.classList.remove('invalid');
    }
  }

  if (errorElement) {
    errorElement.classList.remove('show');
  }

  if (field) {
    const wrapper = field.closest('.input-wrapper, .textarea-wrapper');
    if (wrapper) {
      if (status === 'valid') {
        wrapper.style.borderColor = '#e9ecef';
      }
    }
  }
}

function clearStatus(fieldId) {
  const statusElement = document.getElementById(fieldId + 'Status');
  if (statusElement) {
    statusElement.textContent = '';
    statusElement.classList.remove('valid', 'invalid');
  }
}

function updateProgress() {
  const form = document.getElementById('contactForm');
  const requiredFields = form.querySelectorAll('[required]');
  const gdprCheckbox = document.getElementById('gdpr');
  const progressBar = document.getElementById('progressBar');

  let filledFields = 0;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      if (field.checked) filledFields++;
    } else if (field.value.trim() !== '') {
      filledFields++;
    }
  });

  // Add GDPR checkbox
  if (gdprCheckbox && gdprCheckbox.checked) {
    filledFields++;
  }

  const totalFields = requiredFields.length + 1; // +1 for GDPR
  const progress = (filledFields / totalFields) * 100;

  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}