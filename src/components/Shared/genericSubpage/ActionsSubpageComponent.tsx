import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"


interface ActionsSubpageProps {
  value?: React.ReactNode
}

export const ActionsSubpageComponent = ({ value }: ActionsSubpageProps ) => {
  const router = useRouter();

  const popRoutesStack = () => {
    router.back();
  }

  return (
    <div className="absolute right-20 bottom-20 flex w-full justify-end gap-4">
      <Button 
        variant='outline'
        onClick={popRoutesStack}
      >Voltar</Button>
      { value }
    </div>
  )
}

