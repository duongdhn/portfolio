import useAxiosInstance from '@/app/tools/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Post {
  id: number
  title: string;
  content: string;
}

export interface PostState {
  value: Post[];
}

const initialState: PostState = {
  value: [],
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.get<Post[]>(`/posts`);
    return response.data;
  } catch (error) {
    throw new Error('Failed');
  }
});

export const fetchPost = createAsyncThunk('post/fetchPost', async (idPost: number) => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.get<Post>(`/posts/${idPost}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed');
  }
});

export const addPost = createAsyncThunk('post/addPost', async (newPost: Post) => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.post<Post>('/posts', newPost);
    return response.data;
  } catch (error) {
    throw new Error('Failed');
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async (updatePost: Post) => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.put<Post>(`/posts/${updatePost.id}`, updatePost);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (idPost: number) => {
  const axiosInstance = useAxiosInstance();
  try {
    await axiosInstance.delete<void>(`/posts/${idPost}`);
    return idPost;
  } catch (error) {
    throw new Error('Failed');
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.value = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = state.value.filter(post => post.id !== action.payload);
        toast.success('Post deleted successfully');
      });
  }
});

export default postSlice.reducer;
