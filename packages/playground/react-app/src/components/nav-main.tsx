import { Button, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { IconCirclePlusFilled, IconMail, type Icon } from '@tabler/icons-react';
import { Link, useLocation } from 'wouter';

export function NavMain({
  items,
  onNavigate,
}: {
  items: Array<{ title: string; url: string; icon?: Icon }>;
  onNavigate: () => void;
}) {
  const [location] = useLocation();

  return (
    <Stack gap={1}>
      <Text color="fg.muted" fontSize="xs" fontWeight="semibold" px={2} textTransform="uppercase">
        Workspace
      </Text>
      <Flex gap={1}>
        <Button colorPalette="primary" flex="1" justifyContent="flex-start" size="sm">
          <IconCirclePlusFilled />
          Quick create
        </Button>
        <IconButton aria-label="Inbox" size="sm" variant="outline">
          <IconMail />
        </IconButton>
      </Flex>
      {items.map((item) => {
        const active = location === item.url || (item.url === '/' && location === '/dashboard');
        return (
          <Button
            asChild
            justifyContent="flex-start"
            key={item.title}
            size="sm"
            variant={active ? 'subtle' : 'ghost'}
          >
            <Link href={item.url} onClick={onNavigate}>
              {item.icon && <item.icon />}
              {item.title}
            </Link>
          </Button>
        );
      })}
    </Stack>
  );
}
