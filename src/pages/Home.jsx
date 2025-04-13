import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School,
  Timeline,
  People,
  TrendingUp,
  DevicesOther,
  EmojiEvents,
} from '@mui/icons-material';

const features = [
  {
    icon: <School fontSize="large" />,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience',
  },
  {
    icon: <Timeline fontSize="large" />,
    title: 'Flexible Learning',
    description: 'Study at your own pace with lifetime access to courses',
  },
  {
    icon: <People fontSize="large" />,
    title: 'Community Support',
    description: 'Join a community of learners and get help when needed',
  },
  {
    icon: <TrendingUp fontSize="large" />,
    title: 'Career Growth',
    description: 'Gain skills that help you advance in your career',
  },
  {
    icon: <DevicesOther fontSize="large" />,
    title: 'Multi-platform',
    description: 'Access your courses on any device, anywhere',
  },
  {
    icon: <EmojiEvents fontSize="large" />,
    title: 'Certification',
    description: 'Earn certificates upon course completion',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'The courses here transformed my career. I went from knowing nothing about web development to landing my dream job.',
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'The machine learning courses are top-notch. The instructors explain complex concepts in an easy-to-understand way.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'I love how practical the courses are. You get to work on real projects that you can add to your portfolio.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.background.gradient,
          color: theme.palette.mode === 'dark' ? 'white' : 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: 'slideInLeft 0.8s ease-out',
                  '@keyframes slideInLeft': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(-100px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Unlock Your Potential with Expert-Led Courses
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  Learn from industry experts and advance your career with our comprehensive online courses
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/courses')}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                      },
                      '100%': {
                        transform: 'scale(1)',
                      },
                    },
                  }}
                >
                  Explore Courses
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  animation: 'slideInRight 0.8s ease-out',
                  '@keyframes slideInRight': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(100px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <img
                  src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg"
                  alt="Learning"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                  '@keyframes fadeIn': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                  bgcolor: theme.palette.background.card,
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      transform: 'scale(1.2)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Student Success Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    animation: `slideUp 0.5s ease-out ${index * 0.2}s forwards`,
                    opacity: 0,
                    '@keyframes slideUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(40px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                    bgcolor: theme.palette.background.card,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of students who are already learning with us
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/courses')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.1rem',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(-10px)',
                },
              },
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 