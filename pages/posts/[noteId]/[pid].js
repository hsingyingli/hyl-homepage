import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import {Box, Container, Heading, Text, Image} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import ControlButtons from '../../../components/notes/prev-next-post-control';
import sortByDate from '../../../lib/sortByDate';

const SelectedPostsPage = ({posts, data, prev, next, content}) => {
  const router = useRouter();
  return (
    <Container maxW="container.lg">
      <Box px={10} lineHeight={1.8}>
        <Box mb={10}>
          <Heading my={2}>{data.title}</Heading>
          <Text>{data.date}</Text>
        </Box>
        <Image src={data.cover_image} />
        <Box fontSize="lg" my={10}>
          <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
      <ControlButtons
        prev={prev}
        next={next}
        href={`/posts/${router.query.noteId}`}
      />
    </Container>
  );
};

export default SelectedPostsPage;

export async function getStaticProps({params}) {
  const posts = fs.readdirSync(path.join('posts', params.noteId));

  const postDetail = posts
    .map((post, index) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', params.noteId, post),
      );
      const {data, content} = matter(markdownWithMeta);
      return {data, content};
    })
    .sort(sortByDate);

  const selectedPost = postDetail.find((element) => {
    return element.data.title === params.pid;
  });
  const nextPostIndex = postDetail.indexOf(selectedPost) + 1;
  const prevPostIndex = postDetail.indexOf(selectedPost) - 1;

  const nextPost =
    nextPostIndex >= postDetail.length ? false : postDetail.at(nextPostIndex);
  const prevPost = prevPostIndex < 0 ? false : postDetail.at(prevPostIndex);
  const allPosts = postDetail.map((element) => element.data.title);

  return {
    props: {
      posts: allPosts,
      prev: prevPost,
      next: nextPost,
      data: selectedPost.data,
      content: selectedPost.content,
    },
  };
}

export async function getStaticPaths() {
  const categories = fs.readdirSync(path.join('posts'));
  const paths = [];

  categories.map((category) => {
    const posts = fs.readdirSync(path.join('posts', category));
    posts.map((post) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', category, post),
      );
      const {data, content} = matter(markdownWithMeta);
      paths.push({params: {noteId: category, pid: data.title}});
    });
  });
  return {
    paths,
    fallback: false,
  };
}
