'use client'
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Typography,
  Stack,
  Autocomplete,
  TextField,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { deletePost, fetchPosts } from '@/lib/features/post/postSlice';
import RefreshPost from '../components/RefreshPost';
import DeleteIcon from '@mui/icons-material/Delete';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.value);

  const handleEdit = (id: number) => {
    console.log(`Edit post with ID: ${id}`);
  };

  const countPosts = (posts: any) => posts.length

  const handleRefreshPost = useCallback(() => {
    dispatch(fetchPosts());
  }, [])

  const memocountPosts = useMemo(() => countPosts(posts), [posts])

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ marginBottom: '12px', display: 'flex' }} >
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={posts.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search..."
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'search',
                    },
                  }}
                  sx={{
                    '.MuiInputBase-root': {
                      height: '40px',
                    }
                  }}
                />
              )}
            />
          </Stack>
          <Button variant="contained" color="success" size="small" sx={{ marginLeft: '8px' }}>
            <AddIcon />
          </Button>
          <RefreshPost handleRefreshPost={handleRefreshPost} />
        </Box>
        <Typography variant="h5" gutterBottom >
          Total Post: {memocountPosts}
        </Typography>
      </Box >

      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Content</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(Number(post.id))}
                        sx={{ marginRight: '8px' }}
                        size="small"
                      >
                        <CreateIcon />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this item?")) {
                            dispatch(deletePost(post.id));
                          }
                        }}
                        sx={{ marginRight: '8px' }}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Posts;
