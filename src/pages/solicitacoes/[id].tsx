import { useRouter } from "next/router";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { useEffect, useState } from "react";
import { useRequest } from "@/hooks/useRequest";
import { RequestItemFormatter } from "@/utils/formatters/RequestItemFormatter";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Button, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useUserSession } from "@/contexts/userContext";
import { Text } from "@chakra-ui/react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import SpaceService from "@/services/space/SpaceService";
import DynamicModal from "@/components/Shared/genericModal/DynamicModal";
import SpaceRequestFormComponent from "@/components/Form/spaceRequestForm/SpaceRequestFormComponent";
import RequestService from "@/services/requests/RequestService";


interface RequestActionProps {
  action: () => void,
}

const EditRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={'submit'} onClick={action}>
      <FontAwesomeIcon icon={faPen} color="#f4f7f5" />
    </Button>
  )
}

const ApproveRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={'submit'} onClick={action}>
      Aprovar
    </Button>
  )
}

const ReproveRequestButton = ({ action }: RequestActionProps) => {
  return (
    <Button variant={'reprove'} onClick={action}>
      Reprovar
    </Button>
  )
}


interface ApproveRequestProps {
  request?: SpaceRequest | null,
}

const ApproveRequest = ({ request }: ApproveRequestProps) => {
  const requestService = new RequestService();
  const toast = useToast();
  
  const approveRequest = async () => {
    if (request) {
      try {
        request['status'] = 'APPROVED';
        console.log(request);
        const payload = await requestService.putRequest(request); 
        if (payload.id) {
          toast({
            title: "Sucesso",
            description: "Solicitação aprovada.",
            status: 'success',
            position: "top-right",
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao aprovar solicitação.",
          status: "error",
          position: "top-right",
        });
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <Text fontSize="16px" fontWeight="bold" color="white" mb={2}>
        Pressione "confirmar" para aprovar a solicitação
      </Text>

      <div className="flex w-full justify-end mt-12">
        <Button variant={"outline"} mr={3}>
          Cancelar
        </Button>
        <Button variant={'submit'} type="submit" onClick={approveRequest}>
          Confirmar
        </Button>
      </div>
    </div>
  )
}




const Solicitacao = (/* {actionsType}: SubpageProps */) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUserSession(); 
  const [solicitacao, setSolicitacao] = useState<SpaceRequest | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);
  
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
  const [toggleApproveModal, setToggleApproveModal] = useState<boolean>(false);
  const [toggleReproveModal, setToggleReproveModal] = useState<boolean>(false);

  const spaceService = new SpaceService();
  const { getRequests } = useRequest();

  const handleEditRequest = () => {
    setToggleEditModal(true);
  }
  
  const handleApproveRequest = () => {
    setToggleApproveModal(true);
  }
  
  const handleReproveRequest = () => {
    setToggleApproveModal(true);
  }

  // simula chamadas a api etc 

  useEffect(() => {
    if (id) {
      const foundRequest = getRequests.find(
        (obj) => obj["id"] === Number(id)
      );
      console.log(foundRequest)
      setSolicitacao(foundRequest || null);
    }
  }, [id, getRequests]);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitacao) {
        const space = await spaceService.getSpaceById(String(solicitacao.physicalSpaceId))
        setPayload(RequestItemFormatter(solicitacao, space))
      }
    }  
    fetchData();
  }, [solicitacao])

  const decideActionsButton = () => {
    if (user?.id === solicitacao?.userId && user?.roles[0].id === 1) {
      return (
        <div className="flex flex-row gap-4">
          <EditRequestButton action={handleEditRequest} />
          <ApproveRequestButton action={handleApproveRequest} />
          <ReproveRequestButton action={handleReproveRequest} />
        </div>
      )
    }

    if (user?.id === solicitacao?.userId) {
      return (
        <EditRequestButton action={handleEditRequest} />
      )
    }
    
    if (user?.roles[0].id === 1) {
      return (
        <div>
          <ApproveRequestButton action={handleApproveRequest} />
          <ReproveRequestButton action={handleReproveRequest} />
        </div>
      )
    }
  }

  return (
    <div className="page">
      {payload && 
        <GenericSubpageComponent 
          value="Solicitação"
          _id={solicitacao?.id}
          status={solicitacao?.status}
          genericItem={payload}
          actions={
            decideActionsButton()
          }
        />
      }
      <DynamicModal 
        isOpen={toggleEditModal}
        onClose={() => setToggleEditModal(false)}
        title="Editar solicitação"
        component={
          <SpaceRequestFormComponent request={solicitacao} id={solicitacao?.id} />
        }
      />
      
      <DynamicModal 
        isOpen={toggleApproveModal}
        onClose={() => setToggleApproveModal(false)}
        title="Aprovar solicitação"
        component={
          <ApproveRequest request={solicitacao} />
        }
      />
    </div>
  );
};

export default Solicitacao;
