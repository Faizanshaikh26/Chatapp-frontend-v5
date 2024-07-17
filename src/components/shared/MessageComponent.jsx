
// import { Box, Typography } from '@mui/material';
// import moment from 'moment';
// import React, { memo } from 'react';
// import { fileFormat } from '../../lib/features';
// import RenderAttachment from './RenderAttachment';
// import { motion } from "framer-motion";

// function MessageComponent({ message, user }) {
//   const { sender, content, attachments = [], createdAt } = message;
//   const timeAgo = moment(createdAt).fromNow();
//   const sameSender = sender?._id === user?._id;


//   return (
//     <motion.div
//     initial={{ opacity: 0, x: "-100%" }}
//     whileInView={{ opacity: 1, x: 0 }}
//       style={{
//         alignSelf: sameSender ? 'flex-end' : 'flex-start',
//         backgroundColor: 'white',
//         color: 'black',
//         borderRadius: '5px',
//         padding: '0.5rem',
//         width: 'fit-content',
//       }}
//     >
//       {!sameSender && (
//         <Typography color={'#2694ab'} fontWeight={'600'} variant='caption'>
//           {sender.name}
//         </Typography>
//       )}
//       {content && <Typography>{content}</Typography>}
//       {attachments.length > 0 &&
//         attachments.map((item, index) => {
//           const url = item.url;
//           const fileType = fileFormat(url);

//           return (
//             <Box key={index}>
//               <a
//                 href={url}
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 download
//                 style={{ color: 'black' }}
//               >
//                 <RenderAttachment file={fileType} url={url} />
//               </a>
//             </Box>
//           );
//         })}
//       <Typography variant='caption' color={'text.secondary'}>
//         {timeAgo}
//       </Typography>
//     </motion.div>
//   );
// }

// export default memo(MessageComponent);

import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { memo } from 'react';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { motion } from "framer-motion";

function MessageComponent({ message, user }) {
  const { sender, content, attachments = [], createdAt } = message;
  const timeAgo = moment(createdAt).fromNow();
  const sameSender = sender?._id === user?._id;

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: sameSender ? '#d9fdd3' : '#ffffff',
        color: '#111b21',
        borderRadius: '10px',
        padding: '1rem',
        maxWidth: '80%',
        minWidth: '150px',
        margin: '0.5rem 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        wordWrap: 'break-word',
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          wordBreak: 'break-word',
        }}
      >
        {!sameSender && (
          <Typography color={'#2694ab'} fontWeight={'600'} variant='caption'>
            {sender.name}
          </Typography>
        )}
        {content && (
          <Typography variant='body1'>
            {content}
          </Typography>
        )}
        {attachments.length > 0 &&
          attachments.map((item, index) => {
            const url = item.url;
            const fileType = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  download
                  style={{ color: sameSender ? '#004056' : '#2C858D' }}
                >
                  <RenderAttachment file={fileType} url={url} />
                </a>
              </Box>
            );
          })}
        <Typography variant='caption' color={'text.secondary'}>
          {timeAgo}
        </Typography>
      </Stack>
    </motion.div>
  );
}

export default memo(MessageComponent);
