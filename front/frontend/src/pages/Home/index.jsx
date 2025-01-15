import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import CompareIcon from '@mui/icons-material/Compare';
import UpdateIcon from '@mui/icons-material/Update';
import CategoryIcon from '@mui/icons-material/Category';

// Import product images
import iphones from '../../products/iphones.avif';
import laptop from '../../products/laptop.webp';
import smartwatch from '../../products/smartwatch.jpg';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      image: iphones,
      title: 'Smartphones',
      description: 'Discover the Latest Flagship Phones & Exclusive Deals',
    },
    {
      image: laptop,
      title: 'Laptops',
      description: 'Unleash Your Potential with Cutting-Edge Performance',
    },
    {
      image: smartwatch,
      title: 'Smart Watches',
      description: 'Stay Connected in Style with Next-Gen Wearables',
    },
  ];

  const features = [
    {
      icon: <CompareIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Comparison',
      description: 'Experience lightning-fast comparisons that find your perfect match in seconds',
    },
    {
      icon: <UpdateIcon sx={{ fontSize: 40 }} />,
      title: 'Trending Tech',
      description: 'Stay ahead with real-time updates on the hottest tech releases',
    },
    {
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Selection',
      description: 'Explore hand-picked devices from trusted global brands',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(45deg, #1a237e 30%, #2c3461 90%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(83,75,174,0.2) 0%, rgba(26,35,126,0.1) 100%)',
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3,
              position: 'relative',
              zIndex: 2
            }}
          >
            Discover Your Dream Device
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              mb: 4,
              maxWidth: 800,
              mx: 'auto',
              color: '#e3f2fd',
              position: 'relative',
              zIndex: 2
            }}
          >
            Experience the future of tech shopping with our AI-powered search.
            Find exactly what you want with unmatched precision and ease.
          </Typography>
        </Container>
      </Paper>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, color: '#ffffff' }}>
          Explore Premium Tech
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(26,35,126,0.2)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate('/category/' + category.id)}
              >
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  overflow: 'hidden',
                  borderRadius: '8px 8px 0 0',
                  background: 'linear-gradient(45deg, #2c3461, #1a237e)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, rgba(144,202,249,0.2) 0%, rgba(26,35,126,0.1) 100%)',
                    zIndex: 1
                  }
                }}>
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      p: 3,
                      position: 'relative',
                      zIndex: 2,
                      transform: 'scale(0.9)',
                      transition: 'transform 0.3s ease-in-out',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                      '&:hover': {
                        transform: 'scale(1)',
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(26,35,126,0.1)' }} />

        {/* Features Section */}
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, color: '#ffffff' }}>
          Smart Tech Search
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(26,35,126,0.2)'
                  }
                }}
              >
                <Box sx={{ 
                  mb: 2,
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: 'rgba(83,75,174,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80
                }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 40, color: '#90caf9' } })}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ffffff' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#e3f2fd' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(26,35,126,0.1)' }} />

        {/* Search Options Section */}
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, color: '#ffffff' }}>
          Find Your Perfect Match
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                bgcolor: 'background.paper',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 24px rgba(26,35,126,0.2)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate('/image-search')}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 6 }}>
                <Box sx={{ 
                  bgcolor: 'rgba(83,75,174,0.2)',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <ImageSearchIcon sx={{ fontSize: 40, color: '#90caf9' }} />
                </Box>
                <Typography gutterBottom variant="h4" component="h2" sx={{ color: '#ffffff' }}>
                  Visual Magic
                </Typography>
                <Typography variant="body1" sx={{ color: '#e3f2fd', mt: 2 }}>
                  Snap or upload a photo and let our AI find your dream device instantly
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  fullWidth 
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e 30%, #2c3461 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2c3461 30%, #1a237e 90%)',
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/image-search');
                  }}
                >
                  Search by Image
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                bgcolor: 'background.paper',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 24px rgba(26,35,126,0.2)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate('/text-search')}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 6 }}>
                <Box sx={{ 
                  bgcolor: 'rgba(83,75,174,0.2)',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <SearchIcon sx={{ fontSize: 40, color: '#90caf9' }} />
                </Box>
                <Typography gutterBottom variant="h4" component="h2" sx={{ color: '#ffffff' }}>
                  Smart Specs
                </Typography>
                <Typography variant="body1" sx={{ color: '#e3f2fd', mt: 2 }}>
                  Tell us your dream features and we'll find the perfect device match
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  fullWidth 
                  sx={{
                    background: 'linear-gradient(45deg, #1a237e 30%, #2c3461 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2c3461 30%, #1a237e 90%)',
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/text-search');
                  }}
                >
                  Search by Specs
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box sx={{ bgcolor: '#242c54', mt: 8, py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: '#e3f2fd' }} align="center">
            Powered by next-generation AI for lightning-fast, precise tech matching
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
