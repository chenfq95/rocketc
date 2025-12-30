import { createContainer } from './index';

describe('RocketC IOC Container', () => {
  let container: ReturnType<typeof createContainer>;

  beforeEach(() => {
    container = createContainer();
  });

  /**
   * Scenario 1: Basic Singleton and Property Injection
   */
  test('should inject dependencies correctly', () => {
    const serviceAId = Symbol('serviceA');
    const serviceBId = Symbol('serviceB');

    @container.register(serviceAId)
    class ServiceA {
      accessor name: string = 'ServiceA';
    }

    @container.register(serviceBId)
    class ServiceB {
      @container.inject<ServiceA>(serviceAId)
      accessor serviceA!: ServiceA;
    }

    const b = container.getObject<ServiceB>(serviceBId);
    expect(b.serviceA.name).toBe('ServiceA');

    // singleton validation
    const a1 = container.getObject(serviceAId);
    const a2 = container.getObject(serviceAId);
    expect(a1).toBe(a2);
  });

  /**
   * Scenario 2: Manual Object Registration
   */
  test('should register and retrieve manual objects', () => {
    const configId = 'config';
    container.registerObject(configId, { url: 'http://localhost' });
    const config: any = container.getObject(configId);
    expect(config.url).toBe('http://localhost');
  });

  /**
   * Scenario 3: Circular Dependency Detection
   */
  test('should handle circular dependencies via lazy injection', () => {
    const cycleAId = Symbol('cycleA');
    const cycleBId = Symbol('cycleB');

    @container.register(cycleAId)
    class CycleA {
      @container.inject(cycleBId) accessor b!: any;
    }

    @container.register(cycleBId)
    class CycleB {
      @container.inject(cycleAId) accessor a!: any;
    }

    const ca = container.getObject<CycleA>(cycleAId);
    const cb = container.getObject<CycleB>(cycleBId);
    expect(ca.b).toBe(cb);
    expect(cb.a).toBe(ca);
  });

  /**
   * Scenario 4: Error Handling
   */
  test('should catch and persist constructor errors', () => {
    const errorId = 'errorService';
    @container.register(errorId)
    class ErrorService {
      constructor() {
        throw new Error('Boom!');
      }
    }

    try {
      new ErrorService();
    } catch {}

    expect(() => container.getObject(errorId)).toThrow('Boom!');
    // Second call should still throw the same error from cache
    expect(() => container.getObject(errorId)).toThrow('Boom!');
  });

  /**
   * Scenario 5: eager initialization
   */
  test('should support eager initialization', () => {
    let initialized = false;
    const eagerId = 'eagerService';

    @container.register(eagerId, { eager: true })
    class EagerService {
      constructor() {
        initialized = true;
      }
    }

    expect(initialized).toBe(true);
    expect(container.getObject(eagerId)).toBeInstanceOf(EagerService);
  });

  /**
   * Scenario 6: Container Isolation
   */
  test('should isolate instances between containers', () => {
    const serviceAId = Symbol('serviceA');
    @container.register(serviceAId)
    class ServiceA {}

    new ServiceA();

    const container2 = createContainer();
    expect(() => container2.getObject(serviceAId)).toThrow();
  });

  /**
   * Scenario 7: Falsy Values in registerObject
   */
  test('should handle falsy values correctly in registerObject', () => {
    container.registerObject('zero', 0);
    container.registerObject('false', false);
    container.registerObject('emptyString', '');

    expect(container.getObject('zero')).toBe(0);
    expect(container.getObject('false')).toBe(false);
    expect(container.getObject('emptyString')).toBe('');
  });

  /**
   * Scenario 8: Deep Dependency Chain
   */
  test('should handle deep dependency chains', () => {
    const idA = 'A';
    const idB = 'B';
    const idC = 'C';

    @container.register(idA)
    class ServiceA {
      name = 'A';
    }

    @container.register(idB)
    class ServiceB {
      @container.inject<ServiceA>(idA) accessor a!: ServiceA;
    }

    @container.register(idC)
    class ServiceC {
      @container.inject<ServiceB>(idB) accessor b!: ServiceB;
    }

    const c = container.getObject<ServiceC>(idC);
    expect(c.b.a.name).toBe('A');
  });

  /**
   * Scenario 9: Multiple Injections
   */
  test('should support multiple injections in one class', () => {
    container.registerObject('config', { port: 8080 });

    @container.register('logger')
    class Logger {
      log(msg: string) {
        return msg;
      }
    }

    @container.register('app')
    class App {
      @container.inject<any>('config') accessor config!: any;
      @container.inject<Logger>('logger') accessor logger!: Logger;
    }

    const app = container.getObject<App>('app');
    expect(app.config.port).toBe(8080);
    expect(app.logger.log('hi')).toBe('hi');
  });

  /**
   * Scenario 10: Immediate Circular Dependency Access (Constructor)
   */
  test('should throw error when accessing circular dependency in constructor', () => {
    const idA = 'cycle-A';
    const idB = 'cycle-B';

    @container.register(idA)
    class ServiceA {
      @container.inject(idB) accessor b!: any;
      constructor() {
        // Accessing this.b here will trigger getObject(idB) -> getObject(idA)
        // which will find ServiceA in 'initializing' state.
        console.log(this.b);
      }
    }

    @container.register(idB)
    class ServiceB {
      @container.inject(idA) accessor a!: any;
      constructor() {
        console.log(this.a);
      }
    }

    try {
      new ServiceA();
    } catch {}

    try {
      new ServiceB();
    } catch {}

    expect(() => container.getObject(idA)).toThrow('already initializing');
  });

  /**
   * Scenario 11: Prevent Overwriting Registered Services
   */
  test('should throw error when registering same ID twice', () => {
    const id = 'same-id';

    @container.register(id)
    class First {}

    new First();

    expect(() => {
      @container.register(id)
      class Second {}
      return Second;
    }).toThrow('already registered');

    expect(() => {
      container.registerObject(id, {});
    }).toThrow('already registered');
  });

  /**
   * Scenario 12: registerObject edge cases
   */
  test('should throw error when registering undefined or null as object', () => {
    expect(() => container.registerObject('undef', undefined)).toThrow(
      'cannot register undefined',
    );
    expect(() => container.registerObject('null', null)).toThrow(
      'cannot register null',
    );
  });

  /**
   * Scenario 13: Eager Initialization Failure
   */
  test('should persist error during eager initialization', () => {
    const id = 'fail-eager';
    let count = 0;

    expect(() => {
      @container.register(id, { eager: true })
      class FailEager {
        constructor() {
          count++;
          throw new Error('Eager Fail');
        }
      }
      return FailEager;
    }).toThrow('Eager Fail');

    expect(count).toBe(1);
    // Future attempts should not retry but throw the same error
    expect(() => container.getObject(id)).toThrow('Eager Fail');
    expect(count).toBe(1);
  });
});
