import SpaceRequestFormComponent from '@/components/Form/spaceRequestForm/SpaceRequestFormComponent';
import CalendarComponent from '@/components/Calendar/calendar/CalendarComponent';
import './styles.css'
import { useEffect } from 'react';
import { useUsers } from '@/hooks/useUser';

const Agenda = () => {
  const { setUsers } = useUsers();
  
  useEffect(() => {
    setUsers();
  }, [])

  return (
    <div className='page agenda-page gap-8'>
      <CalendarComponent />
      <SpaceRequestFormComponent />
    </div>
  );
}

export default Agenda;