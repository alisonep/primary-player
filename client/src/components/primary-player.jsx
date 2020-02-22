import Genre from './genre.jsx';
import Wave from './wave.jsx';

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');
const moment = require('moment');

const localUrl = 'http://localhost:3004';
const prodUrl = 'http://ec2-52-41-170-203.us-west-2.compute.amazonaws.com:3004';
const API_URL = (window.location.host === 'localhost:3004') ? localUrl : prodUrl;

class PrimaryPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      author: 'Mrotek Music',
      title: 'Song Title - Here',
      uploadTime: '3 months ago',
      genre: 'Electronic',
      image: 'https://i1.sndcdn.com/artworks-000621689221-np6gn7-t500x500.jpg',
      songUrl: 'http://d1vgv8e3fkby3.cloudfront.net/song1.mp3',
      songId: (location.href.substring(location.href.lastIndexOf('/') + 1) || 1),
      // songUrl: 'http://localhost:3004/sample.mp3',
      users: [],
    };
  }

  componentDidMount() {
    axios.get('http://ec2-34-220-99-82.us-west-2.compute.amazonaws.com:8080/comment/88')
      .then((response) => {
        // handle success
        console.log('comments: ', response.data);
        const returnedComments = response.data;
        this.setState({
          users: returnedComments,
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

  getSong(loadSongCallback) {
    axios.get(`${API_URL}/songs/${this.state.songId}`)
      .then((response) => {
        // handle success
        console.log('cheese', response);
        const returnedSong = response.data;
        this.setState({
          author: returnedSong.author,
          title: returnedSong.title,
          uploadTime: returnedSong.createdAt,
          songUrl: returnedSong.audio_file_path,
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
        loadSongCallback();
      });
  }

  toggleSong() {
    const newSongStatus = !(this.state.isPlaying);
    this.setState({
      isPlaying: newSongStatus,
    });
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
        <Wave
          waveRef={this.state.waveRef}
          users={this.state.users}
          songUrl={this.state.songUrl}
          getSong={this.getSong.bind(this)}
          isPlaying={this.state.isPlaying}
        />
      </div>
    );
  }
}

export default PrimaryPlayer;
