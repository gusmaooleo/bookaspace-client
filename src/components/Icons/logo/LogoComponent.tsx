import Image from 'next/image';
import './index.css'


const LogoComponent = () => {
  return (
    <a href=''>
      <Image src='/images/logo.svg' alt='logo' width={40} height={40}/>
    </a>
  );
}

export default LogoComponent;

