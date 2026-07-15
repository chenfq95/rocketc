import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { AppSidebar } from '../components/app-sidebar';
import { SiteHeader } from '../components/site-header';

type AppLayoutProps = React.PropsWithChildren<{
  title: string;
}>;

export default function AppLayout({ children, title }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Flex bg="bg" color="fg" minH="100svh">
      <AppSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <Box
          bg="blackAlpha.600"
          display={{ base: 'block', md: 'none' }}
          inset={0}
          onClick={() => setSidebarOpen(false)}
          position="fixed"
          zIndex="overlay"
        />
      )}
      <Box flex="1" minW={0}>
        <SiteHeader onToggleSidebar={() => setSidebarOpen((value) => !value)} title={title} />
        <Box p={{ base: 3, md: 5 }}>{children}</Box>
      </Box>
    </Flex>
  );
}
