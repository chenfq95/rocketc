import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  return (
    <Flex align="center" gap={3} minW={0}>
      <Avatar.Root size="sm">
        <Avatar.Image alt={user.name} src={user.avatar} />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
      <Box minW={0}>
        <Text fontSize="sm" fontWeight="medium" truncate>
          {user.name}
        </Text>
        <Text color="fg.muted" fontSize="xs" truncate>
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
}
