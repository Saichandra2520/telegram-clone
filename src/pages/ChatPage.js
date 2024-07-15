import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import { Grid, Container, Typography, IconButton, Avatar, Box } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Drawer from "../components/Drawer";
import ToggleButtonChats from "../components/ToggleButtonChats";
import { useMediaQuery } from "@mui/material";
import bgImg from '../images/background.png';
import bgImg2 from '../images/wallpaper.png'


const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState({id: null,
    name: null,
  });

  const [state, setState] = useState(false);
  const [dark, setDark] = useState(true);
  const isMobile = useMediaQuery("(max-width:900px)");

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const handleBackToList = () => {
    setSelectedChatId({
      id: null,
      name: null
    });
  };

  

  return (
    <Box sx={{
      margin: 0,
    
    backgroundSize: 'contain',
    
    
    height: '100vh',
    mixBlendMode:'soft-light',
    }} >
      
      <Grid container spacing={0} 
      sx={{
        height: "100vh",
        overflow:'hidden',
        
      }} >
        {!isMobile || !selectedChatId.id ? (
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{ color:'#ffffff',backgroundColor: `${dark ? '#292730' : 'var(--primary-color)'}`, height: "100vh" }}
          >
            <Drawer state={state} toggleDrawer={toggleDrawer} setDark={setDark} dark={dark} />
            <div className="menu-header">
              <MenuRoundedIcon
                sx={{
                  marginLeft: "1rem",
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                onClick={toggleDrawer(true)}
              />
              <Typography
                sx={{
                  marginLeft: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Telegram
              </Typography>
              <SearchRoundedIcon
                sx={{
                  marginLeft: "auto",
                  fontSize: "1.5rem",
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="toggleButton">
              <ToggleButtonChats dark={dark} />
            </div>
            <div className="chatlist">
              <ChatList onSelectChat={setSelectedChatId} dark={dark} />
            </div>
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          md={8.5}
          sx={{ display: selectedChatId ? "block" : "none", position:'relative' }}
        >
          <Box className="saichandra"
            sx={{
              backgroundImage: `url(${ dark? bgImg2 :bgImg})`,
              backgroundSize:'contain',
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: 0,
              mixBlendMode: 'soft-light',
              zIndex: '-1',
              
            }}>

          </Box>
          {selectedChatId.id != null ? (
            <div className="chat-container-wrapper">
            <ChatMessages chat={selectedChatId} isMobile={isMobile} handleBackToList={handleBackToList} dark={dark} />
            </div>
          ) : (
            <Typography></Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
