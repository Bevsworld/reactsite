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
    height: 500px; /* Fixed height for desktop */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    

    @media (max-width: 768px) {
        width: 90%;
        margin-left: 0;
        height: 500px; /* Fixed height for mobile */
        margin-bottom: 20px;
    }
`;


const Tweet = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    background: white;
    padding: 10px 50px 10px 10px; /* Add padding to the right to avoid text overlap with navigation buttons */
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

const NavigationButtons = styled.div`
    display: flex;
    align-items: center; /* Center items vertically */
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

const NavButton = styled.button`
    background-color: rgb(188, 225, 255);
    color: white;
    border: none;
    padding: 3px 6px; /* Make the buttons smaller */
    border-radius: 5px;
    cursor: pointer;

`;

const PillButton = styled.button`
    background-color: #bce1ff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px; /* Pill shape */
    margin: 0 5px; /* Add some margin between the arrows and the pill button */
    cursor: pointer;
`;

const ContentContainer = ({ filter }) => {
    const [tweets, setTweets] = useState([]);
    const [visibleTweets, setVisibleTweets] = useState({});
    const [loading, setLoading] = useState(true);
    const [tweetIndexes, setTweetIndexes] = useState({});
    const containerRef = useRef(null);

    useEffect(() => {
        fetch('https://apiserver-real.onrender.com/tweets')
            .then(response => response.json())
            .then(data => {
                setTweets(data);
                const groupedTweets = data.reduce((acc, tweet) => {
                    if (!acc[tweet.username]) acc[tweet.username] = [];
                    acc[tweet.username].push(tweet);
                    return acc;
                }, {});
                setVisibleTweets(groupedTweets);
                setTweetIndexes(Object.keys(groupedTweets).reduce((acc, username) => {
                    acc[username] = 0;
                    return acc;
                }, {}));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching tweets:', error));
    }, []);

    useEffect(() => {
        if (filter.length === 0) {
            const groupedTweets = tweets.reduce((acc, tweet) => {
                if (!acc[tweet.username]) acc[tweet.username] = [];
                acc[tweet.username].push(tweet);
                return acc;
            }, {});
            setVisibleTweets(groupedTweets);
        } else {
            const filteredTweets = tweets.filter(tweet => filter.includes(tweet.party));
            const groupedFilteredTweets = filteredTweets.reduce((acc, tweet) => {
                if (!acc[tweet.username]) acc[tweet.username] = [];
                acc[tweet.username].push(tweet);
                return acc;
            }, {});
            setVisibleTweets(groupedFilteredTweets);
        }
    }, [filter, tweets]);

    const handleNextTweet = (username) => {
        setTweetIndexes(prevIndexes => ({
            ...prevIndexes,
            [username]: prevIndexes[username] + 1
        }));
    };

    const handlePreviousTweet = (username) => {
        setTweetIndexes(prevIndexes => ({
            ...prevIndexes,
            [username]: prevIndexes[username] - 1
        }));
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
        <Container ref={containerRef}>
            {loading ? (
                <Spinner />
            ) : (
                Object.keys(visibleTweets).map((username, index) => {
                    const userTweets = visibleTweets[username];
                    const currentIndex = tweetIndexes[username];
                    const currentTweet = userTweets[currentIndex];

                    return (
                        <Tweet key={index}>
                            <ProfilePictureContainer>
                                <ProfilePicture src={currentTweet.profilepicture} alt={currentTweet.username} />
                                {currentTweet.party && <PartyLogo src={getPartyLogo(currentTweet.party)} alt={`${currentTweet.party} logo`} />}
                            </ProfilePictureContainer>
                            <TweetContent>
                                <Username>@{currentTweet.username}</Username>
                                <TweetText>{formatTweetText(currentTweet.text)}</TweetText>
                                <Timestamp>{new Date(currentTweet.timestamp).toLocaleString()}</Timestamp>
                            </TweetContent>
                            <TwitterLogo src={twitterLogo} alt="Twitter logo" />
                            <NavigationButtons>
                                <NavButton
                                    onClick={() => handlePreviousTweet(username)}
                                    disabled={currentIndex === 0}
                                >
                                    &lt;
                                </NavButton>
                                <PillButton>visa fler</PillButton>
                                <NavButton
                                    onClick={() => handleNextTweet(username)}
                                    disabled={currentIndex === userTweets.length - 1}
                                >
                                    &gt;
                                </NavButton>
                            </NavigationButtons>
                        </Tweet>
                    );
                })
            )}
        </Container>
    );
};

export default ContentContainer;
