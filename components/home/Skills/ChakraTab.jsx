import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import ChakraCards from './ChakraCards'
import ChakraTags from './ChakraTags'



const ChakraTab = ({ skills }) => {
  const title = Object.keys(skills)
  return (
    <Tabs isFitted variant='enclosed' colorScheme='teal' size='sm'>
      <TabList mb='1em'>
        {title.map((key) => <Tab key={key}>{key}</Tab>)}
      </TabList>
      <TabPanels>
        {title.map((key) => {
          return (
            <TabPanel key={key}>
              <ChakraTags tools={skills[key].tools}/> 
              <ChakraCards contexts={skills[key].posts}/>    
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}


export default ChakraTab
