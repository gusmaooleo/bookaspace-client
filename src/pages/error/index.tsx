import { useRouter } from 'next/router';
import './styles.css'
import { Button } from '@chakra-ui/react';

const error = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <h2 className='mb-3'>Erro =(</h2>
      <p>Certifique-se de que você tem acesso a essa rota antes de prosseguir.</p>
      <Button marginTop={'4rem'} variant={'outline'} onClick={() => router.push('/agenda')}>Voltar</Button>
    </div>
  );
}

export default error;


