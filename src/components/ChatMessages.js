import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getChatMessages } from '../services/api';
import { CircularProgress, Typography, Box, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import dayjs from 'dayjs';

const ChatMessages = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [topTime, setTopTime] = useState(null);

  const scrollTimeoutRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    fetchMessages(chatId);
  }, [chatId]);

  const fetchMessages = (chatId) => {
    setLoading(true);
    getChatMessages(chatId)
      .then((response) => {
        console.log(response.data.data);
        setMessages(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // Add logic to send message to the server here

    // For now, we'll just append the message to the local state
    // setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'You' }]);
    setNewMessage('');
  };


  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    const children = Array.from(chatContainer.children);

    for (const child of children) {
      const rect = child.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const index = child.id;
        
        const message = messages[index];
        if (message) {
          setTopTime(dayjs(message.created_at).format('h:mm A'));
          
        }
        break;
      }
    }
    scrollTimeoutRef.current = setTimeout(() => setTopTime(null), 1000);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener('scroll', handleScroll);

    return () => {
      chatContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [messages]);

  

  const formatDate = (timestamp) => {
    const date = dayjs(timestamp);
    if (date.isSame(dayjs(), 'day')) {
      return 'Today';
    }
    return date.format('DD MMMM');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh" p={2}>
      
      <Box flexGrow={1} overflow="auto" mb={2} ref={chatContainerRef} sx={{position:'relative'}}>
      {topTime && (
        <Typography
        variant="caption" 
        color="#ffffff" 
        sx={{
          backgroundColor:'rgba(0, 0, 0, 0.2)',
          marginLeft:'auto',
          marginRight:'auto',
          textAlign:'center',
          width:'fit-content',
          padding: '4px 6px',
          borderRadius: '10px',
          fontSize:'10px',
          left: '50%',
          position:'fixed',
          top:'20px',
          zIndex:100,
        }}
        >
          {topTime}
        </Typography>
      )}
        {messages.map((message,index) => {
          
          const showDate = index === 0 || !dayjs(message.created_at).isSame(messages[index - 1].created_at, 'day');
          return(
          <React.Fragment key={message.id}>
            {showDate && (
                <Typography 
                    variant="caption" 
                    display='block' 
                    color="#ffffff" 
                    sx={{
                      backgroundColor:'rgba(0, 0, 0, 0.2)',
                      marginLeft:'auto',
                      marginRight:'auto',
                      textAlign:'center',
                      width:'fit-content',
                      padding: '4px 6px',
                      borderRadius: '10px',
                      fontSize:'10px',
                    }}
                    >
                  {formatDate(message.created_at)}
                </Typography>
              )}
          <Box id={index} mb={2} display="flex" justifyContent={message.sender_id == 1 ? 'flex-start' : 'flex-end' }>
            <Box
              p={2}
              borderRadius={message.sender_id == 1 ? "16px 16px 14px 0px" : "16px 16px 0px 16px"}
              bgcolor={message.sender_id == 1 ? '#ffffff' : 'grey.300'}
              maxWidth="60%"
              fontSize={"12px"}
              sx={{
                lineHeight:'21px',
                color: '#000000',
                position:'relative',
                display:'flex',
                justifyContent:'flex-start',
                padding: '2px 5px 5px 10px',
                margin: '4px 8px 5px',
                whiteSpace: 'pre-wrap'
              }}
              
            >
              <Typography variant="body2" sx={{
                maxWidth:'570px',
                fontSize:'16px',
                color:'#000000',
                fontWeight:'400',
                lineHeight: 1.3125,
                
               }}  >{message.message}</Typography>
              <Typography
                    color="textSecondary"
                    style={{
                      position: 'relative',
                      fontSize: '11px',
                      display: 'flex',
                      maxWidth:'85px',
                      marginLeft: '5px',
                      alignSelf: 'end',
                      bottom: '-3px'
                    }}
                  >
                    {dayjs(message.created_at).format('h:mm A')}
              </Typography>
            </Box>
          </Box>
          </React.Fragment>
         );
        })}
        <div ref={messageEndRef} />
      </Box>
      <Box display="flex" mt="auto">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} startIcon={<Send />}>
          Send
        </Button>
      </Box>
    </Box>);
};

export default ChatMessages;
