(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var timeSelectPopulator = require('./TimeSelectPopulator.js');
timeSelectPopulator();

},{"./TimeSelectPopulator.js":1}]},{},[2]);
