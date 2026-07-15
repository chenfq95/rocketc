import { Box, Flex, Heading, Separator, Stack } from '@chakra-ui/react';
import {
  IconAlertCircle,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';

import RocketcIcon from '../assets/rocketc.svg?react';
import RocketcLogo from '../assets/rocketc.svg';
import { NavDocuments } from './nav-documents';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
  user: { name: 'chenfq95', email: 'chenfq95@foxmail.com', avatar: RocketcLogo },
  navMain: [
    { title: 'Dashboard', url: '/', icon: IconDashboard },
    { title: '404', url: '/404', icon: IconAlertCircle },
    { title: 'Shortcuts', url: '/shortcuts', icon: IconListDetails },
  ],
  navSecondary: [
    { title: 'Settings', url: '#', icon: IconSettings },
    { title: 'Get Help', url: '#', icon: IconHelp },
    { title: 'Search', url: '#', icon: IconSearch },
  ],
  documents: [
    { name: 'Data Library', url: '#', icon: IconDatabase },
    { name: 'Reports', url: '#', icon: IconReport },
    { name: 'Word Assistant', url: '#', icon: IconFileWord },
  ],
};

export function AppSidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <Flex
      bg="bg.panel"
      borderRightWidth="sm"
      direction="column"
      display={{ base: open ? 'flex' : 'none', md: 'flex' }}
      h="100svh"
      left={0}
      position={{ base: 'fixed', md: 'sticky' }}
      top={0}
      w="260px"
      zIndex={{ base: 'modal', md: 'base' }}
    >
      <Flex align="center" gap={2} h={12} px={4}>
        <Box color="primary.fg" h={5} w={5}>
          <RocketcIcon height="100%" width="100%" />
        </Box>
        <Heading size="sm">Rocketc Playground</Heading>
      </Flex>
      <Separator />
      <Stack flex="1" gap={5} overflowY="auto" p={3}>
        <NavMain items={data.navMain} onNavigate={onNavigate} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} />
      </Stack>
      <Separator />
      <Box p={3}>
        <NavUser user={data.user} />
      </Box>
    </Flex>
  );
}
