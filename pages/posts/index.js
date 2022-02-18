import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {useState} from 'react';
import {Box, Container, Select, Heading, SimpleGrid} from '@chakra-ui/react';
import Card from '../../components/notes/card';
import sortByDate from '../../lib/sortByDate';

const NotesPage = ({collection, categories}) => {
  const [value, setValue] = useState('');
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Container maxW="container.lg" p={10}>
      <Box maxW="300px">
        <Heading
          fontSize="xl"
          mb={3}
          fontFamily='"M PLUS Rounded 1c", sans-serif'
        >
          Category
        </Heading>

        <Select
          size="sm"
          value={value}
          placeholder="Select ..."
          onChange={handleOnChange}
        >
          {categories.map((category, index) => {
            return (
              <option value={category.replace('-', ' ')} key={index}>
                {category.replace('-', ' ')}
              </option>
            );
          })}
        </Select>
      </Box>
      <Box my={10}>
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
          {collection
            .filter((item) => {
              return item.category.replace('-', ' ').includes(value);
            })
            .map((item, index) => {
              return (
                <Card
                  key={index}
                  post={item.data}
                  href={`/posts/${item.category}/${item.data.title}`}
                  w="300px"
                  h="200px"
                  overflow='hidden'
                />
              );
            })}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default NotesPage;

export async function getStaticProps() {
  const categories = fs.readdirSync(path.join('posts'));
  const collection = [];

  categories.map((category) => {
    const postPool = fs.readdirSync(path.join('posts', category));
    postPool.map((post) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', category, post),
        'utf-8',
      );
      const {data} = matter(markdownWithMeta);

      collection.push({
        category,
        data,
      });
    });
  });

  return {
    props: {
      collection: collection.sort(sortByDate),
      categories,
    },
  };
}
