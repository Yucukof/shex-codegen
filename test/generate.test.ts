import { readFileSync } from 'fs';
import { generate } from '../lib';
import { generate as browserGenerate } from '../lib/browser';

jest.useFakeTimers();

it('matches snapshots with config file', async () => {
  const generated = await generate();
  expect(generated).toMatchSnapshot();
});

it('matches snapshots without config file', async () => {
  const generated = await generate('test/shapes/solidProfile.shex', {
    'test/generated/withoutConfig.ts': ['typescript', 'typescript-methods'],
  });
  expect(generated).toMatchSnapshot();
});

it('matches snapshots when invoked programmatically', async () => {
  const schemaFile = readFileSync('test/shapes/solidProfile.shex', {
    encoding: 'utf-8',
  });
  const generated = await browserGenerate({
    schema: schemaFile,
    visitors: ['typescript', 'typescript-methods'],
    name: 'solidProfile',
  });
  expect(generated).toMatchSnapshot();
});
