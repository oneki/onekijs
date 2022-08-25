import { existsSync, mkdirSync, WriteFileOptions, writeFileSync } from 'fs';
import { join } from 'path';
import ElementContext from '../lib/context';

const defaultDirectories = {
  Enumerations: {
    label: 'Enumerations',
    directory: 'enum',
  },
  'Type alias': {
    label: 'Types',
    directory: 'types',
  },
  'Type literal': {
    label: 'Types',
    directory: 'types',
  },
  Functions: {
    label: 'Functions',
    directory: 'functions',
  },
  Interface: {
    label: 'Interfaces',
    directory: 'interfaces',
  },
  Components: {
    label: 'Components',
    directory: 'components',
  },
  Hooks: {
    label: 'Hooks',
    directory: 'hooks',
  },
};

const outputDir = process.argv[3];
const baseDocusaurusPath = process.argv[4];

export function getAbsoluteFilepath(element: ElementContext) {
  return join(outputDir, getFilepath(element));
}

export function getDocusaurusPath(element: ElementContext) {
  return join(baseDocusaurusPath, getFilepath(element));
}

export function getFilepath(element: ElementContext) {
  let path = '';
  if (element.groups[0]) {
    path += `/${element.groups[0].toLowerCase()}`;
  }
  if (element.categories[0]) {
    path += `/${element.categories[0].toLowerCase()}`;
  }
  path += `/${element.name}.md`;
  return path;
}

// code from https://gist.github.com/drodsou/de2ba6291aea67ffc5bc4b52d8c32abd
export function writeFileSyncRecursive(
  filename: string,
  content: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions,
) {
  // -- normalize path separator to '/' instead of path.sep,
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = filename.replace(/\\/g, '/');

  // -- preparation to allow absolute paths as well
  let root = '';
  if (filepath[0] === '/') {
    root = '/';
    filepath = filepath.slice(1);
  } else if (filepath[1] === ':') {
    root = filepath.slice(0, 3); // c:\
    filepath = filepath.slice(3);
  }

  // -- create folders all the way down
  const folders = filepath.split('/').slice(0, -1); // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + '/';
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
      }
      return folderPath;
    },
    root, // first 'acc', important
  );

  // -- write file
  writeFileSync(root + filepath, content, options);
}
