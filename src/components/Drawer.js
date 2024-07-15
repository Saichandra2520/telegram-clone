import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import profileImg from '../images/profile.jpeg'
import { Avatar, Typography } from '@mui/material';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Drawer({state, toggleDrawer, setDark, dark}) {
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,backgroundColor: `${dark ? '#212121' : ''}`, height:'100vh' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      
    >
      <Box sx={{
        display: 'flex',    
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1rem .6rem 1rem',
        backgroundColor: `${dark ? '#343333' : 'var(--primary-color)'}`,
        color: '#ffffff',
      }}>
      
        <div className='drawer-header__profile'>
          <Avatar src={profileImg} sx={{ width: '48px', height:'48px'}} />
          <Typography sx={{fontWeight:'450', fontSize:'15px',marginTop:'8px'}} >Sai Chandra</Typography>
          <p className='profile-name'>+91 8341277302</p>
        </div>
        <ModeNightRoundedIcon  onClick={() => setDark(!dark)}  sx={{display: `${dark ? "none" : "block"}`}} />
        <LightModeIcon onClick={() => setDark(!dark)} sx={{display: `${dark ? "block" : "none"}`}}/>
      </Box>
      <List sx={{
        backgroundColor: `${dark ? '#212121' : ''}`,
      }} >
        <ListItem disablePadding  >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlinedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'My Profile'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PeopleOutlinedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'New Group'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <PersonOutlineRoundedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Contacts'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalPhoneOutlinedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Calls'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessibilityNewRoundedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'People Nearby'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkBorderRoundedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Saved Messages'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Settings'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonAddOutlinedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Invite Friends'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <HelpOutlineRoundedIcon sx={{color:'#5a5858'}} />
              </ListItemIcon>
              <ListItemText primary={'Telegram Features'} primaryTypographyProps={{fontWeight:'450', fontSize:'14px', color:`${dark ? '#efebeb' : '#000000db'}`}}/>
            </ListItemButton>
          </ListItem>
      </List>
     
     
    </Box>
  );

  return (
    <div>
     
        <React.Fragment >
          <SwipeableDrawer
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    
    </div>
  );
}
