(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function removeClasses(array, className) {
        for (var i = 0; i < array.length; i++) array[i].classList.remove(className);
    }
    function addActiveClass(buttonsClass, activeClass) {
        const buttons = document.querySelectorAll(buttonsClass);
        document.addEventListener("click", (function(e) {
            const isClickInsideButtons = Array.from(buttons).some((button => button.contains(e.target)));
            const isClickInsideParent = Array.from(buttons).some((button => button.closest(buttonsClass).parentElement.contains(e.target)));
            if (!isClickInsideButtons && !isClickInsideParent) buttons.forEach((item => {
                item.closest(buttonsClass).parentElement.classList.remove(activeClass);
            }));
        }));
        buttons.forEach((item => {
            item.addEventListener("click", (function(e) {
                e.preventDefault();
                this.closest(buttonsClass).parentElement.classList.toggle(activeClass);
                buttons.forEach((otherItem => {
                    if (otherItem !== this) otherItem.closest(buttonsClass).parentElement.classList.remove(activeClass);
                }));
            }));
        }));
    }
    addActiveClass(".menu-toggle", "open-dropdown");
    addActiveClass(".spollers__title", "open-spollers");
    document.addEventListener("mouseover", (e => {
        const targetElement = e.target;
        if (!isMobile.any()) {
            if (targetElement.closest(".menu-toggle")) {
                removeClasses(document.querySelectorAll(".menu__item.open-dropdown"), "open-dropdown");
                targetElement.closest(".menu__item").classList.toggle("open-dropdown");
            }
            if (!targetElement.closest(".menu__item") && !targetElement.closest(".menu-toggle")) removeClasses(document.querySelectorAll(".menu__item.open-dropdown"), "open-dropdown");
        }
    }));
    document.addEventListener("click", (e => {
        const targetElement = e.target;
        if (targetElement.closest(".trade-table__arrow")) targetElement.closest(".trade-table__row").classList.toggle("open-table");
        if (targetElement.closest(".footer__nav-title")) targetElement.closest(".footer__nav-column").classList.toggle("open-footer-nav");
    }));
    isWebp();
    menuInit();
})();