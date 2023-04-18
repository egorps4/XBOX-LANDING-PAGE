const tabs = () => {
    const tabs = document.querySelector('.mainblock__tabs'),
          tabsItem = document.querySelectorAll('.mainblock__tabs-item'),
          slides = document.querySelectorAll('.mainblock__slider-item');

    tabs.addEventListener('click', (event) => {
        let target = event.target; 

        if (target && target.classList.contains('mainblock__tabs-item')) {
            tabsItem.forEach((tab, index) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    function hideTabContent() {
        tabsItem.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    function showTabContent(index) {
        tabsItem[index].classList.add('active');

        slides.forEach(slide => {
            slide.classList.add('hidden');
            slide.removeAttribute('data-active');
        });
        
        slides[index].classList.remove('hidden');
        slides[index].setAttribute('data-active', "");
    }
}

export default tabs;