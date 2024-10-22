'use client';
import MainLayout from '../components/MainLayout';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: session, update, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });
  console.log("session login: ", session);
  

  React.useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      setFormData({
        name: session?.user.name || '',
        email: session?.user.email || '',
      });
      setLoading(false);
    }
  }, [status, session]);

  async function updateSession(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (session) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          name: formData.name,
        },
      };
      try {
        await update(updatedSession);
        toast.success("Updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Error updating session");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("No session found.");
      setLoading(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <MainLayout>
      <form onSubmit={updateSession} className='m-3'>
        <Typography level="h1">Profile</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ '& > :not(style)': { mb: 2 } }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="name">Username</InputLabel>
                <Input
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </FormControl>
            </Box>
            <Box sx={{ '& > :not(style)': { mb: 2 } }}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  inputProps={{
                    readOnly: true,
                    sx: {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                      color: 'rgba(0, 0, 0, 0.7)', 
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Button variant="contained" type="submit">Update</Button>
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Profile;
