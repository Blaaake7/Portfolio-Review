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

// Intersection Observer

// 1. 해당하는 요소들 가져오기

const sectionIds = ['#home',
                    '#about',
                    '#skills',
                    '#work',
                    '#testimonials',
                    '#contact',];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = 
    sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function scrollTo(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

function selectNavItem (selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어서 페이지가 올라옴.
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {    
                selectedNavIndex = index - 1;
            }
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});