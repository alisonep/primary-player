import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: ${(props) => props.playedPercentage}%
`;

const FooterPlayer = (props) => (
  <footer>
    <div className="footer-controls">
      <button className="footer-controls__control footer-controls__previous disabled"></button>
      <button onClick={props.toggleSong} className={`footer-controls__control footer-controls__play ${props.isPlaying ? 'footer-controls__pause' : ''} `} />
      <button className="footer-controls__control footer-controls__next disabled"></button>
      <button className="footer-controls__control footer-controls__shuffle disabled"></button>
      <button className="footer-controls__control footer-controls__repeat disabled"></button>
      <div className="footer-controls__time-passed footer-controls__counter">
        {props.currentTime}
      </div>
      <div className="footer-controls__progress-bar-wrap">
        <div className="footer-controls__progress-bar-container">
          <Div className="footer-controls__progress-bar" playedPercentage={props.playedPercentage}/>
        </div>
      </div>
      <div className="footer-controls__duration footer-controls__counter">
        {props.duration}
      </div>
      <button className="footer-controls__control footer-controls__volume"></button>
      <div className="footer-controls__song-info-wrap">
        <div className="footer-controls__song-info-container">
          <div className="song-info__thumbnail"></div>
          <div className="song-info__details">
            <div className="song-info__author">{props.author}</div>
            <div className="song-info__track">{props.title}</div>
          </div>
        </div>
      </div>
      <div className="footer-controls__control footer-controls__like"></div>
      <div className="footer-controls__control footer-controls__queue">
        <svg width="24" height="24">
          <path fill="#333" className="playbackSoundBadge__queueIcon" d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path>
        </svg>
      </div>
    </div>
  </footer>
);

export default FooterPlayer;