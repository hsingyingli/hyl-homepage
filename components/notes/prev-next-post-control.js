import {Box, Spacer} from '@chakra-ui/react';
import ToolButton from './prev-next-post-button'
const ControlButtons = ({prev, next, href}) => {
  return (
      <Box display="flex">
        {prev && (
          <ToolButton post={prev} href={href} position={'left'}/>
        )}
        <Spacer />
        {next && (
          <ToolButton post={next} href={href} position={'right'}/>
        )}
      </Box>
  );
};

export default ControlButtons;
