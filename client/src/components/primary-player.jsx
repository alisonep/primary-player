import Genre from './genre.jsx';
import Wave from './wave.jsx';

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');
const moment = require('moment');

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
      // songUrl: 'http://localhost:3004/sample.mp3',
      users: [{
        _id: '5e3a3d19ced3f726582ce410', comment_id: 47, song_id: 21, user_id: 37, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/teddyzetterlund/128.jpg', message: 'Kentucky radical Handmade Granite Shoes PCI Central Steel Savings Account Total', audio_position: 101, __v: 0,
      }, {
        _id: '5e3a3d19ced3f726582ce45a', comment_id: 121, song_id: 21, user_id: 95, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/herrhaase/128.jpg', message: 'Director Soft transform', audio_position: 107, __v: 0,
      }, {
        _id: '5e3a3d19ced3f726582ce473', comment_id: 146, song_id: 21, user_id: 58, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/adityasutomo/128.jpg', message: 'Trafficway panel synergies workforce transmit tertiary Indian Rupee Illinois Euro system auxiliary Versatile Synchronised Small Internal Texas Rubber Shirt Bedfordshire reinvent Refined Metal Chips Wooden withdrawal optical', audio_position: 19, __v: 0,
      }, {
        _id: '5e3a3d19ced3f726582ce491', comment_id: 176, song_id: 21, user_id: 51, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/leandrovaranda/128.jpg', message: 'bandwidth Legacy connecting clear-thinking New York Shoals Fantastic Engineer e-business PCI open system EXE Berkshire Engineer Legacy invoice Unbranded Wooden Chair markets ADP architectures Markets virtual Bolivia Mountain encoding', audio_position: 115, __v: 0,
      }, {
        _id: '5e3a3d19ced3f726582ce4fc', comment_id: 283, song_id: 21, user_id: 100, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/chadami/128.jpg', message: 'intranet Paradigm Avon neural-net Planner SAS Analyst Jewelery magnetic e-markets Awesome Hills bypassing virtual Intelligent Plastic Bike ADP capacitor client-driven Granite', audio_position: 17, __v: 0,
      }, {
        _id: '5e3a3d19ced3f726582ce52f', comment_id: 334, song_id: 21, user_id: 43, user_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/aiiaiiaii/128.jpg', message: 'Antigua and Barbuda Cuban Peso Peso Convertible Checking Account solutions synergize Refined Vista Court Practical Benin District Global Iranian Rial alliance empowering initiative', audio_position: 30, __v: 0,
      }],
    };
  }

  componentDidMount() {

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
