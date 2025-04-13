import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import VideoPlayer from '../components/VideoPlayer';

// This will be replaced with actual API call
const SAMPLE_COURSE = {
  id: 'course-1',
  title: 'Web Development Fundamentals',
  description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
  videos: [
    {
      id: 'video-1',
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML markup language.',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
      duration: '45:30',
    },
    {
      id: 'video-2',
      title: 'CSS Fundamentals',
      description: 'Master CSS styling and layouts.',
      url: 'https://www.youtube.com/watch?v=1PnVor36_40',
      duration: '38:15',
    },
    {
      id: 'video-3',
      title: 'JavaScript Basics',
      description: 'Get started with JavaScript programming.',
      url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      duration: '52:20',
    },
  ],
};

const Course = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourse(SAMPLE_COURSE);
      setSelectedVideo(SAMPLE_COURSE.videos[0]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [courseId]);

  if (loading || !course || !selectedVideo) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Fade in={true} timeout={1000}>
          <Typography variant="h6" color="text.secondary">
            Loading course content...
          </Typography>
        </Fade>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in={true} timeout={800}>
        <div>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>
        </div>
      </Fade>
      
      <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
        <Slide direction="right" in={true} timeout={800}>
          <Box sx={{ flex: '0 0 300px' }}>
            <Paper 
              sx={{ 
                p: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Course Content
              </Typography>
              <List>
                {course.videos.map((video, index) => (
                  <Grow in={true} timeout={500 + index * 200} key={video.id}>
                    <ListItem
                      component="div"
                      onClick={() => setSelectedVideo(video)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          transform: 'translateX(4px)',
                        },
                        ...(video.id === selectedVideo.id && {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }),
                      }}
                    >
                      <ListItemText
                        primary={video.title}
                        primaryTypographyProps={{ component: 'div' }}
                        secondaryTypographyProps={{ component: 'div' }}
                        secondary={
                          <Box component="div">
                            <Typography 
                              variant="body2" 
                              component="div"
                              sx={{ 
                                color: video.id === selectedVideo.id ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                display: 'block'
                              }}
                            >
                              {video.description}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              component="div"
                              sx={{ 
                                color: video.id === selectedVideo.id ? 'rgba(255,255,255,0.7)' : 'primary.main',
                                display: 'block',
                                mt: 0.5
                              }}
                            >
                              Duration: {video.duration}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Grow>
                ))}
              </List>
            </Paper>
          </Box>
        </Slide>
        
        <Slide direction="left" in={true} timeout={800}>
          <Box sx={{ flex: 1 }}>
            <VideoPlayer videoUrl={selectedVideo.url} videoId={selectedVideo.id} />
            <Fade in={true} timeout={1200}>
              <Paper 
                sx={{ 
                  p: 2, 
                  mt: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ color: 'primary.main' }}
                >
                  {selectedVideo.title}
                </Typography>
                <Typography variant="body1">
                  {selectedVideo.description}
                </Typography>
              </Paper>
            </Fade>
          </Box>
        </Slide>
      </Box>
    </Container>
  );
};

export default Course; 