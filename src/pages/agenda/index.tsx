import SpaceRequestFormComponent from '@/components/Form/spaceRequestForm/SpaceRequestFormComponent';
import CalendarComponent from '@/components/Calendar/calendar/CalendarComponent';
import './styles.css'

const Agenda = () => {
  return (
    <div className='page agenda-page gap-8'>
      <CalendarComponent />
      <SpaceRequestFormComponent />
    </div>
  );
}

export default Agenda;