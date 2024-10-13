import './styles.css'

const error = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <h2 className='mb-3'>Erro =(</h2>
      <p>Certifique-se de que você está logado ou tem acesso a essa rota antes de prosseguir.</p>
    </div>
  );
}

export default error;


