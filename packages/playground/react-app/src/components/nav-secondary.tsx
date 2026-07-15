import { Button, Stack, Text } from '@chakra-ui/react';
import { type Icon } from '@tabler/icons-react';

export function NavSecondary({
  items,
}: {
  items: Array<{ title: string; url: string; icon: Icon }>;
}) {
  return (
    <Stack gap={1} mt="auto">
      <Text color="fg.muted" fontSize="xs" fontWeight="semibold" px={2} textTransform="uppercase">
        Support
      </Text>
      {items.map((item) => (
        <Button asChild justifyContent="flex-start" key={item.title} size="sm" variant="ghost">
          <a href={item.url}>
            <item.icon />
            {item.title}
          </a>
        </Button>
      ))}
    </Stack>
  );
}
