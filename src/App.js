import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatPage from './pages/ChatPage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatPage />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
