import {
  Wrap,
  WrapItem,
  Tag
} from '@chakra-ui/react'


const ChakraTags = ({ tools }) => {
  return (
    <Wrap m={3}>
      {
        tools.map((tool) => <WrapItem key={tool}> <Tag variant='outline' colorScheme='blue'>{tool} </Tag></WrapItem>)
      }
    </Wrap>
  )
}

export default ChakraTags
