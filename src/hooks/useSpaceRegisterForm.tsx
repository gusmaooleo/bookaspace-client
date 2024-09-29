import { Space } from "@/utils/interfaces/Space";
import { useState, useEffect } from "react";

export const useSpaceRegisterForm = () => {
  const [space, setSpace] = useState<Space | null>(null);
  const [title, setTitle] = useState<string>(" ");
  const [selectedDate, setSelectedDate] = useState<Date[] | any>([]);
  const [description, setDesciption] = useState<string>(" ");
  const [canSubmit, setCanSubmit] = useState<string>("blocked");

  // será trocado por um serviço
  const options: Space[] = [
    { name: "Sala b404", type: "Sala de aula" },
    { name: "Sala b406", type: "Sala de aula" },
    { name: "Teatro", type: "Auditório" },
    { name: "Teatro", type: "Auditório" },
  ];

  const clearForm = () => {
    setSpace(null)
    setTitle(' ')
    setSelectedDate([])
    setDesciption(' ')
  }

  useEffect(() => {
    if (
      space !== null &&
      title !== "" &&
      title !== " " &&
      title.trim().length >= 12 &&
      selectedDate !== null &&
      selectedDate.length !== 0
    ) {
      setCanSubmit("submit");
    } else {
      setCanSubmit("blocked");
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
    options
  }
}