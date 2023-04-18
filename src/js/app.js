//Поддержка Webp
import * as flsFunction from "./modules/functions.js";
import dropDownMenu from "./modules/dropDownMenu.js";
import nav from "./modules/nav.js";
import slider from "./modules/slider.js";
import tabs from "./modules/tabs.js";
import carousel from "./modules/carousel.js";
import timer from "./modules/timer.js";

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    flsFunction.isWebp();
    dropDownMenu();
    nav('.menu__icon', '.menu__body');
    nav('.header__search-loupe', '.header__search-input', false);
    slider();
    tabs();
    carousel('.exclusive-swiper__row', '.exclusive-swiper__slide', '.button-nav', '.exclusive-swiper__button-prev', '.exclusive-swiper__button-next');
    timer('2023-05-16');
});



