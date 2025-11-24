// Оптимизированный JavaScript с улучшенной производительностью
document.addEventListener('DOMContentLoaded', function () {
    // Кэширование DOM элементов
    const elements = {
        tabs: document.querySelectorAll('.nav-tab'),
        categories: document.querySelectorAll('.category'),
        backToTopButton: document.querySelector('.back-to-top'),
        packages3d: document.querySelectorAll('.package-3d'),
        priceHighlights: document.querySelectorAll('.price-highlight'),
        floatingElements: document.querySelectorAll('.floating-element')
    };

    // Инициализация приложения
    function initApp() {
        initTabNavigation();
        initScrollAnimations();
        initBackToTopButton();
        init3DEffects();
        initPriceHighlights();
        initFloatingElements();
    }

    // Навигация по вкладкам
    function initTabNavigation() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const target = this.getAttribute('data-target');

                // Обновление активной вкладки
                elements.tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Показать целевую категорию
                elements.categories.forEach(category => {
                    if (category.id === target) {
                        category.classList.add('visible');
                    } else {
                        category.classList.remove('visible');
                    }
                });

                // Прокрутка к цели
                document.getElementById(target).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Анимации при прокрутке
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.category, .package, .bot-package').forEach(el => {
            observer.observe(el);
        });
    }

    // Кнопка "Наверх"
    function initBackToTopButton() {
        // Используем requestAnimationFrame для оптимизации скролла
        let ticking = false;

        function updateBackToTop() {
            if (window.pageYOffset > 300) {
                elements.backToTopButton.classList.add('visible');
            } else {
                elements.backToTopButton.classList.remove('visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });

        elements.backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Анимация подсветки цен
    function initPriceHighlights() {
        setInterval(() => {
            elements.priceHighlights.forEach(highlight => {
                highlight.style.animation = 'none';
                // Принудительный reflow для перезапуска анимации
                void highlight.offsetWidth;
                highlight.style.animation = null;
            });
        }, 4000);
    }

    // Анимация плавающих элементов
    function initFloatingElements() {
        elements.floatingElements.forEach((el, index) => {
            el.style.animationDuration = `${15 + index * 2}s`;
        });
    }

    // Запуск приложения
    initApp();

    // Оптимизация производительности при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Переинициализация эффектов при изменении размера
            init3DEffects();
        }, 250);
    });
});