document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.site-header__hamburger');
    const navLinksWrapper = document.querySelector('.primary-nav__links-wrapper');

    if (hamburgerBtn && navLinksWrapper) {
        const closeMenu = () => {
            navLinksWrapper.classList.remove('is-active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        };

        hamburgerBtn.addEventListener('click', () => {
            navLinksWrapper.classList.toggle('is-active');
            const isExpanded = navLinksWrapper.classList.contains('is-active');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });

        navLinksWrapper.addEventListener('click', (e) => {
            if (e.target === navLinksWrapper) {
                closeMenu();
            }
        });
        
        const navLinks = navLinksWrapper.querySelectorAll('.primary-nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMenu, 100); 
            });
        });

        window.addEventListener('resize', () => {
            if (navLinksWrapper.classList.contains('is-active')) {
                if (window.innerWidth >= 1200) {
                    closeMenu();
                }
            }
        });
    }
});