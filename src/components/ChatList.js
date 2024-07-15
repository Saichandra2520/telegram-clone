import React, { useEffect, useState } from "react";
import { getAllChats } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import dayjs from "dayjs";

const ChatList = ({ onSelectChat, onSelectedName,dark }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllChats()
      .then((response) => {
        console.log(response.data);
        setChats(response.data.sort((a, b) => b.updated_at - a.updated_at));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const formatDate = (timestamp) => {
    const date = dayjs(timestamp);
    if (date.isSame(dayjs(), "day")) {
      return "Today";
    }
    return date.format("MMMM D, YYYY");
  };

  const getDate = (date) => {
    const dateObj = new Date(date);

    return dateObj.getDate();
  };

  let classNameHolder = ["#5CC85E","#229ED9","#df3f40"];

  return (
    <List sx={{ overflow: "auto", backgroundColor: `${ dark ? '#151418' : '' }`, color: `${ dark ? '' : '#151418'}`  }}>
      {chats &&
        chats.map((chat) => (
          <ListItem
            button
            key={chat.created_by}
            onClick={() => {
              onSelectChat({ id: chat.id, name: chat.creator.name });
            }}
            sx={{ height: "72px", display: "flex", alignItems: "center" }}
          >
            <Avatar
              
              sx={{
                bgcolor: classNameHolder[Math.floor(Math.random() * 3)],
                marginRight: ".8rem",
                width: "52px",
                height: "52px",
              }}
            >
              {chat.creator.name?.substring(0, 1)}
            </Avatar>
            <div className="chatlist-heading-text">
              <ListItemText
                primary={chat.creator.name ? chat.creator.name : "Anonymous"}
                sx={{ margin: "0", fontWeight: "700" ,color: `${ dark ? '#ffffff' : ''}` }}
                primaryTypographyProps={{ fontWeight: "450" }}
              />
              <p>{chat.status}</p>
            </div>
            <div className="chatlist-time">
              <p>
                {dayjs().date() == getDate(chat.updated_at)
                  ? dayjs(chat.updated_at).format("h:mm A")
                  : dayjs(chat.updated_at).format("DD MMM")}
              </p>
            </div>
          </ListItem>
        ))}
    </List>
  );
};

export default ChatList;
