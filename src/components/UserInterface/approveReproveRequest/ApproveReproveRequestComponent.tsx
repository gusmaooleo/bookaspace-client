import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { useRequest } from "@/hooks/useRequest";
import { Text, Button, useToast } from "@chakra-ui/react";
import { UpdateRequest } from "@/utils/interfaces/UpdateRequest";
import { User } from "@/utils/interfaces/User";
import { addMinutes } from "date-fns";
import RequestService from "@/services/requests/RequestService";
import './index.css'


interface ApproveReproveRequestProps {
  request?: SpaceRequest | null;
  user?: User;
  type: "approve" | "reprove" | "";
  closeAction: () => void;
}

const ApproveReproveRequest = ({
  request,
  user,
  type,
  closeAction,
}: ApproveReproveRequestProps) => {
  const requestService = new RequestService();
  const { setRequests } = useRequest();
  const toast = useToast();

  const approveRequest = async () => {
    if (request) {
      try {
        const updateRequest: UpdateRequest = {
          dateTime: addMinutes(new Date(), 5).toISOString(),
          decision: type === "approve",
          observation: "APPROVED",
          requestId: Number(request.id),
          userId: user?.id,
        };
        const payload = await requestService.updateRequestStatus(updateRequest);
        if (payload.id) {
          closeAction();
          setRequests();
          toast({
            title: "Sucesso",
            description: `Solicitação ${
              type === "approve" ? "aprovada" : "reprovada"
            } com sucesso.`,
            status: "success",
            position: "top-right",
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: `Falha ao ${type === 'approve' ? "aprovar" : "reprovar"} solicitação.`,
          status: "error",
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <Text fontSize="16px" fontWeight="bold" color="white" mb={2}>
        Pressione "confirmar" para {type === "approve" ? "aprovar" : "reprovar"}{" "}
        a solicitação
      </Text>

      <div className="flex w-full justify-end mt-12">
        <Button variant={"outline"} mr={3} onClick={closeAction}>
          Cancelar
        </Button>
        <Button variant={"submit"} type="submit" onClick={approveRequest}>
          Confirmar
        </Button>
      </div>
    </div>
  );
};
export default ApproveReproveRequest;

