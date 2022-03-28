import {Box, IconButton, Menu, MenuList, MenuButton, MenuItem, Link} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import NextLink from 'next/link';

const NavMenu = () => {
  return (
    <Box ml={2} display={{base: 'inline-block', md: 'none'}}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          varian="outline"
        />
        <MenuList>
          <NextLink href="/" passHref>
            <MenuItem as={Link}>Home</MenuItem>
          </NextLink>
          <NextLink href="/posts" passHref>
            <MenuItem>Posts</MenuItem>
          </NextLink>
          <NextLink href="/playground" passHref>
            <MenuItem>Playground</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavMenu;
