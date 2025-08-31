import WarningTextComponent from "@/components/UserInterface/warningText/WarningTextComponent";
import { useUserSession } from "@/contexts/userContext";
import { useRequest } from "@/hooks/useRequest";
import { useSpaceRequestForm } from "@/hooks/useSpaceRequestForm";
import RequestService from "@/services/requests/RequestService";
import { Space } from "@/utils/interfaces/Space";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FC, useEffect } from "react";
import "./index.css";

interface SpaceRequestFormProps {
  request?: SpaceRequest | null,
  closeAction?: () => void,
  id?: number,
}

const SpaceRequestFormComponent: FC<SpaceRequestFormProps> = ({ request, id, closeAction }) => {
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
  } = useSpaceRequestForm();
  const { setRequests } = useRequest()
  const { user } = useUserSession();
  const toast = useToast();
  const spaceRequestService = new RequestService();


  useEffect(() => {
    if (request && request.id && options) {
      const foundSpace: Space | undefined = options.find(value => value.id === request.physicalSpaceId)
      setSpace(foundSpace || null)
      setTitle(request.title)
      setSelectedDate([new Date(request.dateTimeStart), new Date(request.dateTimeEnd)])
      setDesciption(request.needs)
    }
  }, [options])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDate[0] > new Date() && space && space.id && user) {
      const spaceRequest: SpaceRequest = {
        "userId": user.id,
        "physicalSpaceId": space.id,
        "dateTimeStart": selectedDate[0].toISOString(), 
        "dateTimeEnd": selectedDate[1].toISOString(), 
        "title": title,
        "needs": description,
      }
      console.log(spaceRequest);
      try {
        let payload;
        if (request) {
          spaceRequest['id'] = id;
          payload = await spaceRequestService.putRequest(spaceRequest);
        } else {
          payload = await spaceRequestService.sendRequest(spaceRequest);
        }
        if (payload.id) {
          toast({
            title: 'Sucesso',
            description: 'Solicitação criada com sucesso.',
            status: 'success',
            position: 'top-right'
          })
          setRequests();
          clearForm();
        } else {
          toast({
            title: 'Erro',
            description: 'Não foi possível criar solicitação. Verifique os dados do formulário.',
            status: 'error',
            position: 'top-right'
          })
        }
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível criar solicitação. Verifique os dados do formulário.',
          status: 'error',
          position: 'top-right'
        })
      }
    } else {
      toast({
        title: 'Erro',
        description: 'A data inicial deve ser posterior ao momento atual.',
        status: 'error',
        position: 'top-right'
      })
    }
  };

  return (
    <div className="space-resgister-containter">
      <form
        className={request ? "w-fullsized p-8" : "space-register-form-container p-8"}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-[2vmin] text-[#f4f7f5]">
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
              h='10vmin'
            />
          </FormControl>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button variant="outline" onClick={request ? closeAction : clearForm}>Cancelar</Button>
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

export default SpaceRequestFormComponent;
