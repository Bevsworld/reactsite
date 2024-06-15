import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Container,
    Grid,
    IconButton,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import twitterLogo from './twitter-logo.png';
import sLogo from './s.png';
import sdLogo from './sd.png';
import kdLogo from './kd.png';
import lLogo from './l.png';
import mpLogo from './mp.png';
import vLogo from './v.png';
import cLogo from './c.png';
import mLogo from './moderat.png';

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(2.5),
    backgroundColor: 'rgba(90,142,243,0.06)',
    borderRadius: 8,
    borderLeft: 'rgba(62, 66, 65, 0.47)',
    boxShadow: '0 4px 8px rgba(190, 252, 252, 0.22)',
    width: '80%',
    height: '500px',
    overflowY: 'auto',
    textAlign: 'left',
    overflowX: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('md')]: {
        width: '90%',
        marginLeft: 0,
        height: '500px',
        marginBottom: theme.spacing(2.5),
    },
}));

const StyledTweet = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 17,
    marginBottom: theme.spacing(2.5),
    backgroundColor: "white",
    padding: theme.spacing(1.25, 6.25, 1.25, 1.25),
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflowWrap: 'break-word',
}));

const ProfilePictureContainer = styled(Box)({
    position: 'relative',
    marginRight: '20px',
});

const ProfilePicture = styled('img')({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
});

const PartyLogo = styled('img')({
    position: 'absolute',
    bottom: 0,
    right: '-10px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
});

const TweetContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

const Timestamp = styled(Typography)({
    fontSize: '0.8em',
    color: 'gray',
    marginTop: '15px',
});

const TwitterLogo = styled('img')({
    position: 'absolute',
    top: '10px',
    right: '15px',
    width: '20px',
    height: '20px',
});

const NavigationButtons = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5px',
    right: '5px',
});

const NavButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgb(120, 190, 239)',
    color: 'white',
    padding: '0 6px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontSize: '10px',
    minWidth: 'auto',
    height: '24px',

    '&:disabled': {
        backgroundColor: theme.palette.action.disabled,
    },
}));

const PillButton = styled(Button)({
    backgroundColor: '#78beef',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '2px',
    margin: '0 5px',
    cursor: 'pointer',
    fontSize: '10px',
    height: '24px',
    minWidth: 'auto',
});

const ContentContainer = ({ filter }) => {
    const [tweets, setTweets] = useState([]);
    const [visibleTweets, setVisibleTweets] = useState({});
    const [loading, setLoading] = useState(true);
    const [tweetIndexes, setTweetIndexes] = useState({});
    const [showScrollToTop, setShowScrollToTop] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setShowScrollToTop(containerRef.current.scrollTop > 200);
            }
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
        <StyledContainer ref={containerRef}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : (
                Object.keys(visibleTweets).map((username, index) => {
                    const userTweets = visibleTweets[username];
                    const currentIndex = tweetIndexes[username];
                    const currentTweet = userTweets[currentIndex];

                    return (
                        <StyledTweet key={index}>
                            <ProfilePictureContainer>
                                <ProfilePicture src={currentTweet.profilepicture} alt={currentTweet.username} />
                                {currentTweet.party && <PartyLogo src={getPartyLogo(currentTweet.party)} alt={`${currentTweet.party} logo`} />}
                            </ProfilePictureContainer>
                            <TweetContent>
                                <Typography variant="body1">@{currentTweet.username}</Typography>
                                <Typography variant="body2" component="span">{formatTweetText(currentTweet.text)}</Typography>
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
                                <PillButton>fler</PillButton>
                                <NavButton
                                    onClick={() => handleNextTweet(username)}
                                    disabled={currentIndex === userTweets.length - 1}
                                >
                                    &gt;
                                </NavButton>
                            </NavigationButtons>
                        </StyledTweet>
                    );
                })
            )}
        </StyledContainer>
    );
};

export default ContentContainer;
