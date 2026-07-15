import { Button, ButtonGroup, Card, Flex, NativeSelect, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(2024, 3, index + 1);
  return {
    date: date.toISOString().slice(0, 10),
    desktop: 180 + ((index * 73) % 310),
    mobile: 120 + ((index * 47) % 290),
  };
});

const ranges = [
  { label: '90 days', value: '90' },
  { label: '30 days', value: '30' },
  { label: '7 days', value: '7' },
] as const;

export function ChartAreaInteractive() {
  const [range, setRange] = useState('90');
  const data = useMemo(() => chartData.slice(-Number(range)), [range]);

  return (
    <Card.Root minW={0}>
      <Card.Header>
        <Flex
          align={{ base: 'stretch', md: 'center' }}
          gap={3}
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <div>
            <Card.Title>Total visitors</Card.Title>
            <Card.Description>Desktop and mobile traffic over the selected period</Card.Description>
          </div>
          <ButtonGroup display={{ base: 'none', md: 'inline-flex' }} size="sm" variant="outline">
            {ranges.map((item) => (
              <Button
                colorPalette={range === item.value ? 'primary' : 'gray'}
                key={item.value}
                onClick={() => setRange(item.value)}
                variant={range === item.value ? 'subtle' : 'outline'}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
          <NativeSelect.Root display={{ base: 'block', md: 'none' }} size="sm">
            <NativeSelect.Field onChange={(event) => setRange(event.target.value)} value={range}>
              {ranges.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
      </Card.Header>
      <Card.Body pt={2}>
        <div style={{ height: 280, minWidth: 0, width: '100%' }}>
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="desktopFill" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chakra-colors-primary-solid)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chakra-colors-primary-solid)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
                <linearGradient id="mobileFill" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chakra-colors-info-solid)"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chakra-colors-info-solid)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--chakra-colors-border-subtle)" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="date"
                minTickGap={28}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                dataKey="desktop"
                fill="url(#desktopFill)"
                stroke="var(--chakra-colors-primary-solid)"
                type="monotone"
              />
              <Area
                dataKey="mobile"
                fill="url(#mobileFill)"
                stroke="var(--chakra-colors-info-solid)"
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Flex gap={4} mt={2}>
          <Text color="primary.fg" fontSize="xs">
            Desktop
          </Text>
          <Text color="info.fg" fontSize="xs">
            Mobile
          </Text>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
