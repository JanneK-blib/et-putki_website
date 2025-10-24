
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
});
  