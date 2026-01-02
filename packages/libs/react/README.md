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

### 1. Import Styles

First, import the CSS file in your application:

```typescript
import '@rocketc/react/style.css';
```

### 2. Use Components

```typescript
import { Button } from '@rocketc/react';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

### 3. Important: Tailwind CSS is Built-in

**⚠️ Important**: This package includes Tailwind CSS styles built-in. **Do not configure Tailwind CSS in your project**, as it will cause style conflicts and override the component styles.

The components are pre-styled and ready to use without any additional Tailwind CSS setup.

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

### Built-in Tailwind CSS

This package includes Tailwind CSS styles built-in. **You should NOT configure Tailwind CSS in your consuming project**, as it will cause style conflicts and override the component styles.

### Customization

While you cannot use Tailwind CSS directly in your project, you can still customize components by:

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
