const timer = (deadline) => {

    function addZero(number) {
        if (number <= 9) {
            return `0${number}`;
        } else {
            return number;
        }
    };

    function getTime() {
        const time = Date.parse(deadline) - Date.parse(new Date()),
              seconds = Math.floor((time / 1000) % 60),
              minutes = Math.floor((time / (1000 * 60)) % 60),
              hours = Math.floor((time / (1000 * 60 * 60)) % 24),
              days = Math.floor(time / (1000 * 60 * 60 * 24));

        return {
            'total': time,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };  
    };

    function setTime() {
        const days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const timeValue = getTime();

            days.textContent = addZero(timeValue.days);
            hours.textContent = addZero(timeValue.hours);
            minutes.textContent = addZero(timeValue.minutes);
            seconds.textContent = addZero(timeValue.seconds);

            if (timeValue.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval);
            }
        }
    };

    setTime();
};

export default timer;