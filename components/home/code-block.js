import {CopyBlock, dracula, github} from 'react-code-blocks';
import {Box, Icon, Divider, Flex, useColorModeValue} from '@chakra-ui/react';
import {GoPrimitiveDot} from 'react-icons/go';

const code = `me = HsingYingLi()
print(me.timeline())`;

const res = `
{
  'now': 'I am studying for my master’s degree in C.S at FJU.',
  '2021-12': 'Publish first research paper in SMC',
  '2021-07': 'Institute of Information Science, Academia Sinica, Research Assistant',
  '2021-06': 'I completed my bachelor degree in C.S at FJU.'
}
`;
const CodeBlock = ({...rest}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      m={0}
      p={3}
      {...rest}
    >
      <Box
        borderWidth={2}
        borderRadius="10px"
        w="100%"
        p={3}
        bgColor={useColorModeValue('white', '#1A202C')}
      >
        <Box display="flex" direction="row" pb={1}>
          <Icon as={GoPrimitiveDot} color="red" />
          <Icon as={GoPrimitiveDot} color="yellow" />
          <Icon as={GoPrimitiveDot} color="green" />
        </Box>
        <Divider />
        <Box flexDirection='column'>
            <CopyBlock
              language="python"
              text={code}
              showLineNumbers={true}
              theme={useColorModeValue(github, dracula)}
              wrapLines={true}
              codeBlock
            />
          <Divider />
            <CopyBlock
              language="shell"
              text={res}
              showLineNumbers={false}
              theme={useColorModeValue(github, dracula)}
              wrapLines={true}
              codeBlock
            />
        </Box>
      </Box>
    </Box>
  );
};
export default CodeBlock;
