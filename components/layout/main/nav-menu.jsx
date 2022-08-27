import { Box, Stack } from '@chakra-ui/react';
import LinkItem from './link-item';
const NavMenu = ({ path }) => {

  return (
    <Box mr={10} w="auto" display={{ base: 'none', md: 'inline-block' }}>
      <Stack direction="row" spacing={3} align="center">
        <LinkItem path={path} href="/"> Home</LinkItem>
      </Stack>
    </Box>
  );
};

export default NavMenu;
