/* ===================================
   navigation.js
   Handles hamburger menu and mobile
   dropdown toggling.
   =================================== */

(function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    /* --- Hamburger: toggle mobile nav open/close --- */
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    /* --- Dropdowns ---
         On desktop, CSS :hover handles everything — no JS needed.
         On mobile, we intercept the first tap on a dropdown trigger:
           - First tap: open the submenu, do NOT follow the href
           - Second tap on the same item: follow the href (navigate)
         This gives users a chance to see the submenu on touch devices
         where hover doesn't exist.
    ----------------------------------------------------------------- */
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropdown) {
        const trigger = dropdown.querySelector(':scope > .button');

        if (!trigger) return;

        trigger.addEventListener('click', function (e) {
            /* Only intercept on touch/mobile — desktop uses CSS hover */
            if (window.innerWidth > 768) return;

            const isOpen = dropdown.classList.contains('active');

            /* Close all other open dropdowns first */
            dropdowns.forEach(function (d) {
                if (d !== dropdown) d.classList.remove('active');
            });

            if (!isOpen) {
                /* First tap: open submenu, stay on page */
                e.preventDefault();
                dropdown.classList.add('active');
            } else {
                /* Second tap: submenu already open, allow navigation */
                dropdown.classList.remove('active');
            }
        });
    });

    /* Close nav and dropdowns if user taps outside */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav')) {
            navLinks && navLinks.classList.remove('active');
            hamburger && hamburger.classList.remove('active');
            dropdowns.forEach(function (d) { d.classList.remove('active'); });
        }
    });
})();
