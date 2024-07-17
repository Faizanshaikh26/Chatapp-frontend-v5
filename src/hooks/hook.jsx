import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NEW_MESSAGE } from "../constants/events";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mutate] = mutationHook();

  const excuteMutation=async(toastMessage,...args)=>{
    setisLoading(true)
    const toastId=toast.loading(toastMessage||'Updating data...')
    try {
      const res = await mutate(...args);
     
      if (res.data) {
        toast.success(res.data.message || "Updated data successfully...",{id: toastId});
     setData(res.data);
      } else {
        
        toast.error(res.error?.data?.message || "Unknown error occurred",{id: toastId});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Something went wrong',{id:toastId});
    }
    finally{
      setisLoading(false)
    }
  }
  return [
   excuteMutation ,isLoading,data
  ]
};



const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    // Register each event handler
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup each event handler
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]); // Re-run if socket or handlers change
};

export { useErrors, useAsyncMutation,useSocketEvents };
