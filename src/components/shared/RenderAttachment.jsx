// import React from "react";
// import { transformImage } from "../../lib/features";
// import { FileOpen as FileOpenIcon } from "@mui/icons-material";

// function RenderAttachment({ file, url }) {
//   switch (file) {
//     case "video":
//       <video src={url} preload="none" width={"200px"} controls></video>;
//       break;

//     case "image":
//       <img
//         src={transformImage(url, 200)}
//         alt="Attachment"
//         height={"150px"}
//         style={{
//           objectFit: "contain",
//         }}
//         width={"200px"}
//       />;
//       break;

//     case "audio":
//       <audio src={url} preload="none" controls></audio>;
//       break;

//     default:
//       <FileOpenIcon />;
//       break;
//   }
// }

// export default RenderAttachment;

// import React from 'react';
// import { transformImage } from '../../lib/features';
// import { FileOpen as FileOpenIcon } from '@mui/icons-material';

// function RenderAttachment({ file, url }) {
//   switch (file) {
//     case 'video':
//       return <video src={url} preload='none' width={'200px'} controls></video>;

//     case 'image':
//       return (
//         <img
//           src={transformImage(url, 200)}
//           alt="Attachment"
//           height={'150px'}
//           style={{ objectFit: 'contain' }}
//           width={'200px'}
//         />
//       );

//     case 'audio':
//       return <audio src={url} preload='none' controls></audio>;

//     default:
//       return <FileOpenIcon />;
//   }
// }

// export default RenderAttachment;
import React from 'react';
import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

function RenderAttachment({ file, url }) {
  switch (file) {
    case 'video':
      return <video src={url} preload='none' width={'200px'} controls></video>;

    case 'image':
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          height={'150px'}
          style={{ objectFit: 'contain' }}
          width={'200px'}
        />
      );

    case 'audio':
      return <audio src={url} preload='none' controls></audio>;

    default:
      return <FileOpenIcon />;
  }
}

export default RenderAttachment;

