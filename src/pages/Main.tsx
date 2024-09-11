import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const MainStyled = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    marginLeft: drawerWidth,
    height: '100vh',
    overflow: 'auto',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Main: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = React.useState<JSX.Element | null>(null);

    const handleListItemClick = (index: number) => {
        switch (index) {
            case 0:
                setSelectedComponent(<p>Bem-vindo ao componente!</p>);
                break;
            case 1:
                setSelectedComponent(<p>Conteúdo Retro</p>);
                break;
            default:
                setSelectedComponent(<p>Conteúdo padrão</p>);
                break;
        }
    };

    return (
        <Box sx={{
            height: '100vh', // Altura da viewport
            display: 'flex',
            flexDirection: 'column',
        }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        RetroQuest
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <DrawerHeader>
                    {/* <IconButton>
                        <ChevronLeftIcon />
                    </IconButton> */}
                </DrawerHeader>
                <Divider />
                <List>
                    {['Bem Vindo', 'Retro'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => handleListItemClick(index)}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <MainStyled>
                {selectedComponent}
            </MainStyled>
        </Box>
    );
}

export default Main;
