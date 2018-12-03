import React from 'react';
import Time from './Time';
import Hours from './Hours';
import Minutes from './Minutes';

export default class TimeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'time' };
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    const { date } = this.props;
    const { hours, minutes } = this.props.current;
    const actions = {
      ...this.props.actions,
      view: this.setView,
    };
    switch (this.state.view) {
      default:
      case 'time':
        return (
          <Time hours={hours} minutes={minutes} actions={actions} date={date} />
        );
      case 'hours':
        return <Hours current={hours} actions={actions} date={date} />;
      case 'minutes':
        return <Minutes current={minutes} actions={actions} date={date} />;
    }
  }
}
