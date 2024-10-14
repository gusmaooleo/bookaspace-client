import pt_br_locale from '@fullcalendar/core/locales/pt-br';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateSelectArg, EventInput } from '@fullcalendar/core/index.js';
import { calendarService } from '@/services/calendarService';
import { useEffect, useState } from 'react';
import { useRequest } from '@/hooks/useRequest';
import { format } from 'date-fns';
import './index.css'

const CalendarComponent = () => {
  const [requestsList, setRequestsList] = useState<EventInput[]>()
  const { getRequests } = useRequest();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    calendarService.setSelectedDate({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }

  useEffect(() => {
    let events: EventInput[] = [] 
    getRequests.map((obj) => {
      if (obj.status === 'APPROVED' || obj.status === 'PENDING') {
        const event: EventInput = {
          'title': obj.title,
          'start': format(obj.dateTimeStart, "yyyy-MM-dd'T'HH:mm:ss"),
          'end': format(obj.dateTimeEnd, "yyyy-MM-dd'T'HH:mm:ss"),
          'color': obj.status === 'APPROVED' ?  '#68d68a' : '#ffe55f',
          'url': `/solicitacoes/${obj.id}`
        }
        events.push(event) 
      }
    })
    setRequestsList(events);
  }, [getRequests])
  
  return (
    <div className='flex calendar-overwrite' aria-pressed='false'>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        locale={pt_br_locale}
        events={requestsList}
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

