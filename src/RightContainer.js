import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import instagramLogo from './instagram-img.png'; // Import the Instagram logo

const Container = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 500px;
    overflow-y: scroll; /* Enable vertical scrolling */
    margin-left: 20px;
    text-align: left;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        height: auto;
        margin-bottom: 20px;
    }
`;

const Post = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* To position the profile picture */
    overflow-wrap: break-word; /* Ensure long text breaks appropriately */
`;

const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const UsernameTimestampWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Username = styled.span`
    font-weight: bold;
`;

const Timestamp = styled.span`
    font-size: 0.8em;
    color: gray;
`;

const PostImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const PostVideo = styled.video`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const Caption = styled.p`
    margin-top: 10px;
    word-wrap: break-word; /* Ensure long text breaks appropriately */
    overflow: hidden; /* Hide any overflow text */
`;

const RightContainer = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/igposts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setVisiblePosts(data.slice(0, 10)); // Initially display 10 posts
                setLoading(false);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                // Load more posts when scrolled to bottom
                setVisiblePosts(prev => [
                    ...prev,
                    ...posts.slice(prev.length, prev.length + 10),
                ]);
            }
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
                                <Username>@{post.ownerusername}</Username>
                                <Timestamp>{new Date(post.timestamp).toLocaleString()}</Timestamp>
                            </UsernameTimestampWrapper>
                        </PostHeader>
                        {post.type === 'Image' && <PostImage src={post.displayurl} alt="Post image" />}
                        {post.type === 'Reels' && <PostVideo src={post.videourl} controls />}
                        {post.caption && <Caption>{post.caption}</Caption>}
                    </Post>
                ))
            )}
        </Container>
    );
};

export default RightContainer;
