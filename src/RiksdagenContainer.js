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
    margin-top: 50px;
    padding: 20px;
    background: rgba(245, 245, 245, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 85%;
    max-height: 500px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    position: relative;

    @media (max-width: 768px) {
        max-height: none;
        height: auto;
    }
`;

const ScrollableContent = styled.div`
    max-height: 400px;
    overflow-y: auto;
    padding-right: 15px;

    @media (max-width: 768px) {
        max-height: 500px;
        height: 500px;
        margin-bottom: 20px;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
    }
`;

const Grid = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    justify-content: center;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        margin: 0;
    }
`;

const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-wrap: break-word;
    width: 100%;
    max-width: 300px;
    margin: auto;
    position: relative;
    margin-top: 20px;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const VideoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const VideoTitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const VideoTitle = styled.h3`
    font-size: 1.2em;
    margin: 5px 0;
`;

const PartyLogo = styled.img`
    width: 17px;
    height: 17px;
    margin-left: 10px;
`;

const VideoMeta = styled.div`
    font-size: 0.9em;
    color: #666;
    margin: 20px;
`;

const VideoTypeBadge = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #007bff;
    color: rgb(255, 255, 255);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8em;
`;

const VideoDate = styled.div`
    position: absolute;
    top: -20px;
    right: 10px;
    font-size: 0.9em;
    color: #666;
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
    const containerRef = useRef(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        const filteredVideos = filterVideos(videos, filter);
        setVisibleVideos(filteredVideos.slice(0, 9)); // Show initial 9 filtered videos
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
            const validVideos = data.filter(item => item && item.linksforapi && item.linksforapi.length > 1);
            const videosWithMetadata = validVideos.flatMap(videoData =>
                videoData.linksforapi.slice(1).map(videoUrl => ({
                    id: `${videoData.id}_${videoUrl}`, // Assign a unique ID
                    ...videoData,
                    videoUrl,
                    ...extractNameAndParty(videoUrl)
                }))
            );
            setVideos(videosWithMetadata);
            setVisibleVideos(videosWithMetadata.slice(0, 9)); // Show initial 9 videos
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
            setLoading(false); // Stop the spinner in case of an error
        });
};
                setVideos(videosWithMetadata);
                setVisibleVideos(videosWithMetadata.slice(0, 9)); // Show initial 9 videos
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
                setLoading(false); // Stop the spinner in case of an error
            });
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setShowScrollButton(scrollTop > 200);

            // Check if we have reached the bottom
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
        event.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'fallback';
        fallback.innerText = 'Video failed to load';
        event.target.parentNode.appendChild(fallback);
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
        return { number: 'Unknown', name: 'Unknown', party: 'Unknown' };
    }
};
    const filterVideos = (videos, filter) => {
        return videos.filter(video =>
            filter.length === 0 || filter.includes(video.party)
        );
    };

    return (
        <Container>
            <ScrollableContent ref={containerRef} onScroll={handleScroll}>
                {loading ? (
                    <Spinner />
                ) : (
                    visibleVideos.length > 0 ? (
                        <Grid>
                            {visibleVideos.map((videoData) => (
                                <VideoContainer key={videoData.id}>
                                    <VideoTypeBadge>{videoData.type}</VideoTypeBadge>
                                    <VideoDate>{new Date(videoData.date).toLocaleDateString()}</VideoDate>
                                    <Video controls onError={handleVideoError}>
                                        <source src={videoData.videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </Video>
                                    <VideoMeta>
                                        <VideoTitle>
                                            {videoData.name} ({videoData.party})
                                            {videoData.party && <PartyLogo src={partyLogos[videoData.party]} alt={`${videoData.party} logo`} />}
                                        </VideoTitle>
                                        <div>{videoData.title}</div>
                                    </VideoMeta>
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
