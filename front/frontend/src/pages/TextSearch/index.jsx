import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TextSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const resultsPerPage = 12;

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/searchText?query=${encodeURIComponent(searchQuery)}&size=20`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.message || []);
      setPage(1);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#ffffff' }}>
          Text Search
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#e3f2fd' }}>
          Search products by description
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        component="form"
        onSubmit={handleSearch}
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
      >
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter product description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 255, 255, 0.8)',
                },
                color: 'white',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              minWidth: '120px',
              position: 'relative',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '& .MuiCircularProgress-root': {
                position: 'absolute',
                left: '50%',
                marginLeft: '-12px',
              }
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" />
                <Box component="span" sx={{ opacity: 0 }}>
                  Search
                </Box>
              </>
            ) : (
              <>
                <SearchIcon sx={{ mr: 1 }} />
                Search
              </>
            )}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
      </Paper>

      {results.length > 0 && (
        <>
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
                        {result.price.startsWith('$') ? result.price : `$${result.price}`}
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
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default TextSearch;
