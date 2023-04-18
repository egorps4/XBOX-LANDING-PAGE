const dropDownMenu = () => {
    //Проверка, открыт ли сайт на мобильном телефоне
    let isMobile = {
    	Android: function() {return navigator.userAgent.match(/Android/i);},
    	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
    };

    const header = document.querySelector('.header'),
          menu = document.querySelectorAll('.menu__dropdown'),
          subMenu = document.querySelectorAll('.sub-menu__list'),
          arrow = document.querySelectorAll('.arrow');

          if (isMobile.any()) {
            //Если открыто на мобильном устройстве
            document.body.classList.add('touch');

            header.addEventListener('click', (event) => {
                const target = event.target;

                if (target && target.parentNode.classList.contains('menu__dropdown')) {
                    event.preventDefault();

                    menu.forEach((menu, index) => {
                        if (target.parentNode === menu) {

                            if (subMenu[index].classList.contains('open')) {
                                hideSubMenu();
                            } else {
                                hideSubMenu();

                                subMenu[index].classList.add('open');
                                arrow[index].classList.add('open');
                                menu.style.color = 'white';
                            } 
                        }
                    });
                } else if (target && !(target.classList.contains('sub-menu__item'))){
                    //Если кликнули вне менюшек, закрываем их все
                    hideSubMenu();
                }
            });

        } else {
            //Если открыто на компьютере
            document.body.classList.add('mouse');
        };      
    
    function hideSubMenu() {
        subMenu.forEach((menu, index) => {
            menu.classList.remove('open');
            arrow[index].classList.remove('open');

            menu.parentNode.style.color = '';
        });
    }
};

export default dropDownMenu;