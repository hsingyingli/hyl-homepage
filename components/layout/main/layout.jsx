import Navbar from './navbar';
import Footer from './footer';
import {Box, Container} from '@chakra-ui/react';

const Layout = ({children, path}) => {
  return (
    <Box as="main">
      <Navbar path={path} />
      <Container pt="100px" px={0} maxW="100%">
        {children}
      </Container>
      <Footer/>
    </Box>
  );
};

export default Layout;
