const slider = () => {
    const slider = document.querySelector('.mainblock__slider'),
          slides = document.querySelectorAll('.mainblock__slider-item'),
          arrowNext = document.querySelector('.mainblock__button-right'),
          arrowPrev = document.querySelector('.mainblock__button-left'),
          tabs = document.querySelectorAll('.mainblock__tabs-item');

    slides.forEach((slide, index) => {
        //Скрываем все слайды кроме первого
        if (index != 0) slide.classList.add('hidden');

        slide.dataset.index = index;
        slides[0].setAttribute('data-active', '');
    });

    

    //Следующий слайд
    arrowNext.onclick = function() {
        showNextSLide('next');
    }

    //Предыдущий слайд
    arrowPrev.onclick = function() {
        showNextSLide('prev');
    }

    function showNextSLide(direction) {
        const currentSlide = slider.querySelector('[data-active]');
        const currentSlideIndex = +currentSlide.dataset.index;

        currentSlide.classList.add('hidden');
        currentSlide.removeAttribute('data-active');
        //Очищаем табы
        tabs[currentSlideIndex].classList.remove('active');

        let nextSlideIndex;

        if (direction === 'next') {
            //Проверка на последний слайд при передвижении вперед
            nextSlideIndex = (currentSlideIndex + 1 == slides.length) ? 0 : currentSlideIndex + 1;
        } else if (direction === 'prev') {
            //Проверка на последний слайд при передвижении назад
            nextSlideIndex = (currentSlideIndex == 0) ? slides.length - 1 : currentSlideIndex - 1;
        }

        const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
        
        nextSlide.classList.remove('hidden');
        nextSlide.setAttribute('data-active', '');
        //Назначаем активный таб
        tabs[nextSlideIndex].classList.add('active');
    }
}

export default slider;