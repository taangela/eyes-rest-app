import React from 'react';
import { render } from 'react-dom';
//import AppDescription from './AppDescription.js';

class App extends React.Component {
  state = {
    status: 'off',
    time: 150,
    timer: null,
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60).toString();
    const seconds = Math.floor(time % 60).toString();

    return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
  };

  step = () => {
    this.setState(prevState => ({
      time: prevState.time - 1,
    }));

    if (this.state.time === 0) {
      this.playBell();
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: 'off',
      time: 0,
    });
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => {
    window.close();
  };

  render() {
    const { status, time, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' &&
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {status === 'work' && <img src="./images/work.png" />}
        {status === 'rest' && <img src="./images/rest.png" />}
        {status !== 'off' && <div className="timer">{this.formatTime(time)}</div>}
        {status === 'off' && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {status !== 'off' && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));