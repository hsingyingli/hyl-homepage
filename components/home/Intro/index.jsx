import {
  Box,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
const Intro = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Box>
        <Heading
          mb={5}
          fontSize="5xl"
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          About me
        </Heading>
        <Text pt={3} fontSize="lg" fontWeight="500" lineHeight={1.8}>
          I am Hsing Ying Li, a graduate student in C.S. at FJU. My research
          interests include {' '}
          <Text
            as="span"
            color="teal.500"
          >
            Machine Learning
          </Text> in FinTech. Meanwhile, I also
          self-learn {' '} <Text
            as="span"
            color="teal.500"
          >
            Web Development.
          </Text>
        </Text>
      </Box>
      <Accordion defaultIndex={[0, 1, 2]} pt={5} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize={{ base: '0.9rem', md: '1rem' }}>
              2021/09 ~ 2022/08 (graduate student)
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <UnorderedList spacing="2">
              <ListItem> <Text as='span' color='teal.500'>Teaching Assistant</Text>, Calculus.</ListItem>
              <ListItem> <Text as='span' color='teal.500'>Teaching Assistant</Text>, Data Structures.</ListItem>
              <ListItem> <Text as='span' color='teal.500'>Teaching Assistant</Text>, Databases Sysyem.</ListItem>
              <ListItem> <Text as='span' color='teal.500'>Teaching Assistant</Text>, Algorithm.</ListItem>
              <ListItem> Published <Link href='https://ieeexplore.ieee.org/document/9658607' isExternal color='teal.500'>paper</Link> in 2021 IEEE International Conference on Systems, Man, and Cybernetics (SMC).</ListItem>
              <ListItem> Graduated from Fu Jen Catholic University with a master degree in computer science and information engineering</ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize={{ base: '0.9rem', md: '1rem' }}>
              2020/09 ~ 2021/08 (senior student)
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <UnorderedList spacing="2">
              <ListItem> <Text as='span' color='teal.500'>Part-time Research Assistant</Text>, Institute of Information Science, Academia Sinica.</ListItem>
              <ListItem> <Text as='span' color='teal.500'>Research Assistant</Text>, Institute of Information Science, Academia Sinica.</ListItem>
              <ListItem> Graduated from Fu Jen Catholic University with a Bachelor degree in computer science and information engineering</ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize={{ base: '0.9rem', md: '1rem' }}>
              2019/09 ~ 2020/08 (jounior student)
            </Box>
            <AccordionIcon />

          </AccordionButton>
          <AccordionPanel pb={4}>
            <UnorderedList spacing="2">
              <ListItem>Transfer program to computer science</ListItem>
              <ListItem> <Text as='span' color='teal.500'>Part-time Research Assistant</Text>, Institute of Information Science, Academia Sinica.</ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Intro;
