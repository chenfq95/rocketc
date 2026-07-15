import { Box } from '@chakra-ui/react';

export default function EmptyLayout({ children }: React.PropsWithChildren) {
  return (
    <Box bg="bg" color="fg" minH="100svh">
      {children}
    </Box>
  );
}
