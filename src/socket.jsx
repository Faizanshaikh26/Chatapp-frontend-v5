import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { server } from './constants/config';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(server, {
      withCredentials: true,
    });
  }, []);
  
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };
