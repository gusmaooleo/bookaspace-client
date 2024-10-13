import SpaceRequestFormComponent from '@/components/Form/spaceRequestForm/SpaceRequestFormComponent';
import CalendarComponent from '@/components/Calendar/calendar/CalendarComponent';
import './styles.css'
import { useEffect } from 'react';
import spaceStore from '@/hooks/useSpaceData';

const Agenda = () => {
  const setSpaces = spaceStore((state) => state.getSpaces)
  const getSpaces = spaceStore((state) => state.spaces)

  useEffect(() => {
    if (getSpaces.length === 0) {
      setSpaces()
      console.log('spaces loaded')
    }
  }, [])

  return (
    <div className='page agenda-page gap-8'>
      <CalendarComponent />
      <SpaceRequestFormComponent />
    </div>
  );
}

export default Agenda;