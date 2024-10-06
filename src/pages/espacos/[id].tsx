import { useRouter } from "next/router";
import Database from "@/utils/Database";
import { useEffect, useState } from "react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Space } from "@/utils/interfaces/Space";
import { SpaceItemFormatter } from "@/utils/formatters/SpaceItemFormatter";

const Espacos = () => {
  const router = useRouter();
  const { id } = router.query;
  const [espaco, setEspaco] = useState<Space | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);

  const { spaces } = Database;

  // simula chamadas a api etc

  useEffect(() => {
    if (id) {
      const foundSpace = spaces.find(
        (obj) => obj["_id"] === Number(id)
      );
      setEspaco(foundSpace || null);
    }
  }, [id]);

  useEffect(() => {
    if (espaco) {
      setPayload(SpaceItemFormatter(espaco))
    }
  }, [espaco])

  return (
    <div className="page">
      {payload && 
        <GenericSubpageComponent 
          value="Espaço"
          _id={espaco?._id}
          status={espaco?.status}
          genericItem={payload}
        />
      }
    </div>
  );
};

export default Espacos;
