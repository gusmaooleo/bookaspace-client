import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import './styles.css'

const Error = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <h2 className='mb-3'>Erro =(</h2>
      <p>Certifique-se de que você tem acesso a essa rota antes de prosseguir.</p>
      <div className='flex flex-row gap-2'>
        <Button marginTop={'4rem'} variant={'dark'} onClick={() => router.push('/login')}>/Login</Button>
        <Button marginTop={'4rem'} variant={'outline'} onClick={() => router.push('/agenda')}>Voltar</Button>
      </div>
    </div>
  );
}

export default Error;


