document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.site-header__hamburger');
    const navLinksWrapper = document.querySelector('.primary-nav__links-wrapper');

    if (hamburgerBtn && navLinksWrapper) {
        function closeMenu() {
            navLinksWrapper.classList.remove('is-active');
            hamburgerBtn.setAttribute('aria-expanded', 'false'); 
        }
        hamburgerBtn.addEventListener('click', function() {
            navLinksWrapper.classList.toggle('is-active');
            hamburgerBtn.classList.toggle('is-active'); 
    
            const isExpanded = navLinksWrapper.classList.contains('is-active');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });
        navLinksWrapper.addEventListener('click', function(e) {
            if (e.target === navLinksWrapper) {
                closeMenu();
            }
        });
        const navLinks = navLinksWrapper.querySelectorAll('.primary-nav__link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 100); 
            });
        });
        window.addEventListener('resize', function() {
            if (navLinksWrapper.classList.contains('is-active')) {
                if (window.innerWidth >= 1200) {
                    closeMenu();
                }
            }
        });
    }

    const navLinks = document.querySelectorAll('.primary-nav__link');
    const currentPath = window.location.pathname;

    navLinks.forEach(function(link) {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) || linkPath === currentPath) {
            if (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
                link.classList.add('is-current-page');
            }
            else if (linkPath !== 'index.html') {
                link.classList.add('is-current-page');
            }
        }
    });
});