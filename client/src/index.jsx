const React = require('react');
const ReactDom = require('react-dom');
import WaveSurfer from './wavesurfer.js';

class PrimaryPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wavesurfer: undefined,
      isPlaying: false,
      author: 'Mrotek Music',
      title: 'Song Title - Here',
      uploadTime: '3 months ago',
      genre: 'Electronic',
      image: 'https://i1.sndcdn.com/artworks-000621689221-np6gn7-t500x500.jpg',
    };
  }
  componentDidMount(){
    let wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#FFFFFF',
      progressColor: '#FF4300',
      barWidth: 2,
      barGap: 0,
      cursorColor: '#ffffff',
      cursorWidth: 0,
      height: 100,
    });
    this.setState({wavesurfer: wavesurfer}, function(){
      this.state.wavesurfer.load('sample.mp3');
    });
  }
  toggleSong() {
    if ( this.state.isPlaying ) {
      this.state.wavesurfer.pause();
      this.setState({
        isPlaying: false
      });
    } else {
      this.state.wavesurfer.play();
      this.setState({
        isPlaying: true
      });
    }
  }

  render() {
    return (
      <div className="primary-player">
        <div className="box play-intro">
          <div className="play-intro__icon-box">
            <div className="play-intro__icon-wrapper">
                <div onClick={this.toggleSong.bind(this)} className={`play-intro__icon ${this.state.isPlaying ? 'play-intro__icon--pause' : ''} `} ></div>
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
              3 months ago
            </div>
            <div className="info-box__genre">
              <span className="hashTag">#</span> {this.state.genre}
            </div>
        </div>
        <div className="box artwork">
            <img src={this.state.image} alt=""/>
        </div>
        <div className="box wave-box">
          <div id="waveform"></div>
        </div>
      </div>

    )
  }
}

ReactDom.render(<PrimaryPlayer />, document.getElementById('primary-player'));
