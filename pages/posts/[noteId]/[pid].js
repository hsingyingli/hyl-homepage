import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import {Box, Container, Heading, Text, Image} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import ControlButtons from '../../../components/notes/prev-next-post-control';
import sortByDate from '../../../lib/sortByDate';

const SelectedPostsPage = ({data, prev, next, content}) => {
  const router = useRouter();
  return (
    <Container maxW="container.lg">
      <Box lineHeight={1.8} mx={{base:'none', md:10}} fontFamily='"M PLUS Rounded 1c", sans-serif'>
        <Box mb={5}>
          <Heading fontSize="3xl" my={2}>{data.title}</Heading>
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
    .map((post) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', params.noteId, post),
      );
      const {data, content} = matter(markdownWithMeta);
      return {data, content};
    })
    .sort(sortByDate);
  console.log(postDetail[0].data.id)  
  const selectedPost = postDetail.find((element) => {
    return element.data.id === params.pid;
  });
  const nextPostIndex = postDetail.indexOf(selectedPost) + 1;
  const prevPostIndex = postDetail.indexOf(selectedPost) - 1;
  console.log(postDetail)
  const nextPost =
    nextPostIndex >= postDetail.length ? false : postDetail.at(nextPostIndex);
  const prevPost = prevPostIndex < 0 ? false : postDetail.at(prevPostIndex);

  return {
    props: {
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
      const {data} = matter(markdownWithMeta);
      paths.push({params: {noteId: category, pid: data.id}});
    });
  });
  return {
    paths,
    fallback: false,
  };
}
