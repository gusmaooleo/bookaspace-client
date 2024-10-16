import SpaceRequestFormComponent from '@/components/Form/spaceRequestForm/SpaceRequestFormComponent';
import CalendarComponent from '@/components/Calendar/calendar/CalendarComponent';
import { useEffect } from 'react';
import { useUsers } from '@/hooks/useUser';
import './styles.css'

const Agenda = () => {
  const { setUsers } = useUsers();
  
  useEffect(() => {
    setUsers();
  }, [])

  return (
    <div className='page agenda-page gap-8'>
      <CalendarComponent />
      <div className='flex flex-col'>
        <h2 className='mb-6'>Solicitar reserva</h2>
        <SpaceRequestFormComponent />
      </div>
    </div>
  );
}

export default Agenda;