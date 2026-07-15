import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { IconRocket } from '@tabler/icons-react';

import { LoginForm } from '../../components/login-form';

export default function LoginPage() {
  return (
    <Flex align="center" bg="bg.subtle" justify="center" minH="100svh" p={4}>
      <Stack gap={5} w="full" maxW="sm">
        <Flex align="center" gap={2} justify="center">
          <Box color="primary.fg">
            <IconRocket size={20} />
          </Box>
          <Heading size="sm">Rocketc Playground</Heading>
        </Flex>
        <LoginForm />
      </Stack>
    </Flex>
  );
}
