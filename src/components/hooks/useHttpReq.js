import React, { useState, useCallback } from 'react';

const useHttpReq = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendHttpReq = useCallback(async (config, applyData) => {
    setError(null);
    setIsLoading(true);
    try {
      const request = await fetch(config.url);
      if(!request.ok) {
        throw new Error('Failed to send a HTTP request');
      }
      const data = await request.json();
      applyData(data);
    }
    catch(err) {
      console.error(err);
      setIsLoading(false);
      setError(err.message || 'Something went wrong');
    }
    setIsLoading(false);
  }, []);
  
  return {
    isLoading: isLoading,
    error: error,
    sendHttpReq: sendHttpReq
  }

}   

export default useHttpReq;