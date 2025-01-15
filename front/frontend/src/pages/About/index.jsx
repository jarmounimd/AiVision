import React from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  color: '#e3f2fd',
  marginBottom: theme.spacing(3),
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  color: '#00ffff',
  borderColor: 'rgba(0, 255, 255, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    borderColor: 'rgba(0, 255, 255, 0.8)',
  },
}));

const About = () => {
  const technologies = {
    frontend: [
      'React 18',
      'Material-UI v5',
      'React Router v6',
      'Framer Motion',
    ],
    backend: [
      'Python/Flask',
      'TensorFlow/Keras',
      'OpenCV',
      'Scikit-learn',
    ],
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 4, 
          color: '#fff',
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        About Our Technology
      </Typography>

      {/* Overview Section */}
      <StyledPaper elevation={3}>
        <Typography variant="h5" sx={{ mb: 2, color: '#64b5f6', fontWeight: 600 }}>
          Overview
        </Typography>
        <Typography paragraph sx={{ color: '#e3f2fd' }}>
          Our platform combines modern web technologies with advanced machine learning to create 
          a powerful product search system. We utilize deep learning models for feature extraction 
          and similarity matching, enabling both image-based and text-based product search.
        </Typography>
      </StyledPaper>

      {/* Search Technology */}
      <StyledPaper elevation={3}>
        <Typography variant="h5" sx={{ mb: 2, color: '#64b5f6', fontWeight: 600 }}>
          Search Technology
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Image Search */}
          <Box flex={1} minWidth={250}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ImageSearchIcon sx={{ mr: 1, color: '#00ffff' }} />
              <Typography variant="h6" sx={{ color: '#00ffff', fontWeight: 600 }}>
                Image Search
              </Typography>
            </Box>
            <Typography paragraph sx={{ color: '#e3f2fd' }}>
              Uses a CNN architecture (ResNet) to extract 2048-dimensional feature vectors from images.
              Implements cosine similarity matching to find visually similar products in real-time.
            </Typography>
          </Box>

          {/* Text Search */}
          <Box flex={1} minWidth={250}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ mr: 1, color: '#00ffff' }} />
              <Typography variant="h6" sx={{ color: '#00ffff', fontWeight: 600 }}>
                Text Search
              </Typography>
            </Box>
            <Typography paragraph sx={{ color: '#e3f2fd' }}>
              Employs NLP techniques to convert queries into semantic vectors. Uses TF-IDF and 
              cosine similarity for accurate product matching and ranking.
            </Typography>
          </Box>
        </Box>
      </StyledPaper>

      {/* Tech Stack */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Frontend */}
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, color: '#64b5f6' }} />
              <Typography variant="h6" sx={{ color: '#e3f2fd', fontWeight: 600 }}>
                Frontend Stack
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {technologies.frontend.map((tech) => (
                <TechChip key={tech} label={tech} variant="outlined" />
              ))}
            </Box>
          </StyledPaper>
        </Grid>

        {/* Backend */}
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StorageIcon sx={{ mr: 1, color: '#64b5f6' }} />
              <Typography variant="h6" sx={{ color: '#e3f2fd', fontWeight: 600 }}>
                Backend Stack
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {technologies.backend.map((tech) => (
                <TechChip key={tech} label={tech} variant="outlined" />
              ))}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
