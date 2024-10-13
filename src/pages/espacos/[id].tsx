import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Space } from "@/utils/interfaces/Space";
import { SpaceItemFormatter } from "@/utils/formatters/SpaceItemFormatter";
import { useSpace } from "@/hooks/useSpace";

const Espacos = () => {
  const router = useRouter();
  const [espaco, setEspaco] = useState<Space | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);
  const { id } = router.query;
  const { getSpaces } = useSpace(); 


  // simula chamadas a api etc

  useEffect(() => {
    const space = getSpaces.find(
      (obj) => obj["id"] === Number(id)
    )
    setEspaco(space || null);
  }, []);

  useEffect(() => {
    if (espaco) {
      console.log(espaco)
      setPayload(SpaceItemFormatter(espaco))
    }
  }, [espaco])

  return (
    <div className="page">
      {payload && 
        <GenericSubpageComponent 
          value="Espaço"
          _id={espaco?.id}
          status={espaco?.availability}
          genericItem={payload}
        />
      }
    </div>
  );
};

export default Espacos;
