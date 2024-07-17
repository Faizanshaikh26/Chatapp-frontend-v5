// import React from 'react'
// import Applayout from '../components/layout/Applayout'
// import { Box, Typography } from '@mui/material'

// function Home() {
//   return (
// <Box bgcolor={'rgba(247,247,247,1)'} height={'100%'}>
// <Typography p={'2rem'} variant='h5'>Select a friend to chat</Typography>
// </Box>
//   )
// }

// export default Applayout()(Home)

import React from 'react';
import Applayout from '../components/layout/Applayout';

function Home() {
  return (
    <div className="bg-[#F7F7F7] text-[#504E4E] h-full flex flex-col justify-center items-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to ChatApp</h1>
        <h5 className="text-lg mb-4">Select a friend to start chatting</h5>
        <p className="text-base mb-6">
          Our chat application allows you to send and receive messages instantly. Connect with your friends and enjoy real-time conversations.
        </p>
     
      </div>
    </div>
  );
}

export default Applayout()(Home);

