import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {format} from "date-fns"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      maxWidth: `calc(100% - ${drawerWidth}px )`,
      paddingTop: theme.spacing(3),
      paddingLeft: 2,
      paddingRight: 2,
      paddingBottom: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title:{
        padding:theme.spacing(2)
    },
    appbar:{
      width:`calc(100% - ${drawerWidth}px )`
    },
    date:{
      flexGrow:1
    },
    avatar:{
      marginLeft:theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];
  return (
    <div className={classes.root}>
       <AppBar className={classes.appbar}
      elevation={0} >
        <Toolbar>
          <Typography className={classes.date} >
            Today is { format(new Date(), "do MMMM Y") }
          </Typography>
          <Typography>
            John Wick
          </Typography>
          <Avatar src="/john.png" className={classes.avatar} /> 
        </Toolbar>
      </AppBar>
    
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
    
      >
        <div className={classes.title} >
          <Typography variant="h5">Boogy Man Notes</Typography>
        </div>
        <List>
          {menuItems.map((item) => {
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                }}
                className={location.pathname === item.path ? classes.active:null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <div className={classes.page}>
     
        <div className={classes.toolbar} ></div>
        {children}</div>
    </div>
  );
};

export default Layout;
