import React from 'react';

import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { data } from './data.js';

const currentDate = new Date();
console.log(currentDate);
const views = ['week', 'month'];
const realData = [];
function createData(appointment, day) {
  return {text: appointment, startDate: day, endDate: day}
}
class App extends React.Component {
  constructor(props) {
		super(props);
	}
  render() {
    return (
      <Scheduler
        dataSource={this.props.appointments}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={8} />
    );
  }
}

export default App;
