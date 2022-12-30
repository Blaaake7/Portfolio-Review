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
    // remove toggle button when scrolling
    navbarMenu.classList.remove('open');
});

// Handle scrolling when tapping the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if(link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollTo(link);
});

// navbar toggle button
const navbarArrowBtn = document.querySelector('.navbar__toggle-btn');
navbarArrowBtn.addEventListener('click',() => {
    navbarMenu.classList.toggle('open');
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

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter ||
    e.target.parentNode.dataset.filter;

    if(filter == null) {
        return;
    } 

    //remove previous selection and select new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : 
                    e.target.parentNode;
    target.classList.add('selected');
    
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter=== project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});