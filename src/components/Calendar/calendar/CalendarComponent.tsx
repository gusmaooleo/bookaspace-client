import pt_br_locale from '@fullcalendar/core/locales/pt-br';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import './index.css'
import { calendarService } from '@/services/calendarService';

interface CalendarProps {
  value: any,
  method: () => void,
}

const CalendarComponent = (/* { value, method }: CalendarProps */) => {

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    calendarService.setSelectedDate({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }
  
  return (
    <div className='flex calendar-overwrite' aria-pressed='false'>
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
        select={handleDateSelect}
        selectMirror={true}
        dayMaxEvents={true}
        dayMaxEventRows={3}
      />
    </div>
  );
}

export default CalendarComponent;

