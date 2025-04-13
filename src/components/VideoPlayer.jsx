import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, LinearProgress, Typography, Paper, Fade } from '@mui/material';
import { updateProgress, getProgress } from '../services/api';

const VideoPlayer = ({ videoUrl, videoId }) => {
  const [progress, setProgress] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const currentIntervalRef = useRef(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getProgress(videoId);
        setProgress(data.totalProgress);
        setLastPosition(data.lastPosition);
        setWatchedIntervals(data.watchedIntervals);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [videoId]);

  const handleProgress = ({ playedSeconds }) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 1000) return; // Update every second

    if (!currentIntervalRef.current) {
      currentIntervalRef.current = { start: playedSeconds, end: playedSeconds };
    } else {
      currentIntervalRef.current.end = playedSeconds;
    }

    lastUpdateRef.current = now;
  };

  const handlePause = async () => {
    if (currentIntervalRef.current) {
      try {
        const interval = currentIntervalRef.current;
        const duration = playerRef.current?.getDuration() || 0;
        
        const response = await updateProgress(videoId, interval, duration);
        setProgress(response.totalProgress);
        setWatchedIntervals(response.watchedIntervals);
        setLastPosition(response.lastPosition);
        
        currentIntervalRef.current = null;
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const handleReady = () => {
    setIsReady(true);
    if (lastPosition > 0 && playerRef.current) {
      playerRef.current.seekTo(lastPosition);
    }
  };

  return (
    <Fade in={!isLoading} timeout={800}>
      <Box className="video-container">
        <Paper 
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            },
          }}
        >
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="450px"
            controls
            onProgress={handleProgress}
            onPause={handlePause}
            onReady={handleReady}
            progressInterval={1000}
            style={{ aspectRatio: '16/9' }}
          />
          <Box sx={{ p: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 1,
                animation: 'slideIn 0.5s ease-out',
              }}
            >
              Progress: {Math.round(progress)}%
            </Typography>
            <Box className="progress-bar">
              <Box
                className="progress-bar-fill"
                sx={{
                  width: `${progress}%`,
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default VideoPlayer; 