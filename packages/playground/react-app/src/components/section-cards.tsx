import { Badge, Card, Flex, Grid, Text } from '@chakra-ui/react';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

const metrics = [
  {
    label: 'Total Revenue',
    value: '$1,250.00',
    change: '+12.5%',
    detail: 'Visitors for the last 6 months',
    up: true,
  },
  {
    label: 'New Customers',
    value: '1,234',
    change: '-20%',
    detail: 'Acquisition needs attention',
    up: false,
  },
  {
    label: 'Active Accounts',
    value: '45,678',
    change: '+12.5%',
    detail: 'Engagement exceeds targets',
    up: true,
  },
  {
    label: 'Growth Rate',
    value: '4.5%',
    change: '+4.5%',
    detail: 'Meets growth projections',
    up: true,
  },
] as const;

export function SectionCards() {
  return (
    <Grid gap={3} templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}>
      {metrics.map((metric) => (
        <Card.Root key={metric.label} minW={0}>
          <Card.Header gap={2}>
            <Flex align="center" justify="space-between">
              <Card.Description>{metric.label}</Card.Description>
              <Badge colorPalette={metric.up ? 'success' : 'danger'} variant="subtle">
                {metric.up ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                {metric.change}
              </Badge>
            </Flex>
            <Card.Title fontSize="2xl" fontVariantNumeric="tabular-nums">
              {metric.value}
            </Card.Title>
          </Card.Header>
          <Card.Footer>
            <Text color="fg.muted" fontSize="sm">
              {metric.detail}
            </Text>
          </Card.Footer>
        </Card.Root>
      ))}
    </Grid>
  );
}
