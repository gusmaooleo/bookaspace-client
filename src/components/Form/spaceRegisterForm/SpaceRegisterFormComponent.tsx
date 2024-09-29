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
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import WarningTextComponent from "@/components/UserInterface/warningText/WarningTextComponent";
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
    options,
    currentDateMessage
  } = useSpaceRegisterForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      space: space,
      title: title,
      description: description,
      startDate: selectedDate[0], 
      endDate: selectedDate[1], 
    }

    console.log(payload);
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
            <WarningTextComponent 
              condition={space === null}
              text={'Escolha um espaço'}
              icon={faTriangleExclamation}
            />
          </FormControl>

          <FormControl isInvalid={title === ""}>
            <FormLabel>Título da solicitação</FormLabel>
            <Input
              variant="light"
              value={title}
              onChange={(e) => e.target.value === ' ' ? setTitle('') : setTitle(e.target.value)}
              required
              maxLength={40}
            />
            <WarningTextComponent 
              condition={title.length < 12}
              text={'O título deve ter entre 12 e 40 caracteres'}
              icon={faTriangleExclamation}
            />
          </FormControl>

          <FormControl isInvalid={selectedDate === null}>
            <FormLabel>Data</FormLabel>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              selectionMode="range"
              dateFormat="dd/mm/yy"
              showTime
              showButtonBar
              showIcon
              hourFormat="24"
            />

            <WarningTextComponent 
              condition={selectedDate !== null && (selectedDate[0] === null || selectedDate[1] === null)} 
              text={'A data de reserva precisa tem um início e um fim'}
              icon={faTriangleExclamation}
            />
            <WarningTextComponent 
              condition={currentDateMessage !== ''}
              text={currentDateMessage}
              icon={faTriangleExclamation}
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
              boxShadow={'inset 0px 4px 8px rgba(0, 0, 0, 0.5)'}
              color={"#1c1c1c"}
              fontWeight={"600"}
              resize={'none'}
              h='150px'
            />
          </FormControl>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button variant="outline" onClick={clearForm}>Cancelar</Button>
          <Button 
            variant={canSubmit} 
            type={canSubmit === 'submit' ? 'submit' : 'button'}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceRegisterFormComponent;
