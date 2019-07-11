import React, { Component } from 'react';
import './App.css';

import AudioAnalyser from "./components/AudioAnalyser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMic = this.toggleMic.bind(this);
  }

  async getMic() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMic() {
    this.state.audio.getTracks().forEach(trk => trk.stop());
    this.setState({ audio: null });
  }

  toggleMic() {
    if (this.state.audio) {
      this.stopMic();
    } else {
      this.getMic();
    }
  }

  render() {
    return (
      <div className="App">
        <main>
          <div className="controls">
            <button onClick={this.toggleMic}>
              {this.state.audio ? "Stop Mic" : "Start Mic"}
            </button>
          </div>
          {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ""}
        </main>
      </div>
    );
  }
}

export default App;

