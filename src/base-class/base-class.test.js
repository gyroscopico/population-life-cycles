import BaseClass from './base-class';

test('Instance of BaseClass has an id property when instanciated.', () => {
  const result = new BaseClass();

  expect(result.id).not.toBe(undefined);
});

test('Instance of BaseClass has an id property that is 36 characters long.', () => {
  const result = new BaseClass();

  expect(result.id.length).toBe(36);
});

test('Instance of BaseClass can prefer to use a custom id.', () => {
  const id = 'this-is-a-custom-id';
  const result = new BaseClass({ id });

  expect(result.id).toBe(id);
});

test('Instance of BaseClass has a spawned property when instanciated.', () => {
  const result = new BaseClass();

  expect(result.spawned).not.toBe(undefined);
});

test('Unexpected property of BaseClass instance is undefined.', () => {
  const result = new BaseClass();

  expect(result.unexpectedProperty).toBe(undefined);
});

test('Custom property of BaseClass instance can be created when instanciated', () => {
  const result = new BaseClass({ customProperty: Math.PI });

  expect(result.customProperty).toBe(Math.PI);
});
