import { Grid, Skeleton, Stack } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Stack gap={4} p={4}>
      <Grid gap={4} templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}>
        <Skeleton h={28} />
        <Skeleton h={28} />
        <Skeleton h={28} />
      </Grid>
      <Skeleton h={72} />
    </Stack>
  );
}
