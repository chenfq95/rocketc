# @rocketc/react

A collection of React UI components built with Radix UI and Tailwind CSS.

---

## Features

- **Built on Radix UI**: Accessible, unstyled components with full keyboard navigation
- **Built-in Tailwind CSS**: Tailwind CSS styles are included and pre-configured (no setup required)
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Customizable**: Customize components using CSS variables and className props
- **Accessible**: Built with accessibility in mind, following WAI-ARIA guidelines
- **Modern**: Uses the latest React features and best practices

## Installation

```bash
# npm
npm install @rocketc/react

# yarn
yarn add @rocketc/react

# pnpm
pnpm add @rocketc/react
```

## Peer Dependencies

This package requires React and React DOM as peer dependencies:

```bash
npm install react react-dom
```

## Quick Start

Import the styles and start using components:

```typescript
// Import styles
import '@rocketc/react/style.css';

// Use components
import { Button } from '@rocketc/react';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

For more styling options, including using with your own Tailwind CSS setup, see the [Styling](#styling) section below.

## Available Components

### Layout & Structure

- **Accordion** - Collapsible content sections
- **Aspect Ratio** - Maintain aspect ratios for responsive media
- **Card** - Container for content with header, body, and footer
- **Collapsible** - Show and hide content with animations
- **Resizable** - Resizable panels and containers
- **Scroll Area** - Custom scrollable areas
- **Separator** - Visual divider between content sections
- **Sheet** - Slide-over panel component
- **Sidebar** - Side navigation component

### Navigation

- **Breadcrumb** - Navigation breadcrumbs
- **Command** - Command palette and search interface
- **Context Menu** - Right-click context menu
- **Dropdown Menu** - Dropdown menu component
- **Menubar** - Horizontal menu bar
- **Navigation Menu** - Navigation menu with submenus
- **Pagination** - Page navigation controls
- **Tabs** - Tabbed interface

### Form Components

- **Button** - Button component with variants
- **Button Group** - Group of buttons
- **Checkbox** - Checkbox input
- **Calendar** - Date picker calendar
- **Form** - Form wrapper with validation
- **Input** - Text input field
- **Input Group** - Input with addons
- **Input OTP** - One-time password input
- **Label** - Form label
- **Radio Group** - Radio button group
- **Select** - Select dropdown
- **Slider** - Range slider input
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input
- **Toggle** - Toggle button
- **Toggle Group** - Group of toggle buttons

### Feedback

- **Alert** - Alert message component
- **Alert Dialog** - Modal alert dialog
- **Dialog** - Modal dialog component
- **Drawer** - Drawer/sheet component
- **Empty** - Empty state component
- **Progress** - Progress indicator
- **Skeleton** - Loading skeleton placeholder
- **Sonner** - Toast notification system
- **Spinner** - Loading spinner
- **Tooltip** - Tooltip component

### Data Display

- **Avatar** - User avatar component
- **Badge** - Badge/tag component
- **Chart** - Chart component (using Recharts)
- **Hover Card** - Card that appears on hover
- **Kbd** - Keyboard key indicator
- **Popover** - Popover component
- **Table** - Data table component

### Media

- **Carousel** - Image/content carousel

## Examples

### Button

```typescript
import { Button } from '@rocketc/react';

function Example() {
  return (
    <div>
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Dialog

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@rocketc/react';

function Example() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content goes here</p>
      </DialogContent>
    </Dialog>
  );
}
```

### Form with Validation

```typescript
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@rocketc/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function Example() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Toast Notifications

```typescript
import { toast } from '@rocketc/react/sonner';

function Example() {
  return (
    <Button
      onClick={() => {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        });
      }}
    >
      Show Toast
    </Button>
  );
}
```

## Hooks

### `useMobile`

Detect if the current device is mobile:

```typescript
import { useMobile } from '@rocketc/react';

function Example() {
  const isMobile = useMobile();

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

## Styling

This package supports two usage modes:

### Standalone Mode (Built-in Tailwind CSS)

By default, this package includes Tailwind CSS styles built-in. Simply import `style.css`:

```typescript
import '@rocketc/react/style.css';
```

This is the simplest way to get started - no additional Tailwind CSS setup required.

### With Your Own Tailwind CSS Setup

If you want to use this package alongside your own Tailwind CSS configuration:

1. **Install Tailwind CSS** (if not already installed):

```bash
npm install -D tailwindcss
```

1. **Import styles in the correct order** (important: `tailwind.css` must come **before** `style.css`):

```typescript
// Import tailwind.css first, then style.css
import '@rocketc/react/tailwind.css';
import '@rocketc/react/style.css';

import { Button, Card } from '@rocketc/react';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <Button className="w-full sm:w-auto">
          Responsive Button
        </Button>
      </Card>
      {/* You can use Tailwind CSS classes freely */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">Item 1</div>
        <div className="bg-green-100 p-4 rounded">Item 2</div>
        <div className="bg-purple-100 p-4 rounded">Item 3</div>
      </div>
    </div>
  );
}
```

This allows you to use both the pre-styled components and your own Tailwind CSS classes in the same project.

**⚠️ Important**: When using with your own Tailwind CSS setup, **do not configure custom Tailwind variables** (such as colors, spacing, fonts, etc. in your `tailwind.config.js`). Custom Tailwind variable configurations may conflict with the component theme and cause unexpected styling issues. You can still use Tailwind utility classes freely, but avoid overriding the default Tailwind configuration variables.

### Customization

You can customize components in several ways:

**⚠️ Important**: **Do not configure custom Tailwind variables** in your `tailwind.config.js` (colors, spacing, fonts, etc.), as this may conflict with the component theme. Use the customization methods below instead.

**Using CSS variables**: Components use CSS variables for theming. You can override these variables in your global CSS:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables */
}
```

**Using className prop**: Most components accept a `className` prop for additional styling:

```typescript
<Button className="my-custom-class">Click me</Button>
```

**Using Tailwind CSS classes** (when using with your own Tailwind setup):

```typescript
<Button className="mt-4 px-6 py-2">Click me</Button>
```

**CSS overrides**: You can override component styles using CSS specificity:

```css
.my-custom-button {
  /* Your custom styles */
}
```

## TypeScript

This package is written in TypeScript and provides full type definitions. All components and their props are fully typed.

## Browser Support

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

## Related Packages

- [`@rocketc/shortcuts`](../shortcuts/README.md) - Pure JavaScript shortcut solution
- [`@rocketc/react-use-shortcuts`](../react-use-shortcuts/README.md) - React hooks for keyboard shortcuts

## License

Distributed under the MIT License. See `LICENSE` for more information.
