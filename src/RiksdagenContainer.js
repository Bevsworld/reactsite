import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import ScrollToTopButton from './ScrollToTopButton';

import sLogo from './s.png';
import sdLogo from './sd.png';
import kdLogo from './kd.png';
import lLogo from './l.png';
import mpLogo from './mp.png';
import vLogo from './v.png';
import cLogo from './c.png';
import mLogo from './moderat.png';

const Container = styled.div`
    margin-top: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
    width: 100%;
    max-width: 350px;
    text-align: center;
    max-height: 500px;
    position: relative;
    overflow: hidden;
    border: none;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const VideoPlayerContainer = styled.div`
    background: #000;
    padding: 0;
    border-radius: 8px 8px 0 0;
    width: 100%;
    position: relative;

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    display: block;
    margin: 0;
    padding: 0;
`;

const ScrollableContent = styled.div`
    max-height: 500px;
    overflow-y: auto;
    padding: 0 15px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        max-height: 400px;
        height: 400px;
        padding: 0 10px;
        margin-bottom: 10px;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const VideoContainer = styled.div`
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const VideoThumbnail = styled.div`
    width: 60px;
    height: 60px;
    background: #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
`;

const VideoInfo = styled.div`
    flex-grow: 1;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const VideoTitle = styled.h3`
    font-size: 1em;
    margin: 0;
    color: #000;
    cursor: pointer;
    flex-grow: 1;
`;

const PartyLogo = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
`;

const FallbackMessage = styled.div`
    width: 100%;
    height: 180px;
    border-radius: 8px;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 14px;
    margin-bottom: 10px;
`;

const partyLogos = {
    S: sLogo,
    SD: sdLogo,
    KD: kdLogo,
    L: lLogo,
    MP: mpLogo,
    V: vLogo,
    C: cLogo,
    M: mLogo,
};

const RiksdagenContainer = ({ filter }) => {
    const [videos, setVideos] = useState([]);
    const [visibleVideos, setVisibleVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        const filteredVideos = filterVideos(videos, filter);
        setVisibleVideos(filteredVideos.slice(0, 9));
        if (filteredVideos.length > 0) {
            setSelectedVideo(filteredVideos[0]);
        }
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [filter, videos]);

    const fetchVideos = () => {
        setLoading(true);
        fetch('https://apiserver-real.onrender.com/riksdagen')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const validVideos = data.filter(item => item && item.linksforapi && item.linksforapi.every(link => link !== null));
                const videosWithMetadata = validVideos.flatMap(videoData =>
                    videoData.linksforapi.map(videoUrl => ({
                        id: `${videoData.id}_${videoUrl}`,
                        ...videoData,
                        videoUrl,
                        ...extractNameAndParty(videoUrl)
                    }))
                );
                setVideos(videosWithMetadata);
                const initialVideos = filterVideos(videosWithMetadata, filter).slice(0, 9);
                setVisibleVideos(initialVideos);
                if (initialVideos.length > 0) {
                    setSelectedVideo(initialVideos[0]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
                setLoading(false);
            });
    };

    const filterVideos = (videos, filter) => {
        return videos.filter(video =>
            (filter.length === 0 || filter.includes(video.party)) &&
            video.number !== 'Unknown' && video.name !== 'Unknown' && video.party !== 'Unknown'
        );
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setShowScrollButton(scrollTop > 200);

            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMoreVideos();
            }
        }
    };

    const loadMoreVideos = () => {
        setVisibleVideos(prevVisible => {
            const filteredVideos = filterVideos(videos, filter);
            const currentIndex = prevVisible.length;
            const moreVideos = filteredVideos.slice(currentIndex, currentIndex + 9);
            return [...prevVisible, ...moreVideos];
        });
    };

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleVideoError = (event) => {
        console.error('Video error:', event);
        event.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'fallback';
        fallback.innerText = 'Video failed to load';
        event.target.parentNode.appendChild(fallback);
    };

    const handleVideoClick = (video) => {
        console.log('Video clicked:', video.videoUrl);
        setSelectedVideo(video);
    };

    const extractNameAndParty = (url) => {
        try {
            const decodedUrl = decodeURIComponent(url);
            const regex = /(\d+)_([^_]+(?:_[^_]+)*)_(\w+)\.mp4$/;
            const match = regex.exec(decodedUrl);
            if (match) {
                const number = match[1];
                const nameParts = match[2].split('_');
                const party = match[3];
                const name = nameParts.join(' ');
                return { number, name, party };
            }
            return { number: 'Unknown', name: 'Unknown', party: 'Unknown' };
        } catch (e) {
            console.error('Error decoding URL:', e);
            return { number: 'Unknown', name: 'Unknown', party: 'Unknown' };
        }
    };

    return (
        <Container>
            {selectedVideo && (
                <VideoPlayerContainer key={selectedVideo.id}>
                    <Video controls onError={handleVideoError} key={selectedVideo.videoUrl}>
                        <source src={selectedVideo.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </Video>
                </VideoPlayerContainer>
            )}
            <ScrollableContent ref={containerRef} onScroll={handleScroll}>
                {loading ? (
                    <Spinner />
                ) : (
                    visibleVideos.length > 0 ? (
                        <Grid>
                            {visibleVideos.map((videoData) => (
                                <VideoContainer key={videoData.id}>
                                    <VideoThumbnail onClick={() => handleVideoClick(videoData)}>
                                        <img src={partyLogos[videoData.party]} alt={`${videoData.party} logo`} />
                                    </VideoThumbnail>
                                    <VideoInfo>
                                        <VideoTitle onClick={() => handleVideoClick(videoData)}>
                                            {videoData.name}
                                        </VideoTitle>
                                        <PartyLogo src={partyLogos[videoData.party]} alt={`${videoData.party} logo`} />
                                    </VideoInfo>
                                </VideoContainer>
                            ))}
                        </Grid>
                    ) : (
                        <p>No videos available for the selected parties.</p>
                    )
                )}
            </ScrollableContent>
            <ScrollToTopButton visible={showScrollButton} onClick={scrollToTop} />
        </Container>
    );
};

export default RiksdagenContainer;
