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
    const currentPageUrl = window.location.href.split(/[?#]/)[0];

    navLinks.forEach(function(link) {
        const tempAnchor = document.createElement('a');

        tempAnchor.href = link.getAttribute('href');
        
        const resolvedLinkUrl = tempAnchor.href.split(/[?#]/)[0];
        if (currentPageUrl === resolvedLinkUrl) {
            link.classList.add('is-current-page');
        }
    });
});