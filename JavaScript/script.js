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
  
    if (scrollPosition > (0.5 * document.documentElement.clientHeight)) {
      document.getElementById('toFrontPage').classList.add('show'); 
    } else {
      document.getElementById('toFrontPage').classList.remove('show');
    }
  
    var footerPosition = document.getElementById('footer').getBoundingClientRect().top;
    if (footerPosition <= document.documentElement.clientHeight) {
      document.getElementById('toFrontPage').classList.add('hide');
    } else {
        this.document.getElementById('toFrontPage').classList.remove('hide');
    }
  });
  