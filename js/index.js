var sleepHour = document.querySelector('select[name="sleepHour"]');
var sleepMinute = document.querySelector('select[name="sleepMinute"]');
var wakeHour = document.querySelector('select[name="wakeHour"]');
var wakeMinute = document.querySelector('select[name="wakeMinute"]');

var populateTimeSelects = function () {
	var clone = null;
	var fragment = document.createDocumentFragment();
	var index = null;
	var option = null;
	var optionText = null;

	for (index = 1; index <= 12; index++) {
		option = document.createElement('option');
		option.value = index;
		option.textContent = index;
		fragment.appendChild(option);
	}

	clone = fragment.cloneNode(true);
	sleepHour.appendChild(fragment);
	wakeHour.appendChild(clone);

	for (index = 0; index <= 59; index++) {
		option = document.createElement('option');
		optionText = index < 10 ? '0' + index : index;
		option.value = optionText;
		option.textContent = optionText;
		fragment.appendChild(option);
	}

	clone = fragment.cloneNode(true);
	sleepMinute.appendChild(fragment);
	wakeMinute.appendChild(clone);
};

populateTimeSelects();
