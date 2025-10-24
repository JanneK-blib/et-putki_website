
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
  