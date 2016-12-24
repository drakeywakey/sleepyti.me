module.exports = function () {
	var clone = null;
	var fragment = document.createDocumentFragment();
	var index = null;
	var option = null;
	var optionText = null;

	for (index = 1; index <= 12; index++) {
		option = document.createElement('option');
		option.value = index;
		option.textContent = index;

		if (index === 10) {
			option.setAttribute('selected', 'selected');
		}

		fragment.appendChild(option);
	}

	clone = fragment.cloneNode(true);
	document.querySelector('select[name="sleepHour"]').appendChild(fragment);
	document.querySelector('select[name="wakeHour"]').appendChild(clone);

	for (index = 0; index <= 59; index++) {
		option = document.createElement('option');
		optionText = index < 10 ? '0' + index : index;
		option.value = optionText;
		option.textContent = optionText;
		fragment.appendChild(option);
	}

	clone = fragment.cloneNode(true);
	document.querySelector('select[name="sleepMinute"]').appendChild(fragment);
	document.querySelector('select[name="wakeMinute"]').appendChild(clone);
};
