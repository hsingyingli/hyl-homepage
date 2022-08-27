import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  Image,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import NextLink from 'next/link';

const ChakraCard = ({ context }) => {
  const name = context.name
  const src = context.src
  const imageSrc = context.imageSrc
  const tags = context.tags

  return (
    <Box
      w="100%"
      textAlign="center"
      fontFamily='"M PLUS Rounded 1c", sans-serif'
      borderWidth={2}
      borderRadius={10}
      width="280px"
      height="280px"
      overflowY='hidden'
      p={2}
      _hover={{ borderColor: 'teal.500' }}
    >
      <LinkBox cursor="pointer" h="100%">
        <Image
          src={imageSrc}
          alt={name}
          width="280px"
          height="150px"
          loading="lazy"
          rounded={10}
        />
        <NextLink href={src} passHref>
          <LinkOverlay>
            <Text mt={2} fontWeight="500">
              {name}
            </Text>
            {tags.map((tag) =>
              <Tag variant='outline' m={1} size='sm' colorScheme='teal'>{tag}</Tag>
            )}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Box>
  );
};

export default ChakraCard
