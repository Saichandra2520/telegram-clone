import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";
import { Grid, Container, Typography, IconButton, Avatar } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Drawer from "../components/Drawer";
import ToggleButtonChats from "../components/ToggleButtonChats";
import { useMediaQuery } from "@mui/material";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState({id: null,
    name: null,
  });

  const [state, setState] = useState(false);
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
    <div className="main-container">
      <Grid container spacing={0}>
        {!isMobile || !selectedChatId.id ? (
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{ backgroundColor: "#fbfefb", height: "100vh" }}
          >
            <Drawer state={state} toggleDrawer={toggleDrawer} />
            <div className="menu-header">
              <MenuRoundedIcon
                sx={{
                  marginLeft: "1rem",
                  fontSize: "1.5rem",
                  color: "#707579",
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
                  color: "#707579",
                }}
              />
            </div>
            <div className="toggleButton">
              <ToggleButtonChats />
            </div>
            <div className="chatlist">
              <ChatList onSelectChat={setSelectedChatId} />
            </div>
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          md={8.5}
          sx={{ display: selectedChatId ? "block" : "none" }}
        >
          <div className='background-img'></div>
          {selectedChatId.id != null ? (
            <ChatMessages chat={selectedChatId} isMobile={isMobile} handleBackToList={handleBackToList}/>
          ) : (
            <Typography></Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatPage;
