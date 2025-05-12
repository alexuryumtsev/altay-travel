// Простой слайдер для отзывов
document.addEventListener('DOMContentLoaded', function() {
    // Элементы слайдера
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Функция для показа конкретного слайда
    function showSlide(n) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Удаляем активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Показываем нужный слайд и делаем активной нужную точку
        slides[n].style.display = 'block';
        dots[n].classList.add('active');

        currentSlide = n;
    }

    // Инициализация слайдера
    showSlide(0);

    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', function() {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) {
            newSlide = slideCount - 1;
        }
        showSlide(newSlide);
    });

    nextBtn.addEventListener('click', function() {
        let newSlide = currentSlide + 1;
        if (newSlide >= slideCount) {
            newSlide = 0;
        }
        showSlide(newSlide);
    });

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Автоматическая смена слайдов каждые 5 секунд
    setInterval(function() {
        let newSlide = currentSlide + 1;
        if (newSlide >= slideCount) {
            newSlide = 0;
        }
        showSlide(newSlide);
    }, 5000);

    // Фиксированное меню при прокрутке
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
    });

    // Плавная прокрутка к секциям при клике на пункты меню
    const menuLinks = document.querySelectorAll('nav a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


// Добавьте этот скрипт в конец файла script.js или замените скрипт для Mapbox

// Инициализация Яндекс Карты
document.addEventListener('DOMContentLoaded', function() {
    // Функция загрузки API Яндекс Карт с проверкой, не загружен ли он уже
    const loadYandexMaps = () => {
        if (typeof ymaps !== 'undefined') {
            initYandexMap();
        } else {
            // Динамическая загрузка API Яндекс Карт
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
            script.onload = initYandexMap;
            document.head.appendChild(script);
        }
    };

    // Функция инициализации Яндекс Карты
    const initYandexMap = () => {
        // Дожидаемся полной загрузки API
        ymaps.ready(() => {
            // Создаем карту
            const map = new ymaps.Map('yandex-map', {
                center: [50.271, 85.613], // Координаты Усть-Коксы
                zoom: 12,
                controls: ['zoomControl', 'fullscreenControl', 'rulerControl']
            });

            // Создаем метку
            const placemark = new ymaps.Placemark([50.271, 85.613], {
                hintContent: 'Усть-Кокса',
                balloonContent: '<div class="balloon"><h4>Усть-Кокса</h4><p>Отправная точка для многих наших туров</p></div>'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'images/map-marker.png', // Путь к кастомному маркеру (если есть)
                iconImageSize: [40, 40], // Размер иконки
                iconImageOffset: [-20, -40] // Смещение иконки
            });

            // Добавляем метку на карту
            map.geoObjects.add(placemark);

            // Улучшаем баллун
            map.balloon.open([50.271, 85.613], {
                contentHeader: 'Усть-Кокса',
                contentBody: '<p>Отправная точка для многих туров по Алтаю</p><p>Здесь начинаются наши маршруты в горы и к озерам</p>',
                contentFooter: '<a href="#tours" class="map-link">Посмотреть доступные туры</a>'
            }, {
                closeButton: true
            });

            // Закрываем баллун через 5 секунд
            setTimeout(() => {
                map.balloon.close();
            }, 5000);

            // Настраиваем внешний вид карты - применяем тему для природы/гор
            map.panes.get('ground').getElement().style.filter = 'saturate(1.5)';

            // Добавляем обработчик изменения размера окна
            window.addEventListener('resize', () => {
                if (map) {
                    map.container.fitToViewport();
                }
            });

            // Добавляем обработчик клика на ссылки внутри баллуна
            $(document).on('click', '.map-link', function(e) {
                e.preventDefault();
                const targetId = $(this).attr('href');
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
                map.balloon.close();
            });
        });
    };

    // Загружаем Яндекс Карты
    loadYandexMaps();
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(n) {
      // Убираем класс active у всех слайдов
      slides.forEach(slide => {
        slide.classList.remove('active');
      });

      // Добавляем класс active текущему слайду
      slides[n].classList.add('active');
      currentSlide = n;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Инициализация карусели
    showSlide(0);

    // Автоматическая смена слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);
});
