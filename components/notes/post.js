import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
const Post = ({post, children, href, ...rest}) => {
  return (
    <Box
      w="100%"
      textAlign="center"
      fontFamily='"M PLUS Rounded 1c", sans-serif'
      {...rest}
    >
      <LinkBox cursor="pointer" h="100%">
          <Image
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            width="300px"
            height="150px"
            rounded={10}
          />
        <NextLink href={href} passHref>
          <LinkOverlay>
            <Text mt={2} fontWeight="500">
              {post.app}
            </Text>
            <Text mt={2} fontWeight="500">
              {post.excerpt}
            </Text>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Box>
  );
};

export default Post;
