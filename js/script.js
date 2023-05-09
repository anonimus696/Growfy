"use strict"

// ================Burger=======================

document.addEventListener("click", documentClick);

function documentClick(e) {
    const targetItem = e.target;
    if (targetItem.closest('.icon-menu')) {
        document.documentElement.classList.toggle("menu-open");
    }
}

// ================Burger=======================

// !================SctollSmooth=======================
$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        document.documentElement.classList.remove("menu-open"); //закриває бургер при настиканні на пункт меню
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});
// !================SctollSmooth=======================

// ================SLIDER=======================
$(document).ready(function () {
    $('.clients__items').slick({
        arrows: false,
        slidesToShow: 4,
        speed: 2000,
        fade: false,
        easing: 'ease 3s',
        Infinite: true,
        autoplay: true,
        autoplaySpeed: 500,
        draggable: true,
        swipe: true,
        touchThreshold: 10,
        waitToAnimate: false,
        centerMode: true,
        variableWidth: true,
    });
});

// ================SLIDER=======================

// ?================Rating=======================
const ratings = document.querySelectorAll('.rate')

if (ratings.length > 0) {
    initRatings();
}

function initRatings() {
    let ratingActive, ratingValue;
    // перебираємо всі рейтинги на сторінці
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
    // ініціалізуємо конкретний рейтинг
    function initRating(rating) {
        initRatinVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating__set')) {
            setRating(rating);
        }
    }
    // ініціалізуємо змінні
    function initRatinVars(rating) {
        ratingActive = rating.querySelector('.rate__active')
        ratingValue = rating.querySelector('.rate__value')
    }
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Можливість вказувати рейтинг
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rate__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatinVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener('mouseleave', function (e) {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener('click', function (e) {
                initRatinVars(rating);
                if (rating.dataset.ajax) {
                    setRatingValue(ratingItem.value, rating);
                }
                else {
                    ratingValue.innerHTML = `${index + 1}.0`;
                    setRatingActiveWidth();
                }
            });
        }
    }
}
// ?================Rating=======================

// ================Counter=======================
window.addEventListener("load", windowLoad);

function windowLoad() {
    // Функція ініціалізації
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters.length) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }
    // Функція анімації яка розрізняє цілі і дробові числа
    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1500;
        const startValue = parseFloat(digitsCounter.innerHTML);
        const isInteger = Number.isInteger(startValue);
        const startPosition = isInteger ? 0 : startValue % 1;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = isInteger
                ? Math.floor(progress * startValue)
                : parseFloat((progress * startValue).toFixed(1));
            digitsCounter.innerHTML = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    // Пуск при завантаженні сторінки
    // digitsCountersInit();


    // Пуск при скроллі (появі блока з лічільниками)
    let options = {
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                // Вимкнути відслідковування після спрацювання
                // observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('.page__advantages');
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}
// ================Counter=======================


// !==========================DropDown==================================
// Знаходимо div та меню
const dropdownToggle = document.querySelector('.parent');
const dropdownMenu = document.querySelector('.menu__item-add');

// Додаємо обробники подій на div
dropdownToggle.addEventListener('click', function (e) {
    // Перевіряємо стан меню та змінюємо його
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
    } else {
        dropdownMenu.classList.add('show');
    }
});

// Додаємо обробник події на торкання для тачскрінів
dropdownToggle.addEventListener('touchstart', function (e) {
    e.preventDefault();
    // Перевіряємо стан меню та змінюємо його
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
    } else {
        dropdownMenu.classList.add('show');
    }
});

// Додаємо обробники подій на div
dropdownToggle.addEventListener('mouseover', function (e) {
    dropdownMenu.classList.add('show');
});

dropdownToggle.addEventListener('mouseout', function (e) {
    dropdownMenu.classList.remove('show');
});

// Додаємо обробник події на клік за межі меню, щоб закрити його
document.addEventListener('click', function (e) {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});
// !==========================DropDown==================================

// !================Input check=======================
var inputFields = document.getElementsByTagName('input');

for (var i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener('input', function () {
        // Перевіряємо, чи є текст у полі введення
        if (this.value !== '') {
            // Додаємо клас "valid" до батьківського елемента
            this.parentElement.classList.add('valid');
        } else {
            // Видаляємо клас "valid" з батьківського елемента
            this.parentElement.classList.remove('valid');
        }
    });
}

// Викликаємо функцію для додавання класу до всіх тегів input
// addValidClassToInputs();
// !================Input check=======================