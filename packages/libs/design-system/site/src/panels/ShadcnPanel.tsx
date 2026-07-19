import { AlertCircle, Info, TriangleAlert } from 'lucide-react';
import { useState } from 'react';

import { ColorSwatch } from '../ColorSwatch';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { type DesignThemeName } from '../previewModel';
import { displayColorSource } from '../tokenSource';

/** [token, cssVar, sourceToken] */
type ShadcnRole = readonly [string, string, string];

const shadcnRoleGroups: Array<{ title: string; roles: ShadcnRole[] }> = [
  {
    title: 'Surfaces',
    roles: [
      ['background', 'var(--background)', 'color.surface.canvas'],
      ['foreground', 'var(--foreground)', 'color.text.primary'],
      ['card', 'var(--card)', 'color.surface.panel'],
      ['card-foreground', 'var(--card-foreground)', 'color.text.primary'],
      ['popover', 'var(--popover)', 'color.surface.elevated'],
      ['popover-foreground', 'var(--popover-foreground)', 'color.text.primary'],
    ],
  },
  {
    title: 'Controls',
    roles: [
      ['primary', 'var(--primary)', 'color.control.primary.bg'],
      ['primary-foreground', 'var(--primary-foreground)', 'color.control.primary.fgContrast'],
      ['secondary', 'var(--secondary)', 'color.control.secondary.bgHover'],
      ['secondary-foreground', 'var(--secondary-foreground)', 'color.control.secondary.fg'],
      ['muted', 'var(--muted)', 'color.action.bgHover'],
      ['muted-foreground', 'var(--muted-foreground)', 'color.text.muted'],
      ['accent', 'var(--accent)', 'color.brand.soft'],
      ['accent-foreground', 'var(--accent-foreground)', 'color.brand.fg'],
      ['destructive', 'var(--destructive)', 'color.danger.solid'],
      ['destructive-foreground', 'var(--destructive-foreground)', 'color.danger.contrast'],
    ],
  },
  {
    title: 'Lines',
    roles: [
      ['border', 'var(--border)', 'color.border.default'],
      ['input', 'var(--input)', 'color.border.default'],
      ['ring', 'var(--ring)', 'color.border.focus'],
    ],
  },
  {
    title: 'Charts',
    roles: [
      ['chart-1', 'var(--chart-1)', 'color.brand.solid'],
      ['chart-2', 'var(--chart-2)', 'color.info.solid'],
      ['chart-3', 'var(--chart-3)', 'color.success.solid'],
      ['chart-4', 'var(--chart-4)', 'color.warning.solid'],
      ['chart-5', 'var(--chart-5)', 'color.danger.solid'],
    ],
  },
  {
    title: 'Sidebar',
    roles: [
      ['sidebar', 'var(--sidebar)', 'color.surface.panel'],
      ['sidebar-foreground', 'var(--sidebar-foreground)', 'color.text.primary'],
      ['sidebar-primary', 'var(--sidebar-primary)', 'color.control.primary.bg'],
      [
        'sidebar-primary-foreground',
        'var(--sidebar-primary-foreground)',
        'color.control.primary.fgContrast',
      ],
      ['sidebar-accent', 'var(--sidebar-accent)', 'color.action.bgHover'],
      ['sidebar-accent-foreground', 'var(--sidebar-accent-foreground)', 'color.text.primary'],
      ['sidebar-border', 'var(--sidebar-border)', 'color.border.subtle'],
      ['sidebar-ring', 'var(--sidebar-ring)', 'color.border.focus'],
    ],
  },
  {
    title: 'Status',
    roles: [
      ['success', 'var(--success)', 'color.success.solid'],
      ['success-foreground', 'var(--success-foreground)', 'color.success.contrast'],
      ['warning', 'var(--warning)', 'color.warning.solid'],
      ['warning-foreground', 'var(--warning-foreground)', 'color.warning.contrast'],
      ['info', 'var(--info)', 'color.info.solid'],
      ['info-foreground', 'var(--info-foreground)', 'color.info.contrast'],
    ],
  },
];

