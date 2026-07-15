import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  Field,
  Flex,
  IconButton,
  Input,
  NativeSelect,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheckFilled,
  IconLoader,
  IconPlus,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { z } from 'zod';

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

type DataRow = z.infer<typeof schema>;

export function DataTable({ data }: { data: DataRow[] }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [detail, setDetail] = useState<DataRow | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    return data.filter((row) =>
      [row.header, row.type, row.status, row.reviewer].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [data, query]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize);
  const allVisibleSelected = rows.length > 0 && rows.every((row) => selected.has(row.id));

  const toggleRow = (id: number, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const togglePage = (checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      rows.forEach((row) => {
        if (checked) next.add(row.id);
        else next.delete(row.id);
      });
      return next;
    });
  };

  return (
    <Card.Root minW={0}>
      <Card.Header>
        <Flex
          align={{ base: 'stretch', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap={3}
          justify="space-between"
        >
          <div>
            <Card.Title>Project outline</Card.Title>
            <Card.Description>
              {selected.size} of {filtered.length} rows selected
            </Card.Description>
          </div>
          <Flex gap={2}>
            <Input
              maxW={{ base: 'full', md: '260px' }}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Filter sections"
              size="sm"
              value={query}
            />
            <Button size="sm" variant="outline">
              <IconPlus />
              Add section
            </Button>
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body pt={0}>
        <Box borderWidth="sm" overflowX="auto">
          <Table.Root size="sm" variant="line">
            <Table.Header bg="bg.subtle">
              <Table.Row>
                <Table.ColumnHeader w={10}>
                  <Checkbox.Root
                    checked={allVisibleSelected}
                    onCheckedChange={(event) => togglePage(event.checked === true)}
                    size="sm"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Root>
                </Table.ColumnHeader>
                <Table.ColumnHeader>Header</Table.ColumnHeader>
                <Table.ColumnHeader>Section type</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Target</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Limit</Table.ColumnHeader>
                <Table.ColumnHeader>Reviewer</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>
                    <Checkbox.Root
                      checked={selected.has(row.id)}
                      onCheckedChange={(event) => toggleRow(row.id, event.checked === true)}
                      size="sm"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => setDetail(row)} px={0} size="sm" variant="plain">
                      {row.header}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="outline">{row.type}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={row.status === 'Done' ? 'success' : 'warning'}
                      variant="subtle"
                    >
                      {row.status === 'Done' ? (
                        <IconCircleCheckFilled size={14} />
                      ) : (
                        <IconLoader size={14} />
                      )}
                      {row.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell textAlign="end">{row.target}</Table.Cell>
                  <Table.Cell textAlign="end">{row.limit}</Table.Cell>
                  <Table.Cell>{row.reviewer}</Table.Cell>
                </Table.Row>
              ))}
              {rows.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={7} h={24} textAlign="center">
                    No results.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Box>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <Flex align="center" gap={2}>
          <Text color="fg.muted" fontSize="sm">
            Rows
          </Text>
          <NativeSelect.Root size="sm" w={20}>
            <NativeSelect.Field
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(0);
              }}
              value={pageSize}
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>
        <Flex align="center" gap={2}>
          <Text fontSize="sm">
            Page {safePage + 1} of {pageCount}
          </Text>
          <IconButton
            aria-label="Previous page"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
            size="sm"
            variant="outline"
          >
            <IconChevronLeft />
          </IconButton>
          <IconButton
            aria-label="Next page"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(safePage + 1)}
            size="sm"
            variant="outline"
          >
            <IconChevronRight />
          </IconButton>
        </Flex>
      </Card.Footer>

      <Dialog.Root
        open={detail !== null}
        onOpenChange={(event) => {
          if (!event.open) setDetail(null);
        }}
        size="md"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{detail?.header}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {detail && (
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>Header</Field.Label>
                    <Input defaultValue={detail.header} />
                  </Field.Root>
                  <Flex gap={3}>
                    <Field.Root>
                      <Field.Label>Target</Field.Label>
                      <Input defaultValue={detail.target} />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Limit</Field.Label>
                      <Input defaultValue={detail.limit} />
                    </Field.Root>
                  </Flex>
                  <Text color="fg.muted" fontSize="sm">
                    Reviewer: {detail.reviewer}
                  </Text>
                </Stack>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={() => setDetail(null)} variant="outline">
                Cancel
              </Button>
              <Button colorPalette="primary" onClick={() => setDetail(null)}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Card.Root>
  );
}
