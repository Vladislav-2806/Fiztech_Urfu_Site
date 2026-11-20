document.addEventListener('DOMContentLoaded', () => {
    // 1. Оборачиваем текст в слова для анимации
    const textElements = document.querySelectorAll('.content-section p, .dept-subtitle');
    
    textElements.forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map((word, index) => 
            `<span class="word" style="transition-delay: ${index * 0.03}s">${word}</span>`
        ).join(' ');
    });

    // 2. Анимация появления секций и текста
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимация срабатывает один раз
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // 3. Подсветка активного пункта меню
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(section => navObserver.observe(section));
});