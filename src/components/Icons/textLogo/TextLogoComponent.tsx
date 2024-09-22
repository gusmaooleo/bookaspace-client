import Image from 'next/image';
import './index.css'

const TextLogoComponent = () => {
  return (
    <Image src='images/text-logo.svg' alt='text-logo' width={70} height={70} className='text-logo-c' />
  );
}

export default TextLogoComponent;

