export default function getEndTime(time) {
	let hours = time.match(/\d+/g)[0];
	let mins = time.match(/\d+/g)[1];
	if (parseInt(mins) + 15 === 60) {
		++hours;
		if (hours.toString().length === 1) {
			return `0${hours}:00`;
		} else {
			return `${hours}:00`;
		}
	} else {
		return `${hours}:${parseInt(mins) + 15}`;
	}
}
