import { useEffect, useState } from 'react';
import './index.css'
import { Avatar } from '@chakra-ui/react';

interface ProfilePicProps {
  subject: string,
}

const ProfilePicComponent = ({ subject }: ProfilePicProps) => {
  
  return (
    <div className='flex h-full w-full justify-center'>
      {subject === 'none' ?
        <Avatar boxShadow={'rgb(0, 0, 0, 0.2) 0px 10px 6px'} bg='#3B3939' width={'90%'} height={'90%'} /> :
        <Avatar boxShadow={'rgb(0, 0, 0, 0.2) 0px 10px 6px'} name={subject} width={'90%'} height={'90%'} />
      }    
    </div>
  );
}

export default ProfilePicComponent;

