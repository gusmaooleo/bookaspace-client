import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import { useRequest } from "@/hooks/useRequest";
import { Text, Button, useToast } from "@chakra-ui/react";
import { UpdateRequest } from "@/utils/interfaces/UpdateRequest";
import { User } from "@/utils/interfaces/User";
import { addMinutes } from "date-fns";
import RequestService from "@/services/requests/RequestService";
import "./index.css";

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
  const { setRequests } = useRequest();
  const toast = useToast();
  const requestService = new RequestService();
  const isApprove = type === "approve";

  const approveRequest = async () => {
    if (request) {
      try {
        const updateRequest: UpdateRequest = {
          dateTime: addMinutes(new Date(), 5).toISOString(),
          decision: isApprove,
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
              isApprove ? "aprovada" : "reprovada"
            } com sucesso.`,
            status: "success",
            position: "top-right",
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: `Falha ao ${
            isApprove ? "aprovar" : "reprovar"
          } solicitação.`,
          status: "error",
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <Text fontSize="16px" fontWeight="bold" color="white" mb={2}>
        Têm certeza que deseja{" "}
        <span  style={{ color: isApprove ? "#68d68a" : "#F97E7A" }}>
          {isApprove ? "aprovar" : "reprovar"}
        </span>{" "}
        a solicitação?
      </Text>

      <Text fontSize="14px" color="red.500" fontWeight={"600"}>
        {"Esta ação não poderá ser desfeita."}
      </Text>

      <div className="flex w-full justify-end mt-8">
        <Button variant={"outline"} mr={3} onClick={closeAction}>
          Cancelar
        </Button>
        <Button
          variant={isApprove ? "submit" : "reprove"}
          type="submit"
          onClick={approveRequest}
        >
          {isApprove ? "Aprovar" : "Reprovar"}
        </Button>
      </div>
    </div>
  );
};
export default ApproveReproveRequest;
