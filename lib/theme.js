import {extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools'


const styles = {
  global: (props)=> ({
    body: {
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('#F0E7DB', '#202023')(props),
        lineHeight: 'base',
        margin: 0,
        padding: 0,
    },
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({styles, config});

export default theme;
