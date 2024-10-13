import { Avatar } from '@chakra-ui/react';
import './index.css'

interface ProfilePicProps {
  subject: string,
  not_shadow?: boolean,
}

const ProfilePicComponent = ({ subject, not_shadow }: ProfilePicProps) => {

  return (
    <div className='flex h-full justify-center'>
      {subject === 'none' ?
        <Avatar boxShadow={not_shadow ? '' : 'rgb(0, 0, 0, 0.2) 0px 10px 6px'} bg='#1e1e1e' width={'90%'} height={'90%'} /> :
        <Avatar boxShadow={not_shadow ? '' : 'rgb(0, 0, 0, 0.2) 0px 10px 6px'} name={subject} width={'90%'} height={'90%'} />
      }
    </div>
  );
}

export default ProfilePicComponent;

