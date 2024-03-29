import {
  Box,
  Spacer,
  Icon,
  Link,
  Container,
  HStack,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import ThemeToggleButton from './theme-toggle-button';
import NavDropDownMenu from './nav-dropdown-menu';
import NavMenu from './nav-menu';
import Logo from './logo';

const Navbar = ({ path }) => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      h="80px"
      zIndex={1}
      backdropFilter='blur(10px)'
    >
      <Container
        maxW="container.lg"
        w="100%"
        h="80px"
        display="flex"
        alignItems="center"
        p={{ base: 2, sm: 8 }}
      >
        {/* Logo */}
        <Logo />
        <Spacer />

        {/* Navigation */}
        <NavMenu path={path} />

        {/* Some Social Media Links and Tools*/}
        <HStack>
          <Link
            href="https://www.github.com/hsingyingli"
            path={path}
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon w={5} h={5} as={FaGithub} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/hsing-li-9219a61b8"
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon w={5} h={5} as={FaLinkedinIn} />
          </Link>

          {/* Navigation */}
          <ThemeToggleButton />
          <NavDropDownMenu />
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
