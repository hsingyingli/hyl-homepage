import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Card = ({text, image, children, href, ...rest}) => {
  return (
    <Box
      w="100%"
      textAlign="center"
      fontFamily='"M PLUS Rounded 1c", sans-serif'
      borderRadius={10}
      p={2}
      css={{
        boxShadow: `0px 0px 5px ${useColorModeValue('grey', 'white')}`
      }}
      {...rest}
    >
      <LinkBox cursor="pointer" h="100%">
          <Image
            src={image}
            alt={text}
            loading="lazy"
            width="300px"
            height="150px"
            rounded={10}
          />
        <NextLink href={href} passHref>
          <LinkOverlay>
            <Text mt={2} fontWeight="500">
              {text}
            </Text>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Box>
  );
};

export default Card;
