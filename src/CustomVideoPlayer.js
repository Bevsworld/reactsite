import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import styled from 'styled-components';

const VideoContainer = styled.div`
  width: 100%;
  .video-js {
    border-radius: 8px;
    margin-bottom: 10px;
  }
`;

const CustomVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
      });

      playerRef.current.src({ src, type: 'video/mp4' });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [src]);

  return (
    <VideoContainer>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div>
    </VideoContainer>
  );
};

export default CustomVideoPlayer;
