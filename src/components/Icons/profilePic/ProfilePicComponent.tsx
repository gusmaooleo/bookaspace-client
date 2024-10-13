import { Avatar } from '@chakra-ui/react';
import './index.css'

interface ProfilePicProps {
  subject: string,
  not_shadow?: boolean,
  border?: boolean,
}

const ProfilePicComponent = ({ subject, not_shadow, border }: ProfilePicProps) => {

  return (
    <div className='flex h-full justify-center'>
      {subject === 'none' ?
        <Avatar 
          border={ border ? '1px solid #1e1e1e' : 'none'} 
          boxShadow={not_shadow ? '' : 'rgb(0, 0, 0, 0.2) 0px 10px 6px'} 
          bg='#1e1e1e' 
          width={'90%'} 
          height={'90%'} 
        /> :
        <Avatar 
          border={ border ? '1px solid #1e1e1e' : 'none'} 
          boxShadow={not_shadow ? '' : 'rgb(0, 0, 0, 0.2) 0px 10px 6px'} 
          name={subject} 
          width={'90%'} 
          height={'90%'} 
        />
      }
    </div>
  );
}

export default ProfilePicComponent;

