import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: rgba(245, 245, 245, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.23);
    width: 350px;
    max-height: 500px; /* Set a maximum height for internal scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-left: 26px;
    text-align: center;
    position: relative;
    overflow-x: hidden;
    margin-right: 40px;
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;


    @media (max-width: 768px) {
        width: 85%;
        margin-left: 0;
        height: auto;
        margin-bottom: 20px;

        /* Hide scrollbar for Webkit browsers */
        &::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for Firefox */
        scrollbar-width: none;
    }
`;

const Video = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 20px;
    background: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(173, 170, 170, 0.58);
    width: 100%;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    border-radius: 8px;
    
`;

const VideoFrame = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
`;

const VideoContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
`;

const Title = styled.span`
    font-weight: bolder;
    font-size: 14px;
    text-align: center;
    margin-bottom: 5px;
    padding-bottom: 20px;
    padding-top: 15px;
    width: 90%;
`;

const Timestamp = styled.span`
    font-size: 0.8em;
    color: gray;
    text-align: center;
`;

const YoutubeVids = () => {
    const [videos, setVideos] = useState([]);
    const [visibleVideos, setVisibleVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const containerRef = useRef(null);

    const loadMoreVideos = useCallback(() => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleVideos(prev => [
                ...prev,
                ...videos.slice(prev.length, prev.length + 15)
            ]);
            setLoadingMore(false);
        }, 500); // Simulate loading delay
    }, [videos]);

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/ytvids')
            .then(response => response.json())
            .then(data => {
                setVideos(data);
                setVisibleVideos(data.slice(0, 15));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !loadingMore) {
                loadMoreVideos();
            }
        }
    };

    return (
        <Container ref={containerRef} onScroll={handleScroll}>
            {loading ? (
                <Spinner />
            ) : (
                visibleVideos.map((video, index) => {
                    const videoId = new URL(video.link).searchParams.get("v");
                    return (
                        <Video key={index}>
                            <VideoWrapper>
                                <VideoFrame
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </VideoWrapper>
                            <VideoContent>
                                <Title>{video.title}</Title>
                                <Timestamp>{new Date(video.timestamp).toLocaleString()}</Timestamp>
                            </VideoContent>
                        </Video>
                    );
                })
            )}
            {loadingMore && <Spinner />}
        </Container>
    );
};

export default YoutubeVids;
