import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getChatMessages } from '../services/api';
import { CircularProgress, Typography, Box, TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Avatar } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';

const ChatMessages = ({ chat,isMobile,handleBackToList,dark }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [topTime, setTopTime] = useState(null);


  const scrollTimeoutRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    fetchMessages(chat.id);
  }, [chat.id]);

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
    setNewMessage('');
  };


  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
  
  
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  
    // Using requestAnimationFrame for smoother updates
    const updateTopTime = () => {
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
  
      // Clear the top time after 1 second if no message is in view
      scrollTimeoutRef.current = setTimeout(() => setTopTime(null), 1000);
    };
  
    requestAnimationFrame(updateTopTime);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener('scroll', handleScroll);
    console.log("Hello")
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
    <React.Fragment>{ chat.id && (
        
      // Heading section
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: `${dark ? '#292730' : 'var(--primary-color)'}`,
        margin: 0,
        padding: '.5rem',
        zIndex: 4,
      }} >
        <div className='item-1'>
        <IconButton onClick={handleBackToList} >
          <ArrowBackIcon sx={{color:'#ffffff'}}/>
        </IconButton>
        <Avatar sx={{ bgcolor: deepPurple[500], marginRight:'.8rem', width:'36px', height:'36px', fontSize:'14px' }}  >{chat.name?.substring(0,1)}</Avatar>
        <Typography sx={{ fontSize:'1.1rem',
          fontWeight:'450',
          color:'#ffffff',
         }} >{chat.name ? chat.name:'Anonymous'}</Typography>
        </div>
        <div className='item-2'>
          <LocalPhoneRoundedIcon sx={{color:'#ffffff'}} />
          <MoreVertRoundedIcon sx={{color:'#ffffff'}} />
        </div>
      </Box>
    )}
    <Box display="flex" flexDirection="column" height="100vh" sx={{
      padding:'1px 5px 3rem 5px'
    }} >
      
      <Box flexGrow={1} overflow="auto" mb={2} ref={chatContainerRef} sx={{
        position:'relative'
      }} >
        <div>
          
        </div>
      {topTime && (
        <Typography
        variant="caption" 
        
        color="#ffffff" 
        sx={{
          backgroundColor:'rgba(0, 0, 0, 0.2)',
          textAlign:'center',
          padding: '4px 6px',
          borderRadius: '10px',
          fontSize:'10px',
          left: '50%',
          position:'sticky',
          top:'20px',
          zIndex:10,
        }}
        >
          {topTime}
        </Typography>
      )}
      {/* Messages section */}
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
                      backgroundColor:'#00000033',
                      marginLeft:'auto',
                      marginRight:'auto',
                      textAlign:'center',
                      width:'fit-content',
                      padding: '4px 6px',
                      borderRadius: '10px',
                      fontSize:'10px',
                      position: 'sticky',
                      top:'20px',
                      zIndex: '10',
                      
                    }}
                    >
                  {formatDate(message.created_at)}
                </Typography>
              )}
          <Box id={index} mb={2} display="flex" justifyContent={message.sender_id == 1 ? 'flex-start' : 'flex-end' } sx={{maxWidth: '600px',
              margin: 'auto',

          }}>
            <Box
              p={2}
              borderRadius={message.sender_id == 1 ? "16px 16px 14px 0px" : "16px 16px 0px 16px"}
              bgcolor={message.sender_id == 1 ? dark ? '#151418' : '#ffffff' : dark? '#8774e1' :'#e3fee0'}
              maxWidth="85%"
              fontSize={"12px"}
              sx={{
                lineHeight:'21px',
                
                position:'relative',
                display:'flex',
                justifyContent:'flex-start',
                padding: '5px 5px 5px 10px',
                margin: '4px 8px 5px',
                whiteSpace: 'pre-wrap'
              }}
              
            >
              <Typography variant="body2" sx={{
                maxWidth:'570px',
                fontSize:'16px',
                color: `${dark? '#ffffff' : '#000000'}`,
                fontWeight:'400',
                lineHeight: 1.3125,
                
               }} >{message.message}
               <span className='time'>
                  {dayjs(message.created_at).format('h:mm A')}
                </span></Typography>
              
            </Box>
          </Box>
          </React.Fragment>
         );
        })}
        <div ref={messageEndRef} />
      </Box>
      <Box className="message-sender" display="flex" mt="auto" 
        sx={{
          width:'100%',
          maxWidth:'650px',
          position:'sticky',
          bottom:'0',
          marginLeft:'auto',
          marginRight:'auto',
          display:'flex',
          gap:'1rem'
        }}>
        <TextField
          autoFocus={true}
          sx={{
            border:'none',
            outline:'none',
            bgcolor:'#ffffff',
            borderRadius:'20px 20px 20px 20px',
            "& fieldset": { border: 'none' },
            
          }}
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
        <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{borderRadius:'50%', width:'50px',backgroundColor:`${dark? '#8774e1' :'#229ED9'}`}}>
          <MicRoundedIcon sx={{fontSize:'2rem',backgroundColor:`${dark? '#8774e1' :'#229ED9'}`}} />
        </Button>
      </Box>
    </Box>
    </React.Fragment>
    );
};

export default ChatMessages;
