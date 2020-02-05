import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  left: ${(props) => props.commentPosition}px;
`;

const Span = styled.span`
  left: ${(props) => props.commentPosition}px;
`;

const Social = (props) => (
  <div>
    <Img
      commentPosition={props.commentPosition}
      className="wave-box__social-bar-icon"
      src={props.user.user_icon}
    />
    <Span commentPosition={props.commentPosition} className="userDetails">
      {props.user.message.split(' ').splice(0, 5).join(' ')}
      ...
    </Span>
  </div>
);

export default Social;
