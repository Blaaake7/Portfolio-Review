'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Make navbar transparent when it is scrolled
document.addEventListener('scroll', () => {
    if(navbarHeight < window.scrollY) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


// Handle scrolling when tapping the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if(link == null) {
        return;
    }
    scrollTo(link);
});

// Home contact button

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', (event) => {
    scrollTo('#contact');
});

function scrollTo(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

// Make home transparnet when scrolling

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Hnadling arrow-up button

const arrow = document.querySelector('.arrow');

document.addEventListener('scroll', () => {
    if(homeHeight < window.scrollY) {
        arrow.classList.add('visible');
    } else {
        arrow.classList.remove('visible');
    }
});

arrow.addEventListener('click', () => {
    scrollTo('#home');
});


// Project Filter

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter ||
     event.target.parentNode.dataset.filter;

     if(filter == null) {
        return;
     } 
    projects.forEach((project) => {
        if(filter === '*' || filter=== project.dataset.type) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
    });
    
    console.log(filter);
});
