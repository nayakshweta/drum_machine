import React from 'react';
import logo from './logo.svg';
import './App.css';

const DrumPad = ({drumKey, song, handleClick, url}) => {
  return (
    <button type="button" className="drum-pad" id={song} onClick={handleClick(drumKey, song)}> 
      {drumKey}
      <audio src={url} className="clip" id={drumKey}></audio>
    </button>
  );
};


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumpads: [
        {
          key: 'Q',
          song: "Heater-1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          key: 'W',
          song: "Heater-2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
         {
          key: 'E',
          song: "Heater-3",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          key: 'A',
          song: "Heater-4_1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          key: 'S',
          song: "Heater-6",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          key: 'D',
          song: "Dsc_Oh",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          key: 'Z',
          song: "Kick_n_Hat",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          key: 'X',
          song: "RP4_KICK_1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          key: 'C',
          song: "Cev_H2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
      ],
     song: ""
    };
    
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };
  
  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }
  
  handleButtonClick(key, song) {
    return () => {
      document.getElementById(key).play();
      this.setState({
        song: song
      });
    };
  }
  
  render() {
    return (
      <div id="drum-machine">
        <p id="display">{this.state.song}</p>
        <div id="display-pads">
          {this.state.drumpads.map(item => (
            <DrumPad
              song={item.song}
              key={item.key}
              drumKey={item.key}
              handleClick={this.handleButtonClick}
              url={item.url}
              />
          ))}
        </div>
      </div>
    );
  };
  
  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }
  
  handleKeyPress(event) {
    const pad = this.state.drumpads.find(item => item.key === event.key.toUpperCase());
    
    if(pad) {
      document.getElementById(pad.song).click();
    }
  }
}

export default DrumMachine;
