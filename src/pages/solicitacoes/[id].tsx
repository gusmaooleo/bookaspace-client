import { useRouter } from "next/router";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import Database from "@/utils/Database";
import { useEffect, useState } from "react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import { RequestItemFormatter } from "@/utils/formatters/RequestItemFormatter";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import SpaceService from "@/services/space/SpaceService";

const Solicitacao = () => {
  const router = useRouter();
  const { id } = router.query;
  const [solicitacao, setSolicitacao] = useState<SpaceRequest | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);
  const spaceService = new SpaceService();

  const { spaceRequests } = Database;

  // simula chamadas a api etc 

  useEffect(() => {
    if (id) {
      const foundRequest = spaceRequests.find(
        (obj) => obj["id"] === Number(id)
      );
      setSolicitacao(foundRequest || null);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitacao) {
        const space = await spaceService.getSpaceById(String(solicitacao.physicalSpaceId))
        setPayload(RequestItemFormatter(solicitacao, space))
      }
    }
    
    fetchData();
  }, [solicitacao])

  return (
    <div className="page">
      {payload && 
        <GenericSubpageComponent 
          value="Solicitação"
          _id={solicitacao?.id}
          status={solicitacao?.status}
          genericItem={payload}
        />
      }
    </div>
  );
};

export default Solicitacao;
