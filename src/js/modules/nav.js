//Функция для показа бургер меню и поиска по клику
const nav = (triggerSelector, contentSelector, bodyLock = true) => {
    const body = document.querySelector('body'),
          trigger = document.querySelector(triggerSelector),
          content = document.querySelector(contentSelector);

    body.addEventListener('click', (e) => {
      const target = e.target;

      if (target && 
          (target.parentNode.classList.contains(triggerSelector.replace(/\./, "")) ||
          target.classList.contains(triggerSelector.replace(/\./, "")))) {
          showNav();
      }
    });

    function showNav() {
        //Проверка на необходиомсть залочить страницу
        if (bodyLock) {
            body.classList.toggle('lock');
        }
        
        trigger.classList.toggle('active');
        content.classList.toggle('active');
    } 
}

export default nav;