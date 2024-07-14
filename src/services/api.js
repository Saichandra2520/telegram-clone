import axios from 'axios';

const API_URL = 'https://devapi.beyondchats.com/api';

export const getAllChats = (page = 1) => {
  return axios.get(`${API_URL}/get_all_chats?page=${page}`)
    .then(response => {
    
      return response.data.data;
    });
};

export const getChatMessages = (chatId) => {
  return axios.get(`${API_URL}/get_chat_messages?chat_id=${chatId}`);
};

export const getRecentMesage = (chatId) =>{
  return axios.get(`${API_URL}/get_recent_message?chat_id=${chatId}`);
}
