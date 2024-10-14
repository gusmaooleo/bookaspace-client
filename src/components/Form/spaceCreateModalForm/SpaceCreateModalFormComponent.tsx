import React, { FC, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import CustomSelect from "@/components/Shared/genericTable/CustomSelect";
import {
  faBuildingUser,
  faFlaskVial,
  faGraduationCap,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpaceService from "@/services/space/SpaceService";
import "./index.css";
import { Space } from "@/utils/interfaces/Space";
import { useSpace } from "@/hooks/useSpace";
import { Option } from "@/utils/interfaces/CustomSelect";

interface SpaceCreateModalProps {
  onClose: () => void,
}

const SpaceCreateModalFormComponent: FC<SpaceCreateModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const { setSpaces } = useSpace();
  const spaceService = new SpaceService();
  const toast = useToast();


  const spaceTypes = [
    { name: "Sala de aula", value: "CLASSROOM" },
    { name: "Auditório", value: "AUDITORIUM" },
    { name: "Laboratório", value: "LABORATORY" },
  ];

  const decideType = (type: string) => {
    switch (type) {
      case "Sala de aula":
        return 'CLASSROOM';
      case "Auditório":
        return 'AUDITORIUM';
      case "Laboratório":
        return 'LABORATORY';
      default:
        return "";
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !type || capacity === null || !description || !location) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        status: "error",
        position: "top-right",
      });
      return;
    }

    const spaceData: Space = {
      "name": name,
      "location": location,
      "type": type,
      "capacity": capacity,
      "resources": description,
    }

    const space = await spaceService.createNewSpace(spaceData);

    if (space.id) {
      toast({
        title: "Sucesso",
        description: "Espaço criado com sucesso.",
        status: "success",
        position: "top-right",
      });
      onClose();
      setSpaces();
    } else {
      toast({
        title: "Erro",
        description: "Erro ao criar espaço.",
        status: 'error',
        position: "top-right",
      });
    }
  };

  const handleCapacityChange = (e: InputNumberValueChangeEvent) => {
    const value = e.value !== null && e.value !== undefined ? e.value : null;
    setCapacity(value);
  };

  const spaceFields: Option[] = [
    { label: "Sala de aula", icon: faGraduationCap, value: 'CLASSROOM' },
    { label: "Auditório", icon: faBuildingUser, value: 'AUDITORIUM' },
    { label: "Laboratório", icon: faFlaskVial, value: 'LABORATORY' },
  ];

  return (
    <div className="space-create-user-container">
      <form
        className="space-create-user-form-container p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-[2vmin] text-[#f4f7f5]">
          <FormControl mb={2}>
            <FormLabel>Nome do espaço</FormLabel>
            <InputGroup variant={"ns_light"}>
              <Input
                placeholder="Nome do espaço"
                onChange={(e) => setName(e.target.value)}
              />
              <InputRightElement>
                <FontAwesomeIcon icon={faSchool} color={"black"} />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Localização do espaço</FormLabel>
            <InputGroup variant={"ns_light"}>
              <Input
                placeholder="Localização"
                onChange={(e) => setLocation(e.target.value)}
              />
              <InputRightElement>
                <FontAwesomeIcon icon={faSchool} color={"black"} />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Tipo do espaço</FormLabel>
            <CustomSelect
              options={spaceFields}
              setValue={setType}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Capacidade do espaço</FormLabel>
            <InputGroup variant={"light"}>
              <InputNumber
                value={capacity}
                onValueChange={handleCapacityChange}
                placeholder="Capacidade do espaço"
                min={0}
                className="w-full"
                useGrouping={false}
                style={{ color: "black", height: "2.5rem" }}
              />
              <InputRightElement>
                <FontAwesomeIcon icon={faBuildingUser} color={"black"} />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Descrição resumida dos recursos do espaço</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição resumida dos recursos do espaço"
              resize="vertical"
              color={"black"}
              bgColor={"white"}
            />
          </FormControl>
        </div>

        <div className="flex w-full justify-end mt-10">
          <Button variant={"outline"} mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant={'submit'} type="submit">
            Criar espaço
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceCreateModalFormComponent;
