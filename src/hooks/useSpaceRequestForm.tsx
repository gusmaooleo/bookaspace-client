import { calendarService } from "@/services/calendarService";
import { SelectedDate } from "@/utils/interfaces/SelectedDate";
import { Space } from "@/utils/interfaces/Space";
import { parseISO } from 'date-fns';
import { useState, useEffect } from "react";
import spaceStore from "./useSpaceData";

export const useSpaceRequestForm = () => {
  const [space, setSpace] = useState<Space | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date[] | any>([]);
  const [currentDateMessage, setCurrentDateMessage] = useState<string>('');
  const [description, setDesciption] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState<string>("blocked");
  const [options, setOptions] = useState<Space[]>();
  const getSpaces = spaceStore((state) => state.spaces)

  // será trocado por um serviço

  const clearForm = () => {
    setSpace(null)
    setTitle('')
    setSelectedDate([])
    setDesciption('')
  }

  useEffect(() => {
    setOptions(getSpaces);
    calendarService.selectedDate$.subscribe((infoParams: SelectedDate) => {
      if (infoParams.start !== '') {
        setSelectedDate([parseISO(infoParams.start), parseISO(infoParams.end)])
      }
    })
  }, [])

  useEffect(() => {
    // regras de formulário (tem como melhorar bastante, boa sorte para quem for mexer nisso).

    const currentDate = new Date();
    if (selectedDate !== null && selectedDate[0] < currentDate) {
      setCurrentDateMessage('A data de início precisa ser posterior a data atual')
    } else {
      setCurrentDateMessage('')
      if (
        space !== null &&
        title !== "" &&
        title !== " " &&
        title.trim().length >= 12 &&
        title.trim().length <= 40 &&
        selectedDate !== null &&
        (selectedDate[0] instanceof Date && selectedDate[1] instanceof Date) &&
        (selectedDate[0] !== null && selectedDate[1] !== null)
      ) {
        setCanSubmit("submit");
      } else {
        setCanSubmit("blocked");
      }
    }
  }, [space, title, selectedDate]);


  return {
    space,
    setSpace,
    title,
    setTitle,
    selectedDate,
    setSelectedDate,
    description,
    setDesciption,
    canSubmit,
    clearForm,
    options,
    currentDateMessage,
  }
}