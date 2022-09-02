import { DeclarationReflection } from 'typedoc/dist/lib/serialization/schema';
import { Indexer } from './lib/indexer';
import { MarkdownBuilder } from './lib/markdown';
import { ElementParser } from './lib/parser';
import { readFileSync } from 'fs';

function readJsonFile(path: string) {
  const file = readFileSync(path, 'utf8');
  return JSON.parse(file);
}

const typedocJsonPath = process.argv[2];
const outputDir = process.argv[3];
const apiJson = readJsonFile(typedocJsonPath);
const api = apiJson as DeclarationReflection;

const indexer = new Indexer();
indexer.buildIndexes(api);

indexer.elements.forEach((e) => {
  const parser = new ElementParser(indexer);
  const parsedElement = parser.parse(e.element.id);

  if (parsedElement) {
    const builder = new MarkdownBuilder(parsedElement, outputDir);
    builder.build();
  }
});
