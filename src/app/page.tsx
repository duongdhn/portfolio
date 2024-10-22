'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Infor from './components/Infor';
import LoginBtn from './components/LoginBtn';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

const information = {
  name: "デム・ハイ・ズオン",
  age: 21,
  placeOfBirth: "ナム・デイン",
  career: "Webアプリケーション開発者", //Web Application Developer
  company: "NewIT株式会社（NewIT Inc.）",
  companySocialLink: "https://www.facebook.com/newit.co.jp/",
  school: "FPT"
}

export default function DenseAppBar() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'block', lg: 'none' }}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              <Link href="/" >デム・ハイ・ズオン</Link>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <LoginBtn />
          </Box>
        </Toolbar>
      </AppBar>
      <div className='lg:mx-4 mt-20'>
        <Stack spacing={2}
          sx={{
            alignItems: 'center'
          }}>
          <Avatar
            alt="ズオン"
            src="/static/images/avatar/avatar.png"
            sx={{
              width: 384,
              height: 350,
              overflow: 'hidden',
              borderRadius: 0,
              display: "block",
              margin: "0 auto"
            }}
            imgProps={{
              style: {
                objectFit: 'contain',
              },
            }}
          />
        </Stack>
        <Infor information={information} />
      </div>
      <footer className=" text-white py-4 fixed bottom-0 w-full"
        style={{ background: theme.palette.primary.main }}>
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 From PDO with love. All rights reserved.
          </p>
          <p className="text-sm">
            Designed by <a href="#" className=" underline">アイン</a>
          </p>
        </div>
      </footer>
    </Box>
  );
}
