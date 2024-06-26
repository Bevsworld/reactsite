import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    Box,
    Container,
    CircularProgress,
    Typography,
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

const BATCH_SIZE = 25;

const StyledOuterContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(2.5),
    backgroundColor: 'offwhite',
    borderRadius: 8,
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    overflow: 'hidden',
    textAlign: 'left',
    margin: '0 auto', // Centers the container
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'gainsboro',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.10)',

    [theme.breakpoints.down('md')]: {
        color: 'dimgray',
        width: '100%',
        marginLeft: 0,
        height: 'auto',
        borderColor: 'white',
        marginBottom: theme.spacing(2.5),
    },
}));

const StyledInnerContainer = styled(Box)(({ theme }) => ({
    maxHeight: '500px',
    overflowY: 'auto',
    paddingRight: theme.spacing(1),

    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
    },
}));

const StyledTweet = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 17,
    marginBottom: theme.spacing(2.5),
    backgroundColor: "offwhite",
    padding: theme.spacing(1.25),
    borderRadius: 8,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflowWrap: 'break-word',
    width: '100%',
    paddingLeft: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: '2px',
    borderLeftColor: 'lightslategrey',
}));

const ProfilePictureContainer = styled(Box)({
    position: 'relative',
    marginRight: '20px',
});

const ProfilePicture = styled('img')({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    marginLeft: "9px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "gainsboro",
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
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
                setVisibleTweets(data.slice(0, BATCH_SIZE));
                setLoading(false);
            })
            .catch(error => console.error('Error fetching tweets:', error));
    }, []);

    const loadMoreTweets = useCallback(() => {
        setVisibleTweets(prevVisibleTweets => {
            const startIndex = prevVisibleTweets.length;
            const nextTweets = tweets.slice(startIndex, startIndex + BATCH_SIZE);
            return [...prevVisibleTweets, ...nextTweets];
        });
    }, [tweets]);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMoreTweets();
            }
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        const filteredTweets = filter.length === 0 ? tweets : tweets.filter(tweet => filter.includes(tweet.party));
        setVisibleTweets(filteredTweets.slice(0, BATCH_SIZE));
    }, [filter, tweets]);

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
        <StyledOuterContainer>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : (
                <StyledInnerContainer ref={containerRef}>
                    {visibleTweets.map((tweet, index) => (
                        <StyledTweet key={index}>
                            <ProfilePictureContainer>
                                <ProfilePicture src={tweet.profilepicture} alt={tweet.username} />
                                {tweet.party && <PartyLogo src={getPartyLogo(tweet.party)} alt={`${tweet.party} logo`} />}
                            </ProfilePictureContainer>
                            <TweetContent>
                                <Typography variant="body1">@{tweet.username}</Typography>
                                <Typography variant="body2" component="span">
                                    {tweet.text}
                                </Typography>
                                <Timestamp>{new Date(tweet.timestamp).toLocaleString()}</Timestamp>
                            </TweetContent>
                            <TwitterLogo src={twitterLogo} alt="Twitter logo" />
                        </StyledTweet>
                    ))}
                </StyledInnerContainer>
            )}
        </StyledOuterContainer>
    );
};

export default ContentContainer;
