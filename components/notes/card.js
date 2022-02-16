import {
  Box,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
const Card = ({post, children, href, ...rest}) => {
  return (
    <Box
      w="100%"
      textAlign="center"
      fontFamily='"M PLUS Rounded 1c", sans-serif'
      {...rest}
    >
      <LinkBox cursor="pointer">
        <Box borderWidth={1} borderRadius='10px' overflow='hidden' _hover={{transform: 'scale(1.1)'}}>
          <Image
            src={post.cover_image}
            alt={post.title}
            placeholder="blur"
            loading="lazy"
          />
        </Box>
        <NextLink href={href} passHref>
          <LinkOverlay>
            <Text mt={2} fontWeight="500">
              {post.title}
            </Text>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Box>
  );
};

export default Card;
