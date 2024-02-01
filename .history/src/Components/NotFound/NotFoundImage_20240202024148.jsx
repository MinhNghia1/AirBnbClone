import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from './NotFoundImage.module.css';

export function NotFoundImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Button variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
        </div>
        <Image src="https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}