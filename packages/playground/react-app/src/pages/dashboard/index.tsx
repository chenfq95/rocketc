import { Stack } from '@chakra-ui/react';

import { ChartAreaInteractive } from '../../components/chart-area-interactive';
import { DataTable } from '../../components/data-table';
import { SectionCards } from '../../components/section-cards';
import data from './data.json';

export default function DashboardPage() {
  return (
    <Stack gap={4}>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </Stack>
  );
}
