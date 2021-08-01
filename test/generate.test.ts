import { readFileSync } from 'fs';

import { generate } from '../lib';
import { generate as browserGenerate } from '../lib/browser';
import TypescriptVisitor from '../lib/visitors/typescript/typescript';
import TypescriptMethodsVisitor from '../lib/visitors/typescript-methods/typescript-methods';

jest.useFakeTimers();

it('should not generate anything for an empty or missing schema', async () => {
  const generated = await generate("test/shapes/blabla", {
    'test/generated/empty.ts': ['typescript', 'typescript-methods'],
  });
  expect(generated).toBe([]);
});

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

it('matches snapshots when invoked from a browser env', async () => {
  const schemaFile = readFileSync('test/shapes/solidProfile.shex', {
    encoding: 'utf-8',
  });
  const generated = await browserGenerate({
    schema: schemaFile,
    visitors: [TypescriptVisitor, TypescriptMethodsVisitor],
    name: 'solidProfile',
  });
  expect(generated).toMatchSnapshot();
});
