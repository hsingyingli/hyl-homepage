import NextLink from 'next/link';
import {Tooltip, Button, Text} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
const ToolButton = ({post, href, position}) => {
  return (
    <NextLink href={href + '/' + post.data.id}>
      <Button
        leftIcon={
          position === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />
        }
      >
        <Tooltip label={post.data.title}>
          <Text w="100px" isTruncated>
            {post.data.title}{' '}
          </Text>
        </Tooltip>
      </Button>
    </NextLink>
  );
};

export default ToolButton;
