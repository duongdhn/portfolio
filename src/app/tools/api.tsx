'use client';

import axios from 'axios';
import { getSession } from 'next-auth/react';

const useAxiosInstance = () => {

  const axiosInstance = axios.create({
    baseURL: 'https://67173025b910c6a6e026df99.mockapi.io/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session && session.user.accessToken) {
        config.headers['Authorization'] = `Bearer ${session.user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;