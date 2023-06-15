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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/**/
const observerUpper = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-upper');
        }
    });
});

const hiddenElementsUpper = document.querySelectorAll('.hidden-upper');
hiddenElementsUpper.forEach((el) => observerUpper.observe(el));

/**/
const observerMiddle = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-middle');
        }
    });
});

const hiddenElementsMiddle = document.querySelectorAll('.hidden-middle');
hiddenElementsMiddle.forEach((el) => observerMiddle.observe(el));


/**/
const observerLeft = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-from-left');
        }
    });
});

const hiddenElementsFromLeft = document.querySelectorAll('.hidden-bottom-left');
hiddenElementsFromLeft.forEach((el) => observerLeft.observe(el));

/**/
const observerRight = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-from-right');
        }
    });
});

const hiddenElementsFromRight = document.querySelectorAll('.hidden-bottom-right');
hiddenElementsFromRight.forEach((el) => observerRight.observe(el));

  

