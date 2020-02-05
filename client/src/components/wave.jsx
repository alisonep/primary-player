import React from 'react';
import WaveSurfer from '../js/wavesurfer.js';
import Social from './social.jsx';

class Wave extends React.Component {
  constructor(props) {
    super(props);
    this.waveRef = React.createRef();
    this.state = {
      wavesurfer: undefined,
      songLength: 0,
      waveWidth: 0,
    };
  }

  componentDidMount() {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#FFFFFF',
      progressColor: '#FF4300',
      barWidth: 2,
      barGap: 0,
      cursorColor: '#ffffff',
      cursorWidth: 0,
      height: 100,
    });
    this.setState({ wavesurfer }, function () {
      this.state.wavesurfer.load(this.props.songUrl);
      this.props.getSong();
    });
    wavesurfer.on('ready', () => {
      console.log('song is ready');
      this.setState({
        songLength: this.state.wavesurfer.backend.getDuration(),
        waveWidth: this.waveRef.current.offsetWidth,
      });
    });
  }

  componentDidUpdate() {
    if (!this.props.isPlaying) {
      this.state.wavesurfer.pause();
    } else {
      this.state.wavesurfer.play();
    }
  }

  calculateLeftSocialIconPlacement(secondMarker, songLength) {
    const leftLocation = (secondMarker * this.state.waveWidth) / this.state.songLength;
    console.log(this.state.waveWidth, leftLocation, this.state.songLength);
    return leftLocation;
  }

  render() {
    return (
      <div className="box wave-box">
        <div ref={this.waveRef} id="waveform" />
        <div className="wave-box__social-bar">
          { this.props.users.map((user, i) => (
            <Social
              user={user}
              key={i}
              commentPosition={this.calculateLeftSocialIconPlacement(user.audio_position, this.state.songLength)}
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Wave;
