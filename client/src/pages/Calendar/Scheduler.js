import React from 'react';
import Scheduler from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const currentDate = new Date();
const views = ['week', 'month'];
class App extends React.Component {
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
