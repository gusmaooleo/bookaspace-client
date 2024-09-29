import pt_br_locale from '@fullcalendar/core/locales/pt-br';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';


import './index.css'

interface CalendarProps {
  value: any,
  method: () => void,
}

const CalendarComponent = (/* { value, method }: CalendarProps */) => {
  
  return (
    <div className='flex calendar-overwrite' aria-hidden='true'>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        locale={pt_br_locale}
        events={[
          {title: 'evento', date: '2024-09-28', start: '2024-09-28T14:30:00', end: '2024-09-28T16:00:00'},
          {title: 'evento', date: '2024-09-28', start: '2024-09-28T14:30:00', end: '2024-09-28T16:00:00'},
          {title: 'evento', date: '2024-09-28', start: '2024-09-28T14:30:00', end: '2024-09-28T16:00:00'},
          {title: 'evento', date: '2024-09-28', allDay: true},
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        dateClick={(info) => {
          info.view.calendar.changeView('timeGridDay', info.dateStr);
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        dayMaxEventRows={3}
        // editable={true}
      />
    </div>
  );
}

export default CalendarComponent;

