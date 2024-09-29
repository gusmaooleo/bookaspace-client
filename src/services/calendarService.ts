import { SelectedDate } from '@/utils/interfaces/SelectedDate'
import { BehaviorSubject } from 'rxjs'

const defualtDate: SelectedDate = {
  start: '',
  end: '',
  allDay: false,
}

const selectedDateSubject = new BehaviorSubject<SelectedDate>(defualtDate);

export const calendarService = {
  selectedDate$: selectedDateSubject.asObservable(),
  setSelectedDate: (date: SelectedDate) => selectedDateSubject.next(date),
}


