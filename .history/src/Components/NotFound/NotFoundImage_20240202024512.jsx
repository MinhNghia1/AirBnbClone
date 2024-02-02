import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from './NotFoundImage.module.css';
import { useNavigate } from 'react-router-dom';

export function NotFoundImage() {
  useNavigate
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>NOT FOUND! 404!</Title>
          <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={Navigate("/")}>
            Get back to home page
          </Button>
        </div>
        <Image src="https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}