import { Flex, Heading, IconButton, Separator, Switch, Text } from '@chakra-ui/react';
import { IconMenu2 } from '@tabler/icons-react';

import { usePlaygroundTheme } from '../theme';

export function SiteHeader({
  onToggleSidebar,
  title,
}: {
  onToggleSidebar: () => void;
  title: string;
}) {
  const { mode, toggleMode } = usePlaygroundTheme();

  return (
    <Flex
      align="center"
      bg="bg.panel"
      borderBottomWidth="sm"
      gap={3}
      h={12}
      px={{ base: 3, md: 5 }}
      position="sticky"
      top={0}
      zIndex="docked"
    >
      <IconButton
        aria-label="Toggle navigation"
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onToggleSidebar}
        size="sm"
        variant="ghost"
      >
        <IconMenu2 />
      </IconButton>
      <Separator h={4} orientation="vertical" />
      <Heading size="sm">{title}</Heading>
      <Flex align="center" gap={2} ml="auto">
        <Text color="fg.muted" fontSize="sm">
          Dark mode
        </Text>
        <Switch.Root checked={mode === 'dark'} onCheckedChange={toggleMode} size="sm">
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Flex>
    </Flex>
  );
}
