'use client'
import type { Metadata } from "next";
import AuthProvider from "./AuthProvider";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginBtn from "./LoginBtn";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: "ズオンのブログ",
};
const information = {
    name: "デム・ハイ・ズオン",
    age: 21,
    placeOfBirth: "ナム・デイン",
    career: "Webアプリケーション開発者", //Web Application Developer
    company: "NewIT株式会社（NewIT Inc.）",
    companySocialLink: "https://www.facebook.com/newit.co.jp/",
    school: "FPT"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = useTheme();
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="fixed">
                            <Toolbar variant="dense">
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx ={{ mr: 2, display: { xs: 'block', lg: 'none' }}}
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
                            <ToastContainer />
                            {children}
                        </div>
                        <footer className=" text-white py-4 fixed bottom-0 w-full"
                            style={{ background: '#1976d2' }}>
                            <div className="container mx-auto text-center">
                                <p className="text-sm">
                                    &copy; 2024 From PDO with love. All rights reserved.
                                </p>
                                <p className="text-sm">
                                    Designed by <a href="#" className="underline">アイン</a>
                                </p>
                            </div>
                        </footer>
                    </Box>
                </AuthProvider>
            </body>
        </html>
    );
}
