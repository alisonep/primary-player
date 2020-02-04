import WaveSurfer from '../js/wavesurfer.js';
import Genre from './genre.jsx';

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');
const moment = require('moment');

class PrimaryPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.waveRef = React.createRef();
    this.state = {
      wavesurfer: undefined,
      isPlaying: false,
      author: 'Mrotek Music',
      title: 'Song Title - Here',
      uploadTime: '3 months ago',
      genre: 'Electronic',
      image: 'https://i1.sndcdn.com/artworks-000621689221-np6gn7-t500x500.jpg',
      songUrl: 'http://d1vgv8e3fkby3.cloudfront.net/song1.mp3',
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
      this.state.wavesurfer.load(this.state.songUrl);
      this.getSong();
    });

    wavesurfer.on('ready', () => {
      console.log('song is ready');
      this.calculateLeftSocialIconPlacement(75, this.state.wavesurfer.backend.getDuration());
    });
  }

  getSong() {
    axios.get('http://localhost:3004/songs/2')
      .then((response) => {
        // handle success
        console.log(response);
        const returnedSong = response.data;
        this.setState({
          author: returnedSong.author,
          title: returnedSong.title,
          uploadTime: returnedSong.createdAt,
          genre: returnedSong.genre,
          image: returnedSong.artwork_url,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }

  toggleSong() {
    if (this.state.isPlaying) {
      this.state.wavesurfer.pause();
      this.setState({
        isPlaying: false,
      });
    } else {
      this.state.wavesurfer.play();
      this.setState({
        isPlaying: true,
      });
    }
  }

  calculateLeftSocialIconPlacement(secondMarker, songLength) {
    const waveWidth = this.waveRef.current.offsetWidth;
    console.log('wave width:', waveWidth);
    const leftLocation = (secondMarker * waveWidth) / songLength;
    console.log('left location', leftLocation);
  }

  render() {
    return (
      <div className="primary-player">
        <div className="box play-intro">
          <div className="play-intro__icon-box">
            <div className="play-intro__icon-wrapper">
              <div onClick={this.toggleSong.bind(this)} className={`play-intro__icon ${this.state.isPlaying ? 'play-intro__icon--pause' : ''} `} />
            </div>
          </div>
          <div className="play-intro__info">
            <div className="play-intro__author-box">
              <span className="play-intro__author">{this.state.author}</span>
            </div>
            <div className="play-intro__title-box">
              <span className="play-intro__title">{this.state.title}</span>
            </div>
          </div>
        </div>
        <div className="box info-box">
          <div className="info-box__uploadTime">
            {moment(this.state.uploadTime).fromNow()}
          </div>
          <Genre genre={this.state.genre} />
        </div>
        <div className="box artwork">
          <img src={this.state.image} alt="" />
        </div>
        <div className="box wave-box">
          <div ref={this.waveRef} id="waveform" />
          <div className="wave-box__social-bar">
            <img className="wave-box__social-bar-icon" src="https://i1.sndcdn.com/avatars-000704733139-grssn1-t50x50.jpg" />
          </div>
        </div>
      </div>

    );
  }
}

export default PrimaryPlayer;
