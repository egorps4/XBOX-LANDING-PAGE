const carousel = (sliderSelector, slidesSelector, NavigationBtnSelector, prevNavigationSelector, nextNavigationSelector) => {
    const slider = document.querySelector(sliderSelector),
          slides = document.querySelectorAll(slidesSelector),
          NavigationBtn = document.querySelectorAll(NavigationBtnSelector),
          prevNavigationBtn = document.querySelector(prevNavigationSelector),
          nextNavigationBtn = document.querySelector(nextNavigationSelector);
          
    let slideWidth = slides[0].offsetWidth,
        sliderWidth = slider.offsetWidth,
        slideIndex = 0,
        positionX1 = 0, 
        positionX2 = 0,
        positionInit = 0,
        //Регулярное выражение для поиска значения X в transform(translate3d(x, y, z))
        trfRegExp = /[-0-9.]+(?=px)/;

    slider.style.transform = 'translate3d(0px, 0px, 0px)';

    slides[0].classList.add('active');

    slides.forEach((slide, index) => {
        slide.dataset.index = index;
    });

    function displayPrevNavigationBtn() {
        //Скрывать навигацию на первом слайде
        if (slideIndex > 0) {
            prevNavigationBtn.style.display = 'block';
        } else {
            prevNavigationBtn.style.display = 'none';
        };
    };

    function displayNextNavigationBtn() {
        //Скрывать навигацию на последнем слайде
        if (slideIndex < slides.length - 1) {
            nextNavigationBtn.style.display = 'block';
        } else {
            nextNavigationBtn.style.display = 'none';
        };
    };

    function nextSlide() {
        slideWidth = slides[0].offsetWidth;
        sliderWidth = slider.offsetWidth;

        if (slideIndex >= slides.length - 1) {
            slideIndex = slides.length - 1;
        };

        /*Значение смещения сладера.
        Вычитается значение, позволяющее активному слайду всегда находиться посередине слайдера*/ 
        let sliderMoveDiapason = (slideWidth * slideIndex) - ((sliderWidth - slideWidth) / 2);

        if (sliderMoveDiapason < 0) {
            sliderMoveDiapason = 0;
        };

        slider.style.transform = `translate3d(${-sliderMoveDiapason}px, 0px, 0px)`;

        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[slideIndex].classList.add('active');

        displayPrevNavigationBtn();
        displayNextNavigationBtn();
    };

    NavigationBtn.forEach((button) => {
        button.addEventListener('click', (event) => {
            let target = event.target;
            
            if (target.parentNode.classList.contains(nextNavigationSelector.replace(/\./, ''))) {
                slideIndex++;
            } else if (target.parentNode.classList.contains(prevNavigationSelector.replace(/\./, ''))) {
                slideIndex--;
            };

            nextSlide();
        });
    });

    slider.addEventListener('click', (event) => {
        const target = event.target;

        if (target 
            && target.closest(slidesSelector) 
            && target.closest(slidesSelector).classList.contains(slidesSelector.replace(/\./, ''))) {
            slideIndex = target.closest(slidesSelector).getAttribute('data-index');
            nextSlide();
        };
    });

    function swipeStart() {   
        const evt = event.touches[0];

        positionInit = positionX1 = evt.clientX;

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
    };

    function swipeAction() { 
        const evt = event.touches[0],
              transform = +slider.style.transform.match(trfRegExp)[0];  
              
        positionX2 = positionX1 - evt.clientX;
        positionX1 = evt.clientX;
        //Умножение смещения на 3 делает свайп отзывчивее
        positionX2 *= 3;

        if (transform > 0) {
            document.removeEventListener('touchmove', swipeAction);
        };
        
        if (transform < -(slideWidth * (slides.length - 1))) {
            document.removeEventListener('touchmove', swipeAction);
        };
        
        slider.style.transform = `translate3d(${transform - positionX2}px, 0px, 0px)`;
    };

    function swipeEnd() {
        const transform = +slider.style.transform.match(trfRegExp)[0]; 

        //Получение номера слайда по текущему значению смещения слайдера.
        if (positionInit > positionX1) {
            // Округление в большую сторону для отзывчивого перемещения при свайпе влево
            slideIndex = Math.ceil(Math.abs(transform / slideWidth));
        } else if (positionInit < positionX1) {
            // Округление в меньшую сторону для отзывчивого перемещения при свайпе вправо
            slideIndex = Math.floor(Math.abs(transform / slideWidth));
        }
        
        nextSlide();
        
        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('touchend', swipeEnd); 
    };

    slider.addEventListener('touchstart', swipeStart);

    //Для корректного выравнивания слайдов при смене ширины экрана
    window.addEventListener('resize', nextSlide);
};

export default carousel;