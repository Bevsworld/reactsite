import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import instagramLogo from './instagram-img.png';
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
    padding: 20px;
    background: rgba(245, 245, 245, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
    width: 100%;
    max-width: 400px;
    max-height: 550px;
    overflow-y: auto;
    margin: 0 auto;
    text-align: center;
    position: relative;
    overflow-x: hidden;
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;
    margin-left: 10px;

    @media (max-width: 768px) {
        width: auto;
        max-width: 400px;
        max-height: 800px;
        height: auto;
        margin-bottom: 20px;

        &::-webkit-scrollbar {
            display: none;
        }

        scrollbar-width: none;
    }
`;

const Post = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.04);
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(182, 179, 179, 0.58);
    position: relative;
    overflow-wrap: break-word;
    gap: 15px;
    width: 100%;
`;

const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-top: 5px;
    margin-right: 12px;
    margin-left: 12px;
`;

const PartyLogo = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: 5px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
`;

const UsernameTimestampWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 50px);
`;

const UsernameWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Username = styled.span`
    font-weight: normal;
    font-size: 13px;
    white-space: nowrap;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Timestamp = styled.span`
    font-size: 0.6em;
    color: gray;
`;

const PostImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
    display: ${props => (props.error ? 'none' : 'block')};
`;

const Caption = styled.p`
    font-size: small;
    margin-top: 10px;
    word-wrap: break-word;
    overflow: hidden;
    width: 95%;
    align-self: center;
`;

const SkeletonPost = styled.div`
    height: 100px;
    background: #e0e0e0;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const RightContainer = ({ filter }) => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const containerRef = useRef(null);

    const BATCH_SIZE = 10;

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/igposts')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(post => post.type !== 'Reels');
                setPosts(filteredData);
                setVisiblePosts(filteredData.slice(0, BATCH_SIZE));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const updateVisiblePosts = useCallback(() => {
        if (filter.length === 0) {
            setVisiblePosts(posts.slice(0, BATCH_SIZE));
        } else {
            const filteredPosts = posts.filter(post => filter.includes(post.party));
            setVisiblePosts(filteredPosts.slice(0, BATCH_SIZE));
        }
    }, [filter, posts]);

    useEffect(() => {
        updateVisiblePosts();
    }, [updateVisiblePosts]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [filter]);

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setShowScrollButton(scrollTop > 200);

            if (scrollTop + clientHeight >= scrollHeight - 10) {
                if (visiblePosts.length < posts.length) {
                    const morePosts = posts.slice(visiblePosts.length, visiblePosts.length + BATCH_SIZE);
                    setVisiblePosts(prev => [...prev, ...morePosts]);
                }
            }
        }
    }, [posts, visiblePosts]);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPartyLogo = (party) => {
        switch (party) {
            case 'S':
                return sLogo;
            case 'SD':
                return sdLogo;
            case 'KD':
                return kdLogo;
            case 'L':
                return lLogo;
            case 'MP':
                return mpLogo;
            case 'V':
                return vLogo;
            case 'C':
                return cLogo;
            case 'M':
                return mLogo;
            default:
                return null;
        }
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <Container ref={containerRef} onScroll={handleScroll}>
            {loading ? (
                Array.from({ length: BATCH_SIZE }).map((_, index) => (
                    <SkeletonPost key={index} />
                ))
            ) : (
                visiblePosts.map((post, index) => (
                    <Post key={index}>
                        <PostHeader>
                            <ProfilePicture src={instagramLogo} alt="Instagram logo" />
                            <UsernameTimestampWrapper>
                                <UsernameWrapper>
                                    <Username>@{post.ownerusername}</Username>
                                    {post.party && <PartyLogo src={getPartyLogo(post.party)} alt={`${post.party} logo`} />}
                                </UsernameWrapper>
                                <Timestamp>{new Date(post.timestamp).toLocaleString()}</Timestamp>
                            </UsernameTimestampWrapper>
                        </PostHeader>
                        {isValidUrl(post.displayurl) && (
                            <>
                                {console.log('Image URL:', post.displayurl)}
                                <RetryableImage src={post.displayurl} alt="Post image" />
                            </>
                        )}
                        {post.caption && <Caption>{post.caption}</Caption>}
                    </Post>
                ))
            )}
            <ScrollToTopButton visible={showScrollButton} onClick={scrollToTop} />
        </Container>
    );
};

const RetryableImage = ({ src, alt }) => {
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const handleError = (e) => {
        console.error('Error loading image:', src);
        if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
            e.target.src = `${src}?retry=${retryCount + 1}`;
        } else {
            e.target.style.display = 'none';
        }
    };

    return <PostImage src={src} alt={alt} onError={handleError} />;
};

export default RightContainer;
