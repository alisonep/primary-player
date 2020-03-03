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
      this.props.getSong( () => {
        this.state.wavesurfer.load(this.props.songUrl);
      });
    });
    wavesurfer.on('ready', () => {
      // console.log('song is ready');
      let duration = this.state.wavesurfer.backend.getDuration();
      this.setState({
        songLength: duration,
        waveWidth: this.waveRef.current.offsetWidth,
      });
      this.props.updateDuration(duration);
    });
    wavesurfer.on('audioprocess', (time) => {
      this.props.updatePlayedPercentage(time, this.state.wavesurfer.backend.getDuration());
      this.props.updateCurrentTime(time);
      // wavesurfer.params.container.style.opacity = 0.9;
    });
    wavesurfer.on('finish', () => {
      this.props.updatePlayedPercentage(0, this.state.wavesurfer.backend.getDuration());
      this.props.updateCurrentTime(0);
      this.props.toggleSong();
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
    // console.log(this.state.waveWidth, leftLocation, this.state.songLength);
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
