'use client';
import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Authentication, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Posts from '../posts/Post';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSession, signOut, signIn } from "next-auth/react";

const demoTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
            },
        },
    },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => setPathname(String(path)),
    }), [pathname]);

    return router;
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

const authentication: Authentication = {
    signOut: () => signOut(),
    signIn: () => signIn(),
};

export default function DashboardLayoutBasic(props: any) {
    const router = useDemoRouter('/posts');
    const { data: session, status } = useSession();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(status === "loading");
    }, [status]);


    const NAVIGATION: Navigation = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            segment: 'posts',
            title: 'Posts',
            icon: <LayersIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Analytics',
        },
        {
            segment: 'reports',
            title: 'Reports',
            icon: <BarChartIcon />,
            children: [
                {
                    segment: 'sales',
                    title: 'Sales',
                    icon: <DescriptionIcon />,
                },
                {
                    segment: 'traffic',
                    title: 'Traffic',
                    icon: <DescriptionIcon />,
                },
            ],
        },
    ];

    const renderContent = () => {
        switch (router.pathname) {
            case '/':
                window.location.href = "/";
                return 0;
            case '/dashboard':
                return <h2>Welcome to the Dashboard!</h2>;
            case '/posts':
                if (session && session.user.role === "admin") {
                    return <Posts />;
                } else {
                    return (
                        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                            <Typography variant="h5" color="error">
                                You do not have permission to view this page.
                            </Typography>
                        </Box>
                    );
                }
            default:
                return <h2>Page not found</h2>;
        }
    };

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout>
                <PageContainer>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        renderContent()
                    )}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
