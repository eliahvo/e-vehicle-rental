// tslint:disable: no-submodule-imports
import React from 'react';
import { Breadcrumbs, Drawer, IconButton, Menu, MenuItem, Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { DarkModeContext } from '../contexts/DarkModeContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import MapIcon from '@material-ui/icons/Map';
import TimelineIcon from '@material-ui/icons/Timeline';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      color: 'black',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
    title: {
      color: 'black',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);

interface AppBarHeaderProps {
  title?: string;
}

export const AppBarHeader = ({ title }: AppBarHeaderProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [navigationDrawer, setNavigationDrawer] = React.useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setNavigationDrawer(true);
  };

  const handleDrawerClose = () => {
    setNavigationDrawer(false);
  };

  const resetLocalStorage = () => {
    enqueueSnackbar(`Removed ${localStorage.length} entries from local storage!`, { variant: 'info' });
    localStorage.clear();
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: navigationDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: navigationDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={classes.title}>
            <Typography variant="h6">BRETSCH™</Typography>
            <Typography variant="h6" data-testid="title">
              {title}
            </Typography>
          </Breadcrumbs>
          <div>
            <IconButton className={classes.icons} onClick={handleMenuOpen} data-testid="menu">
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <DarkModeContext.Consumer>
                {({ darkMode, toggleDarkMode }) => (
                  <MenuItem onClick={toggleDarkMode}>
                    Darkmode:
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                  </MenuItem>
                )}
              </DarkModeContext.Consumer>
              <MenuItem onClick={resetLocalStorage}>Clear local storage</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: navigationDrawer,
          [classes.drawerClose]: !navigationDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: navigationDrawer,
            [classes.drawerClose]: !navigationDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* ADD REFS TO OTHER SITES BELOW */}
        <List>
          <ListItem
            button
            onClick={() => {
              history.push('/');
            }}
          >
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/booking');
            }}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={'Booking'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/prices');
            }}
          >
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary={'Prices'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              history.push('/my-profile');
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'My Profile'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/my-bookings');
            }}
          >
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary={'My Bookings'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              history.push('/settings');
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/logout');
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
