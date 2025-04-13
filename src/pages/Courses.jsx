import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  useTheme,
  Rating,
  Skeleton,
  Container,
  InputBase,
  Paper,
  Avatar,
} from '@mui/material';
import {
  PlayArrow,
  AccessTime,
  Star,
  BookmarkBorder,
  Bookmark,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, index }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const getFallbackImage = (category) => {
    // Fallback images based on course category
    const fallbacks = {
      'Web Development': 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
      'Machine Learning': 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
      'Mobile Development': 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      'Data Science': 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      'Marketing': 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
      'Blockchain': 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
      'default': 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg'
    };
    return fallbacks[category] || fallbacks.default;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
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
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
        <CardMedia
          component="img"
          image={imageError ? getFallbackImage(course.category) : course.thumbnail}
          alt={course.title}
          onError={handleImageError}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={course.category}
            size="small"
            sx={{
              mb: 1,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(44, 126, 248, 0.1)' : 'rgba(44, 126, 248, 0.1)',
              color: 'primary.main',
            }}
          />
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              height: '2.4em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {course.title}
          </Typography>
        </Box>

        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating value={course.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({course.reviews.toLocaleString()})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip
            icon={<AccessTime sx={{ fontSize: '1rem' }} />}
            label={course.duration}
            size="small"
            sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'background.default' }}
          />
          <Chip
            icon={<PlayArrow sx={{ fontSize: '1rem' }} />}
            label={`${course.lessons} lessons`}
            size="small"
            sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'background.default' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={course.instructor.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {course.instructor.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {course.instructor.title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            ${course.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/course/${course.id}`)}
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            Enroll Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(SAMPLE_COURSES);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = SAMPLE_COURSES.filter(course => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.level.toLowerCase().includes(searchTerm) ||
        course.instructor.name.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredCourses(filtered);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          textAlign: 'center',
          animation: 'slideDown 0.5s ease-out',
          '@keyframes slideDown': {
            from: {
              opacity: 0,
              transform: 'translateY(-20px)',
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: theme.palette.background.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explore Our Courses
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Learn from industry experts and advance your career
        </Typography>
        <Paper
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: '80%', md: '60%' },
            mx: 'auto',
            mb: 4,
            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <InputBase
            sx={{ 
              ml: 1, 
              flex: 1,
              '& input': {
                color: theme.palette.text.primary,
              },
            }}
            placeholder="Search courses by title, category, level, or instructor..."
            value={searchQuery}
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search courses' }}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ p: '10px' }} aria-label="filters">
            <FilterIcon />
          </IconButton>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {(isLoading ? Array(6).fill({}) : filteredCourses).map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={course.id || index}>
            {isLoading ? (
              <Card sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" height={160} />
                <CardContent>
                  <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" height={32} width="100%" />
                </CardContent>
              </Card>
            ) : (
              <CourseCard course={course} index={index} />
            )}
          </Grid>
        ))}
        {!isLoading && filteredCourses.length === 0 && (
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No courses found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

const SAMPLE_COURSES = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js',
    thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
    price: 99.99,
    rating: 4.8,
    reviews: 2584,
    duration: '48h',
    lessons: 156,
    category: 'Web Development',
    level: 'Beginner to Advanced',
    instructor: {
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=1',
      title: 'Senior Web Developer',
    },
  },
  {
    id: 2,
    title: 'Advanced Machine Learning Specialization',
    description: 'Master machine learning concepts and implement real-world AI projects',
    thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    price: 129.99,
    rating: 4.9,
    reviews: 1845,
    duration: '56h',
    lessons: 184,
    category: 'Machine Learning',
    level: 'Intermediate to Advanced',
    instructor: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      title: 'AI Research Scientist',
    },
  },
  {
    id: 3,
    title: 'iOS App Development with Swift',
    description: 'Build iOS apps from scratch and publish them on the App Store',
    thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    price: 89.99,
    rating: 4.7,
    reviews: 1256,
    duration: '36h',
    lessons: 128,
    category: 'Mobile Development',
    level: 'Beginner to Intermediate',
    instructor: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      title: 'iOS Developer',
    },
  },
  {
    id: 4,
    title: 'Data Science and Analytics',
    description: 'Learn data analysis, visualization, and statistical methods',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    price: 109.99,
    rating: 4.6,
    reviews: 958,
    duration: '42h',
    lessons: 145,
    category: 'Data Science',
    level: 'Intermediate',
    instructor: {
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=4',
      title: 'Data Scientist',
    },
  },
  {
    id: 5,
    title: 'Digital Marketing Masterclass',
    description: 'Master modern digital marketing strategies and tools',
    thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    price: 79.99,
    rating: 4.5,
    reviews: 2156,
    duration: '32h',
    lessons: 98,
    category: 'Marketing',
    level: 'All Levels',
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      title: 'Marketing Director',
    },
  },
  {
    id: 6,
    title: 'Blockchain Development',
    description: 'Learn to build decentralized applications and smart contracts',
    thumbnail: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    price: 149.99,
    rating: 4.8,
    reviews: 856,
    duration: '44h',
    lessons: 132,
    category: 'Blockchain',
    level: 'Advanced',
    instructor: {
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=6',
      title: 'Blockchain Engineer',
    },
  },
];

export default Courses; 