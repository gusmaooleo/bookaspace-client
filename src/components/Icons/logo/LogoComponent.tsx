import Image from 'next/image';
import './index.css'


const LogoComponent = () => {
  return (
    <a href=''>
      <Image src='/images/logo.svg' alt='logo' width={60} height={60}/>
    </a>
  );
}

export default LogoComponent;

