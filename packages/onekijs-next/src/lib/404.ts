/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getAllFiles = (
  fs: any,
  path: any,
  basePath: string,
  relativePath: string,
  arrayOfFiles: string[] = [],
): string[] => {
  const dirPath = path.join(basePath, relativePath);
  const files = fs.readdirSync(dirPath);

  for (let file of files) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(fs, path, basePath, relativePath + '/' + file, arrayOfFiles);
    } else {
      if (file !== '_app.js' && file !== '_document.js' && file !== '404.js' && file !== '_error.js') {
        const data = fs.readFileSync(dirPath + '/' + file, 'utf8');
        if (!data.includes('getStaticProps')) {
          file = file.slice(0, -3);
          if (file === 'index') {
            arrayOfFiles.push(relativePath);
            arrayOfFiles.push(relativePath + '/');
          } else {
            arrayOfFiles.push(relativePath + '/' + file);
          }
        }
      }
    }
  }

  return arrayOfFiles;
};

export interface Get404StaticProps {
  props: {
    routes: string[];
  };
}

export const get404StaticProps = (fs: any, path: any): Get404StaticProps => {
  // eslint-disable-next-line
  const routes = getAllFiles(fs, path, path.join(process.cwd(), '/src/pages'), '');
  return {
    props: { routes },
  };
};
