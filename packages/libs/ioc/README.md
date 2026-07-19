# RocketC IOC 容器 / RocketC IOC Container

一个基于 TypeScript 5.0+ **Stage 3 装饰器**的轻量级依赖注入容器。

A lightweight dependency injection container based on TypeScript 5.0+ **Stage 3 Decorators**.

## 特性 / Features

- **原生支持**：基于最新的 `accessor` 装饰器提案，无需 `reflect-metadata`。<br>
  **Native Support**: Built on the latest `accessor` decorator proposal, with no `reflect-metadata` required.
- **类型安全**：完善的 TypeScript 泛型支持。<br>
  **Type Safety**: Full TypeScript generic support.
- **循环检测**：自动检测同步循环引用并抛出易于理解的错误。<br>
  **Cycle Detection**: Automatically detects synchronous circular references and throws clear errors.
- **生命周期管理**：同时支持延迟加载（默认）和立即加载。<br>
  **Lifecycle Management**: Supports both lazy loading (default) and eager loading.
- **容器隔离**：支持创建多个独立容器实例，便于测试和模块化。<br>
  **Container Isolation**: Supports multiple independent container instances for easier testing and modularity.

## 快速开始 / Quick Start

### 1. 定义并注册服务 / Define and Register Services

使用 `@register(id)` 装饰器将类注册到容器。

Use the `@register(id)` decorator to register a class with the container.

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

### 2. 注入依赖 / Inject Dependencies

在 **`accessor`** 属性上使用 `@inject(id)` 装饰器。

Use the `@inject(id)` decorator on **`accessor`** properties.

```typescript
import { register, inject } from '@rocketc/ioc';
import { USER_SERVICE, type UserService } from './services';

@register('CONTROLLER')
class UserController {
  // 必须使用 accessor 关键字。 / The accessor keyword is required.
  @inject<UserService>(USER_SERVICE)
  accessor userService!: UserService;

  showUser(id: string) {
    console.log(this.userService.getUser(id));
  }
}
```

### 3. 获取实例 / Retrieve Instances

```typescript
import { getObject } from '@rocketc/ioc';

const controller = getObject<UserController>('CONTROLLER');
controller.showUser('123');
```

## 高级用法 / Advanced Usage

### 立即加载 / Eager Loading

默认情况下，对象会延迟初始化。如需在注册后立即执行构造函数：

By default, objects are initialized lazily. To execute the constructor immediately after registration:

```typescript
@register('APP_INIT', { eager: true })
class AppInit {
  constructor() {
    console.log('System initializing...');
  }
}
```

### 手动注册对象 / Manual Object Registration

对于配置数据或第三方实例，请使用 `registerObject`：

For configuration data or third-party instances, use `registerObject`:

```typescript
import { registerObject } from '@rocketc/ioc';

registerObject('API_CONFIG', {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
});
```

### 创建隔离容器 / Create Isolated Containers

在单元测试中，可以创建一个干净的容器环境：

In unit tests, you can create a clean container environment:

```typescript
import { createContainer } from '@rocketc/ioc';

const testContainer = createContainer();
testContainer.registerObject('MOCK_SERVICE', mockInstance);
const obj = testContainer.getObject('MOCK_SERVICE');
```

## 注意事项 / Precautions

1. **构造函数限制**：使用 `@register` 装饰的类必须具有**无参数构造函数**。<br>
   **Constructor Restriction**: Classes decorated with `@register` must have a **no-argument constructor**.
2. **属性限制**：注入属性必须使用 `accessor` 关键字。<br>
   **Property Restriction**: Injection properties must use the `accessor` keyword.
3. **循环依赖**：如果 `A` 和 `B` 相互注入，请避免在 `constructor` 中直接访问注入属性，否则会触发循环依赖异常。<br>
   **Circular Dependency**: If `A` and `B` inject each other, avoid accessing the injected property directly in the `constructor`, because doing so triggers a circular dependency exception.
