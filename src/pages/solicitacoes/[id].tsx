import {
  ApproveRequestButton,
  EditRequestButton,
  ReproveRequestButton,
} from "@/components/UserInterface/requestActionButtons/RequestActionButtonsComponent";
import { useRouter } from "next/router";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { useEffect, useState } from "react";
import { useRequest } from "@/hooks/useRequest";
import { RequestItemFormatter } from "@/utils/formatters/RequestItemFormatter";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { useUserSession } from "@/contexts/userContext";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import SpaceService from "@/services/space/SpaceService";
import DynamicModal from "@/components/Shared/genericModal/DynamicModal";
import SpaceRequestFormComponent from "@/components/Form/spaceRequestForm/SpaceRequestFormComponent";
import ApproveReproveRequest from "@/components/UserInterface/approveReproveRequest/ApproveReproveRequestComponent";
import RequestService from "@/services/requests/RequestService";
import { useToast } from "@chakra-ui/react";
import { useUsers } from "@/hooks/useUser";

const Solicitacao = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUserSession();
  const [solicitacao, setSolicitacao] = useState<SpaceRequest | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);
  const { getUsers } = useUsers();
  const toast = useToast()

  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
  const [approveReproveModal, setApproveReproveModal] =
    useState<boolean>(false);

  const [typeApprove, setTypeApprove] = useState<"approve" | "reprove" | "">(
    ""
  );

  const spaceService = new SpaceService();
  const requestService = new RequestService();
  const { getRequests } = useRequest();

  const handleEditRequest = () => {
    setToggleEditModal(true);
  };

  const handleApproveRequest = () => {
    setTypeApprove("approve");
    setApproveReproveModal(true);
  };

  const handleReproveRequest = () => {
    setTypeApprove("reprove");
    setApproveReproveModal(true);
  };

  useEffect(() => {
    const fetchRequest = async () => {
      if (id) {
        try {
          let foundRequest = getRequests.find((obj) => obj["id"] === Number(id));
          if (foundRequest === undefined) {
            foundRequest = await requestService.getRequestById(String(id)) 
          }
          if (foundRequest?.id) {
            setSolicitacao(foundRequest);
          }
        } catch (error) {
          router.push('/agenda')
          console.error(error);
          toast({
            "title": 'Erro',
            "description": `Falha ao acessar solicitação: ${id}`,
            "status": 'error',
            "position": 'top-right'
          })
        }
      }
    }
    fetchRequest();
  }, [id, getRequests]);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitacao) {
        const space = await spaceService.getSpaceById(
          String(solicitacao.physicalSpaceId)
        );
        const user = getUsers.find(user => user.id === solicitacao.userId)
        solicitacao.user = user;
        if (solicitacao.approvalHistory) {
          const userAction = getUsers.find(user => user.id === solicitacao.approvalHistory.userId)
          solicitacao.userAction = userAction;
        }
        setPayload(RequestItemFormatter(solicitacao, space));
      }
    };
    fetchData();
  }, [solicitacao]);

  const decideActionsButton = () => {
    const isPending =
      solicitacao?.status === "PENDING";

    const isEnded =
      solicitacao?.status === "REJECTED" || solicitacao?.status === "APPROVED";

    if (
      !isEnded &&
      user?.id === solicitacao?.userId &&
      (user?.roles[0].id === 1 || user?.roles[0].id === 3)
    ) {
      return (
        <div className="flex flex-row gap-4">
          <EditRequestButton action={handleEditRequest} />
          {isPending && (
            <>
              <ApproveRequestButton action={handleApproveRequest} />
              <ReproveRequestButton action={handleReproveRequest} />
            </>
          )}
        </div>
      );
    }

    if (user?.id === solicitacao?.userId && !isEnded) {
      return <EditRequestButton action={handleEditRequest} />;
    }

    if (
      user?.roles[0].id === 1 ||
      user?.roles[0].id === 3
    ) {
      return (
        <div className="flex flex-row gap-4">
          {isPending && (
            <>
              <ApproveRequestButton action={handleApproveRequest} />
              <ReproveRequestButton action={handleReproveRequest} />
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div className="page">
      {payload && (
        <GenericSubpageComponent
          value="Solicitação"
          _id={solicitacao?.id}
          status={solicitacao?.status}
          genericItem={payload}
          actions={decideActionsButton()}
        />
      )}

      <DynamicModal
        isOpen={toggleEditModal}
        onClose={() => setToggleEditModal(false)}
        title="Editar solicitação"
        component={
          <SpaceRequestFormComponent
            request={solicitacao}
            id={solicitacao?.id}
            closeAction={() => setToggleEditModal(false)}
          />
        }
      />

      <DynamicModal
        isOpen={approveReproveModal}
        onClose={() => setApproveReproveModal(false)}
        title={`${ typeApprove === 'approve' ? "Aprovar" : "Reprovar" } solicitação`}
        component={
          <ApproveReproveRequest
            request={solicitacao}
            user={user || undefined}
            type={typeApprove}
            closeAction={() => setApproveReproveModal(false)}
          />
        }
      />
    </div>
  );
};

export default Solicitacao;
