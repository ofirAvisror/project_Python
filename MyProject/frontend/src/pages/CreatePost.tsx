import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postsAPI } from '../services/api';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  is_published: yup.boolean().required().default(false),
});

type CreatePostFormData = yup.InferType<typeof schema>;

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreatePostFormData>({
    resolver: yupResolver<CreatePostFormData>(schema),
    defaultValues: {
      is_published: false,
    },
  });

  const isPublished = watch('is_published');

  const onSubmit: SubmitHandler<CreatePostFormData> = async (data) => {
    try {
      setError('');
      await postsAPI.createPost(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create post');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Create New Post
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Post Title"
              autoFocus
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={10}
              id="content"
              label="Post Content"
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            <FormControlLabel
              control={
                <Switch
                  {...register('is_published')}
                  checked={isPublished}
                />
              }
              label="Publish immediately"
              sx={{ mt: 2, mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatePost;
