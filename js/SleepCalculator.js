var SleepCalculator = function () {
	this.sleptHours = 0;
	this.sleptMinutes = 0;
};

SleepCalculator.prototype.calculateSleep = function (data) {
	var msPerHour = 1000 * 60 * 60;
	var msPerMinute = 1000 * 60;

	var sleepDay = data.sleepDay;
	var sleepHour = data.sleepHour;
	var sleepMeridian = data.sleepMeridian;
	var sleepMinute = data.sleepMinute;

	var wakeHour = data.wakeHour;
	var wakeMeridian = data.wakeMeridian;
	var wakeMinute = data.wakeMinute;

	var sleepTime = new Date();
	var wakeTime = new Date();

	if (sleepDay === 'yesterday') {
		sleepTime.setDate(sleepTime.getDate() - 1);
	}

	sleepTime.setHours(sleepMeridian === 'AM' ? sleepHour : parseInt(sleepHour) + 12);
	sleepTime.setMinutes(sleepMinute);

	wakeTime.setHours(wakeMeridian === 'AM' ? wakeHour : parseInt(wakeHour) + 12);
	wakeTime.setMinutes(wakeMinute);

	this.sleptHours = Math.floor((wakeTime - sleepTime) / msPerHour);
	this.sleptMinutes = Math.round((wakeTime - sleepTime) / msPerMinute) % 60;
};

module.exports = SleepCalculator;
