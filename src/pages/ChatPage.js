import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatMessages from '../components/ChatMessages';
import { Grid, Container, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Drawer from '../components/Drawer';
import ToggleButtonChats from '../components/ToggleButtonChats';

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };


  return (
    <div className='main-container' >
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} sx={{ backgroundColor: '#fbfefb', height:'100vh' }} >
            <Drawer state={state} toggleDrawer={toggleDrawer} />
            <div className='menu-header' >
              <MenuRoundedIcon sx={{marginLeft:'1rem', fontSize:'1.5rem', color:'#707579', cursor:'pointer' }} onClick={toggleDrawer(true)} />
              <Typography sx={{marginLeft:'1.5rem', fontSize:'1rem', fontWeight:'500' }} >Telegram</Typography>
              <SearchRoundedIcon sx={{marginLeft:'auto', fontSize:'1.5rem', color:'#707579'}} />
            </div>
            <div className='toggleButton' >
              <ToggleButtonChats />
            </div>
            <div className='chatlist'>
            <ChatList onSelectChat={setSelectedChatId} />
            </div>
          </Grid>
          <Grid item xs={12} md={9} >
            {selectedChatId && <ChatMessages chatId={selectedChatId} />}
          </Grid>
        </Grid>
    </div>
  );
};

export default ChatPage;
