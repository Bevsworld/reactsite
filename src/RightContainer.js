import React, { useEffect, useState, useRef } from 'react';
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    max-height: 500px; /* Set a maximum height for internal scrolling */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-left: 26px;
    text-align: center;
    position: relative;
    overflow-x: hidden;

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

const Post = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 5px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.04);
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(182, 179, 179, 0.58);
    position: relative;
    overflow-wrap: break-word;
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
`;

const Caption = styled.p`
    font-size: small;
    margin-top: 10px;
    word-wrap: break-word;
    overflow: hidden;
    width: 95%;
    align-self: center;
`;

const RightContainer = ({ filter }) => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false); // Declaration of state variable
    const containerRef = useRef(null);

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/igposts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setVisiblePosts(data.filter(post => post.type === 'Image').slice(0, 100));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    useEffect(() => {
        if (filter.length === 0) {
            setVisiblePosts(posts.filter(post => post.type === 'Image').slice(0, 100));
        } else {
            const filteredPosts = posts.filter(post => filter.includes(post.party) && post.type === 'Image');
            setVisiblePosts(filteredPosts.slice(0, 100));
        }
    }, [filter, posts]);

const handleScroll = () => {
    if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        setShowScrollButton(scrollTop > 200);

        // Check if we have reached the end of the container
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            // Only add more posts if they match the current filter
            if (filter.length > 0) {
                // Find the next set of posts that match the current party filter and haven't been displayed yet
                const moreFilteredPosts = posts
                    .filter(post => post.type === 'Image' && filter.includes(post.party))
                    .slice(visiblePosts.length, visiblePosts.length + 100);

                if (moreFilteredPosts.length > 0) {
                    setVisiblePosts(prev => [...prev, ...moreFilteredPosts]);
                }
            }
        }
    }
};

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
                <Spinner />
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
                            <PostImage
                                src={post.displayurl}
                                alt="Post image"
                                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                            />
                        )}
                        {post.caption && <Caption>{post.caption}</Caption>}
                    </Post>
                ))
            )}
            <ScrollToTopButton visible={showScrollButton} onClick={scrollToTop} />
        </Container>
    );
};

export default RightContainer;
