import {Image, Flex, Center, Heading, useColorModeValue} from '@chakra-ui/react';
import {BiCool} from 'react-icons/bi';
import NextLink from 'next/link';
const Logo = () => {
  return (
    <NextLink href="/" passHref>
        <Flex cursor='pointer'>
          <Image
            src="/logo.svg"
            objectFit="cover"
            alt="logo"
            boxSize={8}
          />
          <Center>
            <Heading
              display={{base: 'none', sm: 'inline-block'}}
              align="center"
              color={useColorModeValue('gray.800', 'whiteApha.900')}
              ml={3}
              fontSize='2xl'
              fontFamily='"M PLUS Rounded 1c", sans-serif;'
            >
              Hsing Ying Li
            </Heading>
          </Center>
        </Flex>
    </NextLink>
  );
};

export default Logo;
