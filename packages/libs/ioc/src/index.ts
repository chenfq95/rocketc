export type ObjectUniqueId = string | symbol;

export function createContainer() {
  const objectStore = new Map<
    ObjectUniqueId,
    | {
        ObjectCtor: new () => unknown;
        status: 'uninitialized' | 'initializing';
      }
    | {
        ObjectCtor?: new () => unknown;
        status: 'initialized';
        object: unknown;
      }
    | {
        ObjectCtor?: new () => unknown;
        status: 'failed';
        error: Error;
      }
  >();

  function register(id: ObjectUniqueId, { eager = false }: { eager?: boolean } = {}) {
    return (Value: unknown, context: DecoratorContext) => {
      if (context.kind !== 'class') {
        throw new Error('object decorator can only be used on a class');
      }
      const Ctor = Value as new () => unknown;
      if (Ctor.length > 0) {
        throw new Error('object constructor must have no arguments');
      }
      if (objectStore.has(id)) {
        throw new Error(`object ${String(id)} already registered`);
      }
      objectStore.set(id, {
        ObjectCtor: Ctor,
        status: 'uninitialized',
      });
      if (eager) {
        getObject<unknown>(id);
      }
    };
  }

  function inject<T = unknown>(id: ObjectUniqueId) {
    return (_target: unknown, context: DecoratorContext) => {
      if (context.kind === 'accessor') {
        return {
          get() {
            return getObject<T>(id);
          },
          set() {
            throw new Error("container's object field is read only");
          },
          init(value) {
            return value;
          },
        } satisfies ClassAccessorDecoratorResult<unknown, T>;
      }
      throw new Error('inject decorator can only be used on a accessor field.');
    };
  }

  function registerObject(id: ObjectUniqueId, object: unknown) {
    if (objectStore.has(id)) {
      throw new Error(`object ${String(id)} already registered`);
    }
    if (object === undefined) {
      throw new Error(`cannot register undefined instance`);
    }
    if (object === null) {
      throw new Error(`cannot register null instance`);
    }
    objectStore.set(id, {
      ObjectCtor: undefined,
      status: 'initialized',
      object,
    });
  }

  function getObject<T>(id: ObjectUniqueId): T {
    const objectInfo = objectStore.get(id);
    if (!objectInfo) {
      throw new Error(`object ${String(id)} not found`);
    }
    if (objectInfo.status === 'failed') {
      throw objectInfo.error;
    }
    if (objectInfo.status === 'initializing') {
      throw new Error(`object ${String(id)} is already initializing, this maybe a cycle reference`);
    }
    if (objectInfo.status === 'uninitialized') {
      if (objectInfo.ObjectCtor === undefined) {
        throw new Error(`object ${String(id)} is not a class`);
      }
      objectInfo.status = 'initializing';
      try {
        const object = new objectInfo.ObjectCtor!();
        objectStore.set(id, {
          ObjectCtor: objectInfo.ObjectCtor,
          status: 'initialized',
          object,
        });
        return object as T;
      } catch (error) {
        objectStore.set(id, {
          ObjectCtor: objectInfo.ObjectCtor,
          status: 'failed',
          error: error instanceof Error ? error : new Error(String(error)),
        });
        throw error;
      }
    }
    if (objectInfo.status === 'initialized') {
      return objectInfo.object as T;
    }
    throw new Error(`object ${String(id)} is not initialized`);
  }
  return {
    register,
    inject,
    registerObject,
    getObject,
  };
}

const globalContainer = createContainer();

export const register = globalContainer.register;
export const inject = globalContainer.inject;
export const registerObject = globalContainer.registerObject;
export const getObject = globalContainer.getObject;
