import { useRouter } from "next/router";
import { SpaceRequest } from "@/utils/interfaces/SpaceRequest";
import Database from "@/utils/Database";
import { useEffect, useState } from "react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import { RequestItemFormatter } from "@/utils/formatters/RequestItemFormatter";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";

const Solicitacao = () => {
  const router = useRouter();
  const { id } = router.query;
  const [solicitacao, setSolicitacao] = useState<SpaceRequest | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);

  const { spaceRequests } = Database;

  // simula chamadas a api etc 

  useEffect(() => {
    if (id) {
      const foundRequest = spaceRequests.find(
        (obj) => obj["_id"] === Number(id)
      );
      setSolicitacao(foundRequest || null);
    }
  }, [id]);

  useEffect(() => {
    if (solicitacao) {
      setPayload(RequestItemFormatter(solicitacao))
    }
  }, [solicitacao])

  return (
    <div className="page">
      {payload && 
        <GenericSubpageComponent 
          value="Solicitação"
          _id={solicitacao?._id}
          status={solicitacao?.status}
          genericItem={payload}
        />
      }
    </div>
  );
};

export default Solicitacao;
