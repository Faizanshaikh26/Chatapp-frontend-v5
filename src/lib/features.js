// const fileFormat = (url) => {
//   const fileExtension = url.split(".").pop();
//   if (
//     fileExtension === "mp4" ||
//     fileExtension === "webm" ||
//     fileExtension === "ogg"
//   )
//     return "video";

import moment from "moment";

//   if (fileExtension === "mp3" || fileExtension === "wav") return "audio";

//   if (
//     fileExtension === "png" ||
//     fileExtension === "jpg" ||
//     fileExtension === "jpeg" ||
//     fileExtension === "gif"
//   )
//     return "image";

//   return "file";
// };

// export {fileFormat}

const fileFormat = (url='',width=100) => {
    const extensionToFormat = {
      'mp4': 'video',
      'webm': 'video',
      'ogg': 'video',
      'mp3': 'audio',
      'wav': 'audio',
      'png': 'image',
      'jpg': 'image',
      'jpeg': 'image',
      'gif': 'image',
    };
  
    const fileExtension = url.split('.').pop().toLowerCase();
    return extensionToFormat[fileExtension] || 'file';


  };

  
  const transformImage=(url='',width)=>url


  const getLast70Days=() =>{
const currentDate =moment();
const last70Days=[];

for (let i = 0; i<7; i++) {
  const dayDate=currentDate.clone().subtract(i,'days');

  const dayName=dayDate.format("ddd")
  last70Days.unshift(dayName);
  
}
return last70Days
  }
  

  const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get)
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : null;
    else localStorage.setItem(key, JSON.stringify(value));
  };
  
  export { fileFormat,transformImage ,getLast70Days,getOrSaveFromStorage};
  