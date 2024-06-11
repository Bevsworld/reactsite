import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import twitterLogo from './twitter-logo.png'; // Import the Twitter logo
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
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    height: 500px; /* Fixed height for approximately 10 tweets */
    overflow-y: scroll; /* Enable vertical scrolling */
    margin-left: auto;
    margin-right: auto;
    text-align: left;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        height: auto;
        margin-bottom: 20px;
    }
`;

const Tweet = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* To position the Twitter logo */
    overflow-wrap: break-word; /* Ensure long text breaks appropriately */
`;

const ProfilePictureContainer = styled.div`
    position: relative;
    margin-right: 20px;
`;

const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

const PartyLogo = styled.img`
    position: absolute;
    bottom: 0;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

const TweetContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Username = styled.span`
    font-weight: bold;
    margin-bottom: 5px;
`;

const Timestamp = styled.span`
    font-size: 0.8em;
    color: gray;
    margin-top: 5px;
`;

const TwitterLogo = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
`;

const TweetText = styled.span`
  white-space: pre-wrap; /* Preserve white spaces and line breaks */
`;

const ContentContainer = ({ filter }) => {
    const [tweets, setTweets] = useState([]);
    const [visibleTweets, setVisibleTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/tweets')
            .then(response => response.json())
            .then(data => {
                setTweets(data);
                setVisibleTweets(data.slice(0, 100)); // Initially display 100 tweets
                setLoading(false);
            })
            .catch(error => console.error('Error fetching tweets:', error));
    }, []);

    useEffect(() => {
        if (filter.length === 0) {
            setVisibleTweets(tweets.slice(0, 100));
        } else {
            const filteredTweets = tweets.filter(tweet => filter.includes(tweet.party));
            setVisibleTweets(filteredTweets.slice(0, 100));
        }
    }, [filter, tweets]);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                if (filter.length === 0) {
                    setVisibleTweets(prev => [
                        ...prev,
                        ...tweets.slice(prev.length, prev.length + 100),
                    ]);
                } else {
                    const filteredTweets = tweets.filter(tweet => filter.includes(tweet.party));
                    setVisibleTweets(prev => [
                        ...prev,
                        ...filteredTweets.slice(prev.length, prev.length + 100),
                    ]);
                }
            }
        }
    };

    const formatTweetText = (text) => {
        const parts = text.split(/(#[\w-]+|@[\w-]+|https?:\/\/[^\s]+)/g);
        return parts.map((part, index) => {
            if (part.match(/#[\w-]+|@[\w-]+/)) {
                return <strong key={index}>{part}</strong>;
            } else if (part.match(/https?:\/\/[^\s]+/)) {
                return <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{part}</a>;
            } else {
                return part;
            }
        });
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

    return (
        <Container ref={containerRef} onScroll={handleScroll}>
            {loading ? (
                <Spinner />
            ) : (
                visibleTweets.map((tweet, index) => (
                    <Tweet key={index}>
                        <ProfilePictureContainer>
                            <ProfilePicture src={tweet.profilepicture} alt={tweet.username} />
                            {tweet.party && <PartyLogo src={getPartyLogo(tweet.party)} alt={`${tweet.party} logo`} />}
                        </ProfilePictureContainer>
                        <TweetContent>
                            <Username>@{tweet.username}</Username>
                            <TweetText>{formatTweetText(tweet.text)}</TweetText>
                            <Timestamp>{new Date(tweet.timestamp).toLocaleString()}</Timestamp>
                        </TweetContent>
                        <TwitterLogo src={twitterLogo} alt="Twitter logo" />
                    </Tweet>
                ))
            )}
        </Container>
    );
};

export default ContentContainer;
