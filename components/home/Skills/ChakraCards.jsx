import { Wrap, WrapItem } from '@chakra-ui/react'
import ChakraCard from './ChakraCard'

const Cards = ({contexts}) => {
  return (
    <Wrap spacing='30px'>
      {
        contexts.map((context)=> {
          return (
            <WrapItem key={context.name}>
              <ChakraCard context={context}/> 
            </WrapItem>
          )
        })
      }
    </Wrap>
  )
}

export default Cards
