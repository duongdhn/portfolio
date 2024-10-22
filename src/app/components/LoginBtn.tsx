'use client';
import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

interface CustomSession {
  user: {
    name: string;
    email?: string; 
    image?: string; 
  };
}

export default function LoginBtn() {
  const { data: session }: { data: CustomSession | null } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (session) {
    return (
      <>
        <div>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NextLink href="/profile" passHref>
              <MenuItem>
                Profile
              </MenuItem>
            </NextLink>

            <NextLink href="/dashboard" passHref>
              <MenuItem>
                Dashboard
              </MenuItem>
            </NextLink>

            <MenuItem onClick={() => signOut()}>
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </>
    );
  }

  return (
    <>
      <NextLink href="#" passHref>
        <Button sx={{ color: '#fff', textDecoration: 'none' }} onClick={() => signIn()}>
          Sign In
        </Button>
      </NextLink>
    </>
  );
}
