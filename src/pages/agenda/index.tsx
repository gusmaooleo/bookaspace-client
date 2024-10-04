import CalendarComponent from '@/components/Calendar/calendar/CalendarComponent';
import SpaceRegisterFormComponent from '@/components/Form/spaceRegisterForm/SpaceRegisterFormComponent';
import './styles.css'

const Agenda = () => {
  return (
    <div className='page agenda-page gap-8'>
      <CalendarComponent />
      <SpaceRegisterFormComponent />
    </div>
  );
}

export default Agenda;