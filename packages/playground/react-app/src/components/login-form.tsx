import { Button, Card, Field, Input, Separator, Stack, Text } from '@chakra-ui/react';

export function LoginForm() {
  return (
    <Stack gap={4}>
      <Card.Root>
        <Card.Header textAlign="center">
          <Card.Title>Welcome back</Card.Title>
          <Card.Description>Login with your Apple or Google account</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap={4}>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={2}>
              <Button flex="1" variant="outline">
                Login with Apple
              </Button>
              <Button flex="1" variant="outline">
                Login with Google
              </Button>
            </Stack>
            <Separator />
            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input placeholder="m@example.com" type="email" />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Password</Field.Label>
              <Input type="password" />
              <Field.HelperText textAlign="right">Forgot your password?</Field.HelperText>
            </Field.Root>
            <Button colorPalette="primary" w="full">
              Login
            </Button>
            <Text color="fg.muted" fontSize="sm" textAlign="center">
              Don&apos;t have an account? Sign up
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
      <Text color="fg.muted" fontSize="xs" px={4} textAlign="center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </Stack>
  );
}
