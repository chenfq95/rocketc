import { Button, Stack, Text } from '@chakra-ui/react';
import { type Icon } from '@tabler/icons-react';

export function NavDocuments({
  items,
}: {
  items: Array<{ name: string; url: string; icon: Icon }>;
}) {
  return (
    <Stack gap={1}>
      <Text color="fg.muted" fontSize="xs" fontWeight="semibold" px={2} textTransform="uppercase">
        Documents
      </Text>
      {items.map((item) => (
        <Button asChild justifyContent="flex-start" key={item.name} size="sm" variant="ghost">
          <a href={item.url}>
            <item.icon />
            {item.name}
          </a>
        </Button>
      ))}
    </Stack>
  );
}
