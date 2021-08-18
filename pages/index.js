import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    AppBar, Avatar,
    ClickAwayListener, Collapse,
    Drawer,
    Grow, Hidden, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList,
    Paper,
    Popper,
    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Home from '../src/home.svg';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const AppBarHeight = 80;
const PrimaryColor = '#4B7AE8';

const useStyles = makeStyles((theme)=>({
    appbar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        boxShadow: 'none',
        height: AppBarHeight,
        zIndex: theme.zIndex.drawer + 1,
    },
    tabImage: {
        height: '25px',
        width: 'auto',
        marginTop: '12px',
        marginBottom: '3px'
    },
    list: {
        marginTop: AppBarHeight,
        width: '210px',
    },
    drawer: {
        flexShrink: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        backgroundColor: '#73A0EC33',
    },
}));

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
        height: AppBarHeight,
    },
    indicator: {
        backgroundColor: PrimaryColor,
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        // minWidth: 72,
        fontSize: '18px',
        fontWeight: 500,
        color: '#87849A',
        // marginRight: theme.spacing(4),
        borderRight: '1px solid #EDEDED',
        borderLeft: '1px solid #EDEDED',
        '&:hover': {
            color: '#131216',
            opacity: 1,
        },
        '&$selected': {
            color: '#131216',
            fontWeight: 800,
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const Index = () => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = React.useState(0);

    const [openMenu, setOpenMenu] = React.useState(false);

    const handleClick = () => {
        setOpenMenu(!openMenu);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const menu = [
        {
            name: 'Home',
            src: Home,
        },
        {
            name: 'Home',
            src: Home,
        },
        {
            name: 'Home',
            src: Home,
        },
        {
            name: 'Home',
            src: Home,
        },
    ];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appbar}>
        <Box display={'flex'} justifyContent={'space-between'} ml={4}>
            <Hidden mdUp>
                <IconButton onClick={()=>{
                    setOpenDrawer(!openDrawer)
                }}>
                    <img src={Home} alt={'More'}/>
                </IconButton>
            </Hidden>
            <Box height={AppBarHeight} display={'flex'} alignItems={'center'}>
                <Typography>
                    SCxSC Fintech
                    <br/>
                    Conference 2021
                </Typography>
            </Box>
            <Hidden mdUp>
                <Box />
            </Hidden>
            <Hidden smDown>
                <Box display={'flex'}>
                    <AntTabs value={value} onChange={handleChange}>
                        {
                            menu.map((each)=> {
                                return (
                                    <AntTab label={
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <img src={each.src} alt={each.name} className={classes.tabImage}/>
                                            <Typography>
                                                {each.name}
                                            </Typography>
                                        </Box>
                                    }/>
                                )
                            })
                        }
                        <AntTab label={
                            <Box display={'flex'} flexDirection={'column'}>
                                <img src={Home} alt={'More'} className={classes.tabImage}/>
                                <Typography>
                                    {'More'}
                                </Typography>
                            </Box>
                        }/>
                    </AntTabs>
                    <Box p={1} px={4}  ref={anchorRef}
                         aria-controls={open ? 'menu-list-grow' : undefined}
                         aria-haspopup="true"
                         onClick={handleToggle}>
                        <IconButton>
                            <Avatar src={''} alt={'t'} />
                        </IconButton>
                    </Box>
                </Box>
            </Hidden>
        </Box>
      </AppBar>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow">
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
        {/*<Box bgcolor="text.secondary" height={'130px'}>*/}
        {/*</Box>*/}
        <Drawer className={classes.drawer} open={openDrawer} onClose={()=>{ setOpenDrawer(false) }} variant={'persistent'}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.list}
            >
                <ListItem button>
                    <ListItemIcon>
                        <img src={Home} alt={'More'}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <img src={Home} alt={'More'} />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {openMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <img src={Home} alt={'More'} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <img src={Home} alt={'More'} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <img src={Home} alt={'More'} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    </React.Fragment>
  );
};

export default Index;
