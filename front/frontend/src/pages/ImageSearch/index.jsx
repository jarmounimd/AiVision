import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const DragOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 17, 23, 0.97);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  
  &.active {
    opacity: 1;
    pointer-events: all;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px) 0 0 / 20px 20px;
    animation: scan 15s linear infinite;
  }

  @keyframes scan {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-20px);
    }
  }
`;

const SecurityCanvas = styled('canvas')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const SecurityFrame = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 2px solid rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(0, 255, 255, 0.2);
  }

  &::before {
    top: -2px;
    left: 20px;
    right: 20px;
    height: 2px;
    box-shadow: 0 204px 0 rgba(0, 255, 255, 0.2);
  }

  &::after {
    left: -2px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    box-shadow: 204px 0 0 rgba(0, 255, 255, 0.2);
  }
`;

const SecurityScan = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 300%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: scan-line 2s linear infinite;
  }

  @keyframes scan-line {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(33.33%);
    }
  }
`;

const FadeContainer = styled(Box)`
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateY(0);
  
  &.fade-out {
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
  }
`;

const ImagePreview = styled(Box)`
  position: relative;
  width: 100%;
  max-width: ${props => props.showResults ? '200px' : '300px'};
  margin: 0 auto;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.show {
    opacity: 1;
    transform: scale(1);
  }

  &.scanning {
    img {
      opacity: 0.4;
      filter: brightness(0.7);
      transform: scale(0.95);
    }

    .scan-line {
      animation: scanUpOnce 2s linear forwards;
    }

    .scanned-overlay {
      animation: fillOverlay 2s linear forwards;
    }
  }

  &.scan-complete {
    img {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform: scale(1);
      opacity: 1;
      filter: brightness(1);
    }
  }

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    background: rgba(0, 255, 255, 0.05);
    padding: 16px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    transform-origin: center;
  }

  .scan-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 255, 1) 50%,
      transparent 100%
    );
    box-shadow: 
      0 0 10px rgba(0, 255, 255, 0.8),
      0 0 20px rgba(0, 255, 255, 0.6),
      0 0 30px rgba(0, 255, 255, 0.4),
      0 0 40px rgba(0, 255, 255, 0.2);
    opacity: 0;
    z-index: 2;
  }

  .scanned-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0%;
    background: linear-gradient(
      to bottom,
      rgba(0, 255, 255, 0.15),
      transparent
    );
    opacity: 0.5;
    z-index: 1;
  }

  @keyframes scanUpOnce {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes fillOverlay {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(13, 17, 23, 0.8) !important;
  border: 2px solid rgba(0, 255, 255, 0.3);

  &:hover {
    border-color: rgba(0, 255, 255, 0.6);
    background: rgba(13, 17, 23, 0.9) !important;
    
    .upload-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8));
    }
  }

  .upload-icon {
    font-size: 48px;
    color: rgba(0, 255, 255, 0.8);
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
    z-index: 2;
  }

  .secure-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(0, 255, 255, 0.8);
    font-family: monospace;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 2;
  }
`;

const UploadZone = styled(Box)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(13, 17, 23, 0.8);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;

  &:hover {
    border-color: rgba(0, 255, 255, 0.6);
    background: rgba(13, 17, 23, 0.9);
    
    .upload-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.8));
    }
  }

  .upload-icon {
    font-size: 48px;
    color: rgba(0, 255, 255, 0.8);
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
    z-index: 2;
  }

  .secure-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(0, 255, 255, 0.8);
    font-family: monospace;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 2;
  }
`;

