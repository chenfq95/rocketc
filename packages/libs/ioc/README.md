# RocketC IOC Container

A lightweight dependency injection container based on TypeScript 5.0+ **Stage 3 Decorators**.

## Features

- 🚀 **Native Support**: Built on the latest `accessor` decorator proposal, no `reflect-metadata` required.
- 💎 **Type Safe**: Perfect TypeScript generic support.
- 🔄 **Cycle Detection**: Automatically detects synchronous circular references and throws friendly errors.
- 🛠️ **Lifecycle Management**: Supports both Lazy-loading (default) and Eager-loading.
- 📦 **Container Isolation**: Supports creating multiple independent container instances for better testing and modularity.

## Quick Start

### 1. Define and Register Services

Use the `@register(id)` decorator to register a class to the container.

```typescript
import { register } from '@rocketc/ioc';

export const USER_SERVICE = Symbol('USER_SERVICE');

@register(USER_SERVICE)
export class UserService {
  getUser(id: string) {
    return { id, name: 'Alice' };
  }
}
```

### 2. Inject Dependencies

Use the `@inject(id)` decorator on **`accessor`** properties.

```typescript
import { register, inject } from '@rocketc/ioc';
import { USER_SERVICE, type UserService } from './services';

@register('CONTROLLER')
class UserController {
  // Must use the 'accessor' keyword
  @inject<UserService>(USER_SERVICE)
  accessor userService!: UserService;

  showUser(id: string) {
    console.log(this.userService.getUser(id));
  }
}
```

### 3. Retrieve Instances

```typescript
import { getObject } from '@rocketc/ioc';

const controller = getObject<UserController>('CONTROLLER');
controller.showUser('123');
```

## Advanced Usage

### Eager Loading

By default, objects are initialized lazily. If you need to execute the constructor immediately upon registration:

```typescript
@register('APP_INIT', { eager: true })
class AppInit {
  constructor() {
    console.log('System initializing...');
  }
}
```

### Manual Object Registration

For configuration data or third-party instances, use `registerObject`:

```typescript
import { registerObject } from '@rocketc/ioc';

registerObject('API_CONFIG', {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
});
```

### Create Isolated Containers

In unit tests, you might need a clean container environment:

```typescript
import { createContainer } from '@rocketc/ioc';

const testContainer = createContainer();
testContainer.registerObject('MOCK_SERVICE', mockInstance);
const obj = testContainer.getObject('MOCK_SERVICE');
```

## Precautions

1.  **Constructor Restriction**: Classes decorated with `@register` must have a **no-argument constructor**.
2.  **Property Restriction**: Injection properties must use the `accessor` keyword.
3.  **Circular Dependency**: If `A` and `B` inject each other, avoid accessing the injected property directly within the `constructor`, as it will trigger a circular dependency exception.
