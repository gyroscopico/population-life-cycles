import BaseClass from './base-class';

test('Instance of BaseClass has an id property when instanciated.', () => {
  const result = new BaseClass();

  expect(result.id).not.toBe(undefined);
});

test('Instance of BaseClass has a 36 characters long id property.', () => {
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