const ImageSearch = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [dataReady, setDataReady] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsPerPage = 12;

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    if (isDragging && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

      // Binary characters for matrix effect
      const chars = '01'.split('');
      
      // Initialize particles
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * maxRadius;
          particlesRef.current.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            char: chars[Math.floor(Math.random() * chars.length)],
            size: 10,
            opacity: Math.random() * 0.5 + 0.5,
            speed: (Math.random() * 1 + 0.5) * (radius / maxRadius),
            angle: angle,
            radius: radius,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach(particle => {
          // Update particle
          particle.pulsePhase += 0.05;
          particle.opacity = 0.5 + Math.sin(particle.pulsePhase) * 0.2;
          particle.radius -= particle.speed;

          if (particle.radius < 0) {
            particle.radius = maxRadius;
            particle.angle = Math.random() * Math.PI * 2;
            particle.char = chars[Math.floor(Math.random() * chars.length)];
          }

          // Calculate position
          particle.x = centerX + Math.cos(particle.angle) * particle.radius;
          particle.y = centerY + Math.sin(particle.angle) * particle.radius;

          // Draw character
          ctx.font = `${particle.size}px Courier`;
          ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
          ctx.fillText(particle.char, particle.x, particle.y);

          // Optional: Add subtle connection lines between nearby particles
          particlesRef.current.forEach(other => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 50)})`;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        });

        if (isDragging) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isDragging]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setShowPreview(true);
        startScanningAndSearch(file);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setShowPreview(true);
        startScanningAndSearch(file);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const startScanningAndSearch = async (file) => {
    setIsSearching(true);
    setError(null);
    setShowResults(false);
    setDataReady(false);
    
    // Start the scanning animation
    setTimeout(() => {
      setScanComplete(true);
    }, 2000);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Start the search request immediately
      const response = await fetch('http://localhost:5000/testImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Store the results but don't display them yet
      setResults(data.message || []);
      setPage(1);
      setError(null);
      setDataReady(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to search for similar images');
      setDataReady(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setShowResults(true);
    // Scroll to results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancel = () => {
    setShowResults(false);
    setResults([]);
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowPreview(false);
    setScanComplete(false);
    setError(null);
    setDataReady(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const indexOfLastResult = page * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const pageCount = Math.ceil(results.length / resultsPerPage);

  return (
    <>
      <Container 
        maxWidth="lg" 
        sx={{ mt: 4, mb: 8 }}
        onDragEnter={handleDragEnter}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#ffffff' }}>
            Image Search
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#e3f2fd' }}>
            Find similar products using an image
          </Typography>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            maxWidth: 600,
            mx: 'auto',
            background: 'linear-gradient(to bottom, #242c54, #1a1f3c)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '300px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(0,255,255,0) 100%)',
              opacity: 0.5,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
              opacity: 0.8,
            },
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <DragOverlay className={isDragging ? 'active' : ''}>
            <SecurityCanvas ref={canvasRef} />
            <SecurityFrame>
              <SecurityScan />
            </SecurityFrame>
            <Typography 
              variant="h5"
              sx={{ 
                color: 'rgb(0, 255, 255)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'Courier',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                '& > span': {
                  display: 'block',
                  fontSize: '0.8em',
                  opacity: 0.7,
                  marginTop: '8px',
                },
              }}
            >
              {scanComplete ? 'Scan Complete' : 'Secure Upload Protocol'}
              <span>{scanComplete ? 'Image Verified' : 'Scanning Image...'}</span>
            </Typography>
          </DragOverlay>

          {/* Hide upload button when preview is showing */}
          {!showPreview && (
            <FadeContainer 
              className={isDragging ? 'fade-out' : ''}
              sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                component="label"
                sx={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <StyledPaper elevation={3}>
                  <div className="secure-badge">SECURE UPLOAD</div>
                  <CloudUploadIcon className="upload-icon" />
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(0, 255, 255, 0.8)',
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    Secure Image Upload
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(0, 255, 255, 0.6)',
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      mt: 1,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    Drag & Drop or Click to Upload
                  </Typography>
                </StyledPaper>
              </Box>
            </FadeContainer>
          )}

          {/* Image Preview with scanning effect */}
          {previewUrl && (
            <>
              <ImagePreview 
                className={`
                  ${showPreview ? 'show' : ''} 
                  ${!scanComplete ? 'scanning' : 'scan-complete'}
                `}
                showResults={showResults}
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                />
                <div className="scanned-overlay" />
                <div className="scan-line" />
              </ImagePreview>
              
              {/* Show Try Another Image button only after transformation */}
              {showResults && (
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  size="small"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    color: 'rgba(0, 255, 255, 0.8)',
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    fontSize: '0.9rem',
                    mt: 2,
                    '&:hover': {
                      borderColor: 'rgba(0, 255, 255, 0.8)',
                      background: 'rgba(0, 255, 255, 0.1)',
                    }
                  }}
                >
                  Try Another Image
                </Button>
              )}
            </>
          )}

          {/* Show the Search button when scan is complete and data is ready */}
          {scanComplete && dataReady && !showResults && (
            <Box sx={{ 
              mt: 3, 
              display: 'flex', 
              justifyContent: 'center',
              gap: 2
            }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  minWidth: '200px',
                  height: '48px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #1a237e, #534bae)',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #534bae, #1a237e)',
                  }
                }}
              >
                View Similar Products
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: 'rgba(0, 255, 255, 0.8)',
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'rgba(0, 255, 255, 0.8)',
                    background: 'rgba(0, 255, 255, 0.1)',
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          )}

          {error && (
            <FadeContainer className={isDragging ? 'fade-out' : ''}>
              <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                {error}
              </Alert>
            </FadeContainer>
          )}
        </Paper>

        {/* Only show results after clicking the search button */}
        {showResults && results.length > 0 && (
          <FadeContainer className={isDragging ? 'fade-out' : ''} id="results-section">
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#e3f2fd' }}>
                Showing {indexOfFirstResult + 1}-{Math.min(indexOfLastResult, results.length)} of {results.length} results
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {currentResults.map((result, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: 'linear-gradient(to bottom, #242c54, #1a1f3c)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(26,35,126,0.2)'
                    }
                  }}>
                    <CardMedia
                      component="img"
                      image={result.thumbnail}
                      alt={result.title}
                      sx={{ 
                        height: 200,
                        objectFit: 'contain',
                        p: 2,
                        background: 'linear-gradient(45deg, #2c3461, #1a237e)',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h2"
                        sx={{
                          color: '#ffffff',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          mb: 1,
                          height: '2.6em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {result.title}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: '#90caf9',
                            fontWeight: 'bold'
                          }}
                        >
                          ${result.price}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          bgcolor: 'rgba(144,202,249,0.1)',
                          borderRadius: 1,
                          px: 1,
                          py: 0.5
                        }}>
                          <Typography sx={{ color: '#e3f2fd' }}>
                            ★ {result.rating}
                          </Typography>
                          <Typography sx={{ color: '#90caf9', fontSize: '0.8rem' }}>
                            ({result.reviews})
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={`https://www.google.com/search?q=${encodeURIComponent(result.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #1a237e, #534bae)',
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #534bae, #1a237e)',
                          }
                        }}
                      >
                        Search Product
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {pageCount > 1 && (
              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                '& .MuiPagination-ul': {
                  '& .MuiPaginationItem-root': {
                    color: '#e3f2fd',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(144,202,249,0.2)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(144,202,249,0.1)',
                    },
                  },
                },
              }}>
                <Typography sx={{ color: '#e3f2fd', mb: 1 }}>
                  Page {page} of {pageCount}
                </Typography>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary"
                  size="large"
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Box>
            )}
          </FadeContainer>
        )}
      </Container>
    </>
  );
};

export default ImageSearch;
