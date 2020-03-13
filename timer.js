const deadLine = '2020-03-16';

function getTimeRemaining(endtime) {

	//Если дата меньше текущей, то выходим из функции
	if (Date.parse(endtime) < Date.parse(new Date()) ||
		isNaN(Date.parse(endtime))) return;

	// Рассчитываем кол-во милисекунд от текущей до конечной даты и преобразуем их в секунды, минуты и т.д.
	const t = Date.parse(endtime) - Date.parse(new Date()),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60),
		hours = Math.floor((t / 1000 / 60 / 60) % 24),
		days = Math.floor(t / (1000 * 60 * 60 * 24));

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function setClock(endtime) {

	const timer = document.querySelector('#timer'),
		days = timer.querySelector('.days'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		timeInterval = setInterval(updateClock, 1000);

	function updateClock() {
		//В переменную t получаем объект со значениями из первой функции
		const t = getTimeRemaining(endtime);

		t.days > 10 ?
			days.textContent = t.days : //Страховка на случай, если дней больше 100
			days.textContent = ('0' + t.days);
		// Если значение состоит из одной цифры, то добавляем ноль в начало
		hours.textContent = ('0' + t.hours).slice(-2);
		minutes.textContent = ('0' + t.minutes).slice(-2);
		seconds.textContent = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			// Останавливаем таймер, если время вышло
			clearInterval(timeInterval);
		}
	}

}

setClock(deadLine);
