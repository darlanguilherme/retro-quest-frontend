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
import UserProfileCard from '../components/ProfileCard';
import BoardList from '../components/BoardSelect';
import Profile from '../components/Profile';
import Shop from '../components/Shop';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Ranking from '../components/Ranking';
import Reward from '../components/Reward';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { getUserById } from '../services/apiService';
import { formatLvl, getMaxLevel } from '../utils/Utils';
import { toast } from 'react-toastify';

type IconKey = 'home' | 'history' | 'leaderboard' | 'star' | 'store' | 'person' | 'exit_to_app';

const menuItems: { name: string, icon: IconKey }[] = [
    { name: 'Bem Vindo', icon: 'home' },
    { name: 'Retro', icon: 'history' },
    { name: 'Ranking', icon: 'leaderboard' },
    { name: 'Recompensas', icon: 'star' },
    { name: 'Loja', icon: 'store' },
    { name: 'Editar Perfil', icon: 'person' },
    { name: 'Logout', icon: 'exit_to_app' },
];

const iconMap: Record<IconKey, JSX.Element> = {
    home: <HomeIcon />,
    history: <HistoryIcon />,
    leaderboard: <LeaderboardIcon />,
    star: <StarIcon />,
    store: <StoreIcon />,
    person: <PersonIcon />,
    exit_to_app: <ExitToAppIcon />,
};

const drawerWidth = 190;

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
    marginTop: theme.spacing(6),
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
    const { user, setUser } = useUser();
    const [selectedComponent, setSelectedComponent] = React.useState<JSX.Element | null>(null);

    const handleListItemClick = (index: number) => {
        switch (index) {
            case 0:
                setSelectedComponent(<p>Bem-vindo ao componente!</p>);
                break;
            case 1:
                setSelectedComponent(<BoardList />);
                break;
            case 2:
                setSelectedComponent(<Ranking />);
                break;
            case 3:
                setSelectedComponent(<Reward userLevel={3} userAvatar='as' userName='Darlan' />);
                break;
            case 4:
                setSelectedComponent(<Shop />);
                break;
            case 5:
                setSelectedComponent(<Profile />);
                break;
            case 6:
                localStorage.removeItem('token');
                setSelectedComponent(<Navigate to="/login" />);
                break;
            default:
                setSelectedComponent(<p>Conteúdo padrão</p>);
                break;
        }
    };

    const getUserInformation = async () => {
        try {
            let user = await getUserById();
            setUser(user);
            toast.success('Perfil atualizado com sucesso!');
        } catch (error) {
            toast.error('Erro ao atualizar perfil.');

        }
    }

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f5f5f5'
        }} >
            <CssBaseline />
            <AppBar position="fixed" >
                <Toolbar sx={{ minHeight: '50px !important', backgroundColor:'#5478F0' }}>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h4" noWrap component="div" sx={{ fontSize:'31px',flexGrow: 1, textAlign: 'center' }}>
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
                <DrawerHeader sx={{ minHeight: '205px !important' }}>

                    <UserProfileCard
                        avatarSrc={user.avatar?.path}
                        nickname={user.nickname}
                        level={formatLvl(user.experience)}
                        experience={user.experience}
                        maxExperience={getMaxLevel(user.experience)}
                        coins={user.coins}
                        onRefresh={() => getUserInformation()}
                    />
                </DrawerHeader>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton sx={{ paddingLeft: '20  px' }} onClick={() => handleListItemClick(index)}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {iconMap[item.icon]}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <MainStyled sx={{ marginTop: '50px !important' }}>
                {selectedComponent}
            </MainStyled>
        </Box >
    );
}

export default Main;
