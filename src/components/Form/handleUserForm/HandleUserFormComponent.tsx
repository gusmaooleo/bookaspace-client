import './index.css'

interface HandleUserFormProps {
  value: any,
  method: () => void,
}

const HandleUserFormComponent = ({ value, method }: HandleUserFormProps) => {
  return (
    <>
      <p>HandleUserFormComponent works!</p>
    </>
  );
}

export default HandleUserFormComponent;