export function ShadcnPanel({ themeName }: { themeName: DesignThemeName }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div aria-label="shadcn preview" className="shadcn-scope grid gap-3 pt-2">
      <section className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-surface">
        <div className="mb-3 grid gap-1">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-foreground">Color</p>
          <h2 className="text-lg font-semibold tracking-tight">shadcn theme roles</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Short names from <code className="text-foreground">tailwind/theme.css</code> for theme{' '}
            <strong className="text-foreground">{themeName}</strong>.
          </p>
        </div>
        <div className="grid gap-4">
          {shadcnRoleGroups.map((group) => (
            <div key={group.title} className="grid gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.title}
              </h3>
              <div className="color-swatch-grid color-swatch-grid--shadcn">
                {group.roles.map(([token, cssVar, sourceToken]) => (
                  <ColorSwatch
                    background={cssVar}
                    key={token}
                    mapping={displayColorSource(themeName, sourceToken)}
                    token={token}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-surface">
        <div className="mb-3 grid gap-1">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-foreground">
            Components
          </p>
          <h2 className="text-lg font-semibold tracking-tight">Runtime themed controls</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Representative shadcn-style primitives driven by the Tailwind adapter.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Variants resolve through primary / accent / destructive.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Includes DS status extensions beyond the scaffold.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Form chrome uses border / input / ring tokens.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="shadcn-name">Name</Label>
                <Input id="shadcn-name" placeholder="Rocketc" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shadcn-notes">Notes</Label>
                <Textarea id="shadcn-notes" placeholder="Theme notes…" />
              </div>
              <div className="grid gap-2">
                <Label>Adapter</Label>
                <Select defaultValue="tailwind">
                  <SelectTrigger>
                    <SelectValue placeholder="Pick adapter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="css">CSS variables</SelectItem>
                    <SelectItem value="mui">MUI</SelectItem>
                    <SelectItem value="chakra">Chakra</SelectItem>
                    <SelectItem value="tailwind">Tailwind / shadcn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selection</CardTitle>
              <CardDescription>Checkbox and switch share primary / input fills.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="shadcn-terms" defaultChecked />
                <Label htmlFor="shadcn-terms">Accept token contract</Label>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="grid gap-0.5">
                  <Label htmlFor="shadcn-notify">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Muted copy on panel chrome.</p>
                </div>
                <Switch
                  id="shadcn-notify"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Alert surfaces for default and status intents.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Theme bridge loaded</AlertTitle>
                <AlertDescription>
                  Short names alias into <code>--rc-*</code> for the active data-theme.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Destructive</AlertTitle>
                <AlertDescription>Maps to color.danger.soft / fg / border.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <Info className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Maps to color.success.soft / fg / border.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Maps to color.warning.soft / fg / border.</AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>Maps to color.info.soft / fg / border.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Muted list + background active pill.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tokens">
                <TabsList>
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="bridge">Bridge</TabsTrigger>
                  <TabsTrigger value="apps">Apps</TabsTrigger>
                </TabsList>
                <TabsContent value="tokens">
                  Semantic roles stay the source of truth across adapters.
                </TabsContent>
                <TabsContent value="bridge">
                  Import css themes + <code>tailwind/theme.css</code>.
                </TabsContent>
                <TabsContent value="apps">
                  Keep switching with <code>data-theme</code>, not a separate .dark sheet.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>
                Popover / overlay elevation via background + shadow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm theme export</DialogTitle>
                    <DialogDescription>
                      This dialog uses background, border, and muted-foreground from the bridge.
                    </DialogDescription>
                  </DialogHeader>
                  <Separator />
                  <p className="text-sm">
                    Active theme: <strong>{themeName}</strong>
                  </p>
                  <DialogFooter>
                    <Button variant="secondary">Cancel</Button>
                    <Button>Continue</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Chart swatches above cover chart-1 / chart-2; sidebar roles reuse panel / primary.
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
