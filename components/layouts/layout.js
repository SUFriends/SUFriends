
import { useState } from 'react';
import { styled, AppBar, Box, Toolbar, Container, Typography, Button, Tabs, Tab } from '@mui/material';
import Image from 'next/image';
import Head from 'next/head';
import logo from '../../public/logo.png';
import { useRouter } from 'next/router';
import Link from 'next/link';

const navItems = [{ title: 'Proposals', route: 'proposals' }, { title: 'Members', route: 'members' }, { title: 'Treasury', route: 'treasury' }];
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-center',
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 86,
    },
}));

function LinkTab({ href, ...otherProps }) {
    const router = useRouter();
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
                router.push(href)
            }}
            {...otherProps}
        />
    );
}

export default function Layout({ children }) {
    const { pathname } = useRouter();
    let currentPathTabIndex;
    navItems.forEach((e, i) => '/' + e.route === pathname ? currentPathTabIndex = i : null)
    const [value, setValue] = useState(currentPathTabIndex);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Head>
                    <title>SUFriends</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <AppBar component="nav" color='transparent' >
                    <Container>
                        <StyledToolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Image
                                alt="Logo"
                                src={logo}
                                placeholder="blur"
                                width={200}
                            />
                            <Box sx={{ ml: 2, mt: 1, }}>
                                <Tabs value={value} onChange={handleChange}>
                                    {navItems.map((item) => (
                                        <LinkTab key={item.route} label={item.title} href={'/' + item.route} sx={{ mx: 1 }} variant="text" size='large' />
                                    ))}
                                </Tabs>
                            </Box>

                            <Button sx={{ mx: 1, mt: 1 }} variant="contained" size='large'>
                                Connect Wallet
                            </Button>
                        </StyledToolbar>
                    </Container>
                </AppBar>
                <Container component="main" sx={{ p: 5 }}>
                    <Toolbar />
                    <Container>{children}</Container>
                </Container>
            </Box>

        </>
    )
}