import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useSpaceRegisterForm } from "@/hooks/useSpaceRegisterForm";
import "./index.css";

const SpaceRegisterFormComponent: React.FC = () => {
  const {
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
  } = useSpaceRegisterForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(space);
    console.log(title);
    console.log(selectedDate);
    console.log(description);
  };

  return (
    <div className="space-resgister-containter">
      <h2 className="mb-6">Solicitar reserva</h2>
      <form
        className="space-register-form-container p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-6 text-[#f4f7f5]">
          <FormControl isInvalid={space === null}>
            <FormLabel>Espaço</FormLabel>
            <Dropdown
              value={space}
              onChange={(e: DropdownChangeEvent) => setSpace(e.value)}
              options={options}
              optionLabel="name"
              filter
              required
            />
            <FormErrorMessage color={"#ffe55f"}>
              Escolha um espaço
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={title === ""}>
            <FormLabel>Título da solicitação</FormLabel>
            <Input
              variant="light"
              value={title}
              onChange={(e) => e.target.value === ' ' ? setTitle('') : setTitle(e.target.value)}
              required
            />
            {title.length < 12 && (
              <label style={{ color: "#ffe55f", fontSize: "14px" }}>
                O título deve ter 12 ou mais caracteres.
              </label>
            )}
            <FormErrorMessage fontStyle={"italic"}>
              O título da solicitação é obrigatório
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={selectedDate === null}>
            <FormLabel>Data</FormLabel>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              selectionMode="range"
              showTime
              showButtonBar
              showIcon
              hourFormat="24"
            />
            <FormErrorMessage fontStyle={"italic"}>
              A data do período da reserva é obrigatória
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={description.trim() === ""}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              variant="light"
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
              color={"#1c1c1c"}
              fontWeight={"600"}
            />
          </FormControl>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button variant="outline" onClick={clearForm}>Cancelar</Button>
          <Button variant={canSubmit} type={canSubmit === 'submit' ? 'submit' : 'button'}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceRegisterFormComponent;
