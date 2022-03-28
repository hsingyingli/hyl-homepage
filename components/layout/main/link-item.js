import {Box, Link, useColorModeValue} from '@chakra-ui/react';
import NextLink from 'next/link';

const LinkItem = ({href, path, children, ...rest}) => {
  const active = path === href;
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900');
  return (
    <NextLink href={href}>
      <Box
        as={Link}
        bgColor={active ? 'teal' : undefined}
        color={active ? '#FFFFFF' : inactiveColor}
        fontFamily='"M PLUS Rounded 1c", sans-serif'
        fontWeight='500'
        p={2}
        {...rest}
      >
        {children}
      </Box>
    </NextLink>
  );
};

export default LinkItem;
