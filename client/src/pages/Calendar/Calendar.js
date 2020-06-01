import React, { Component } from 'react';
import { connect } from "react-redux";
import { appointmentAdd } from "../../actions/calendarAction";

const DAYS_OF_WEEK = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

/* Helpers */
const padLeft = (number, padding) =>
	padding.substring(number.toString().length) + number;
const toTimeString = (hours, minutes) =>
	`${padLeft(hours, "00")}:${padLeft(minutes, "00")}`;
const startOfWeek = date => {
	const clone = new Date(date);
	const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	clone.setDate(diff);
	return clone;
};
const addDays = (date, days) => {
	const clone = new Date(date);
	clone.setDate(clone.getDate() + days);
	return clone;
};
class Calendar extends Component {
	constructor(props) {
		super(props);
		this.normalizeTimeBlocks(this.props.appointments);
	}
	normalizeTimeBlocks = appointments => {
		const blockSize = 15;
		const timeBlocks = {};
		const eventBlocks = {};
		for (let day in appointments) {
			appointments[day].forEach(appointment => {
				const startTime = appointment.time_start;
				const endTime = appointment.time_end;
				let blockSpan = 0;
				if (startTime === "00:00" && endTime === "00:00") {
					blockSpan = Math.ceil((24 * 60) / blockSize);
				} else {
					const startSplit = startTime.split(":");
					let hour = parseInt(startSplit[0]);
					let minutes = parseInt(startSplit[1]);
					let timeString = appointment.startTime;
					while (timeString !== appointment.time_end) {
						blockSpan++;
						minutes += blockSize;
						if (minutes >= 60) {
							minutes = 0;
							hour += 1;
						}
						timeString = toTimeString(hour, minutes);
					}
				}
				eventBlocks[startTime] = eventBlocks[startTime] || {};
				eventBlocks[startTime][day] = Object.assign({}, appointment, {
					blockSpan
				});
			});
		}
		for (let hour = 7; hour < 19; hour++) {
			for (let minutes = 0; minutes < 60; minutes += blockSize) {
				const timeString = toTimeString(hour, minutes);
				timeBlocks[timeString] = eventBlocks[timeString] || {};
			}
		}
		this.timeBlocks = timeBlocks;
	};
	render() {
		const rows = [];
		for (let time in this.timeBlocks) {
			const block = this.timeBlocks[time];
			rows.push(
				<Row key={time}>
					<TimeCell className="calendar__cell--time-col">
						{time}
					</TimeCell>
					<AppointmentCell className="calendar__cell--time-spacing" />
					<AppointmentCell
						appointment={block.monday}
						day="monday"
						time={time}
					/>
					<AppointmentCell
						appointment={block.tuesday}
						day="tuesday"
						time={time}
					/>
					<AppointmentCell
						appointment={block.wednesday}
						day="wednesday"
						time={time}
					/>
					<AppointmentCell
						appointment={block.thursday}
						day="thursday"
						time={time}
					/>
					<AppointmentCell
						appointment={block.friday}
						day="friday"
						time={time}
					/>
				</Row>
			);
		}
		const monday = startOfWeek(new Date());
		return (
			<div className="calendar">
				<Row>
					<HeaderCell className="calendar__cell--time-col" />
					<Cell className="calendar__cell--time-spacing" />
					<HeaderCell day={monday} />
					<HeaderCell day={addDays(monday, 1)} />
					<HeaderCell day={addDays(monday, 2)} />
					<HeaderCell day={addDays(monday, 3)} />
					<HeaderCell day={addDays(monday, 4)} />
				</Row>
				<div className="calendar__body">
					{rows}
					<Row className="calendar__row--deco-last-row">
						<TimeCell className="calendar__cell--time-col">
							00:00
						</TimeCell>
						<AppointmentCell />
					</Row>
				</div>
			</div>
		);
	}
}
const Appointment = props => {
	const { appointment } = props;
	const wholeDay =
		appointment.time_start === "00:00" && appointment.time_end === "00:00";
	const time = wholeDay
		? "Todo el día"
		: `${appointment.time_start} - ${appointment.time_end}`;
	return (
		<div
			{...props}
			className={`calendar__appointment ${
				appointment.name === "Not working" ? "weekend" : ""
			}`}>
			<div className="calendar__appointment__time">{time}</div>
			<div className="calendar__appointment__name">
				{appointment.name}
			</div>
		</div>
	);
};
const Row = props => (
	<div {...props} className={`calendar__row ${props.className}`} />
);
const Cell = props => (
	<div {...props} className={`calendar__cell ${props.className}`} />
);
const HeaderCell = props => {
	const { day } = props;
	const isToday = day && day.toDateString() === new Date().toDateString();
	return (
		<Cell
			{...props}
			className={`calendar__cell--day-of-week  ${props.className} ${{
				"calendar__cell--day-of-week--today": isToday
			}}`}>
			{day && (
				<div className="calendar__cell--day-of-week__day">
					{DAYS_OF_WEEK[day.getDay()]}
				</div>
			)}
			{day && (
				<div className="calendar__cell--day-of-week__date">
					{day.getDate()}
				</div>
			)}
		</Cell>
	);
};
const TimeCell = props => (
	<Cell {...props} className={`calendar__cell--time ${props.className}`} />
);
const AppointmentCell = props => {
	const { appointment } = props;
	let appointmentComponent = null;
	if (appointment) {
		const { blockSpan } = appointment;
		const height = 100 * blockSpan + "%";
		const borderPixels = blockSpan + 1 + "px";
		const cssHeight = "calc(" + height + " + " + borderPixels + ")";
		appointmentComponent = (
			<Appointment
				style={{ height: cssHeight }}
				appointment={appointment}
			/>
		);
	}
	return (
		<Cell
			{...props}
			className={`calendar__cell--appointment ${props.className}`}>
			{appointmentComponent}
		</Cell>
	);
};
const mapStateToProps = state => ({auth: state.auth, calendar: state.appointments})

export default connect(mapStateToProps, {appointmentAdd}) (Calendar);