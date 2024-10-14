import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GenericSubpageComponent from "@/components/Shared/genericSubpage/GenericSubpageComponent";
import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Space } from "@/utils/interfaces/Space";
import { SpaceItemFormatter } from "@/utils/formatters/SpaceItemFormatter";
import { useSpace } from "@/hooks/useSpace";
import SpaceService from "@/services/space/SpaceService";

const Espacos = () => {
  const router = useRouter();
  const [espaco, setEspaco] = useState<Space | null>(null);
  const [payload, setPayload] = useState<GenericSubpage[] | null>(null);
  const { getSpaces } = useSpace(); 
  const { id } = router.query;
  const spaceService = new SpaceService();

  useEffect(() => {
    const fetchData = async () => {
      const space = getSpaces.find(
        (obj) => obj["id"] === Number(id)
      )
      if (space) {
        setEspaco(space);
      } else {
        try {
          const fetchSpace = await spaceService.getSpaceById(String(id));
          setEspaco(fetchSpace);
        } catch (error) {
          router.push('/error')
        }
      }
    }
    fetchData();
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
          _id={espaco?.id}
          status={espaco?.availability}
          genericItem={payload}
        />
      }
    </div>
  );
};

export default Espacos;
