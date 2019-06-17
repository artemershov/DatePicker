import React from 'react';
import { Wrapper } from '../Styles';
import DateView from '../DateView';
import TimeView from '../TimeView';
import Control from './Control';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'date' };
    this.handleToggleBtn = this.handleToggleBtn.bind(this);
  }

  handleToggleBtn() {
    const { view } = this.state;
    this.setState({ view: view === 'date' ? 'time' : 'date' });
  }

  render() {
    const { view } = this.state;
    const { control, ...props } = this.props;
    const controlActions = { ...control, toggle: this.handleToggleBtn };
    return (
      <Wrapper>
        {view === 'date' ? <DateView {...props} /> : <TimeView {...props} />}
        <Control actions={controlActions} view={view} />
      </Wrapper>
    );
  }
}
