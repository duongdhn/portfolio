'use client'
import React from 'react';
import { useTheme } from '@mui/material/styles';

interface Information {
  name: string;
  age: number;
  placeOfBirth: string;
  career: string;
  company: string;
  companySocialLink: string;
  school: string;
}

interface InforProps {
  information: Information;
}

export default function Infor({ information }: InforProps) {
  const theme = useTheme();
  
  return (
    <div className='mt-4 w-96 my-0 mx-auto block font-japanese'>
      <h1  className='font-bold fade-in' style={{ animationDelay: '0s' }}>私は<span style={{ color: theme.palette.primary.main }}>{information.name}</span>です。</h1>
      <p  className='font-bold fade-in' style={{ animationDelay: '1s' }}>今年 <span style={{ color: theme.palette.primary.main }}>{information.age}</span> 歳です。</p>
      <p  className='font-bold fade-in' style={{ animationDelay: '2s' }}><span style={{ color: theme.palette.primary.main }}>{information.placeOfBirth}</span>から来ましたです。</p>
      <p  className='font-bold fade-in' style={{ animationDelay: '3s' }}><span style={{ color: theme.palette.primary.main }}>{information.school}</span>の学生でした。</p>
      <p  className='font-bold fade-in' style={{ animationDelay: '4s' }}>キャリアは<span style={{ color: theme.palette.primary.main }}>{information.career}</span>です。</p>
      <p  className='font-bold fade-in' style={{ animationDelay: '5s' }}>
        <a href={information.companySocialLink} style={{ animationDelay: '6s' }}>
          <span className='font-bold fade-in underline' style={{ color: theme.palette.primary.main }}>{information.company}</span>
        </a>社員。
      </p>
    </div>
  );
}