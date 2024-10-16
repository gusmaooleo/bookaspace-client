import { Button } from '@chakra-ui/react'
import Link from 'next/link'
 
export default function Custom404() {
  return (
    <div>
      <h2>Página não encontrada</h2>
      <p>Não conseguimos encontrar recursos para exibir a página</p>
      <Button variant={'dark'}>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  )
}