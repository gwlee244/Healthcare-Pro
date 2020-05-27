export default function startOfWeek(date) {
	var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
	let week = [];
	for (let i = 0; i < 5; i++) {
		week.push(new Date(date.setDate(diff + i)));
	}
	return week;
}
