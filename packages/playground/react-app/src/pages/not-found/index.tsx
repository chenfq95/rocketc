import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'wouter';

import NotFoundIllustration from '../../assets/not-found.svg?react';

export default function NotFoundPage() {
  return (
    <Flex align="center" bg="bg.subtle" justify="center" minH="100svh" p={6}>
      <Stack align="center" gap={4} maxW="md" textAlign="center">
        <NotFoundIllustration height={260} width={320} />
        <Heading fontSize="5xl">404</Heading>
        <Heading size="md">Page not found</Heading>
        <Text color="fg.muted">The requested page does not exist or has been moved.</Text>
        <Button asChild colorPalette="primary">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </Stack>
    </Flex>
  );
}
