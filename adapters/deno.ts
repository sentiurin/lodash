type Modules = { [key: string]: any };

function readFiles(path: string): Promise<string[]> {
  console.debug(path);
  
  return new Promise(async (resolve, reject) => {
    const paths: string[] = [];

    try {
      for await (const entry of Deno.readDirSync(path)) {
        if (entry.isFile) {
          paths.push(entry.name);
        }
      }
    } catch (exception) {
      reject(exception);
    }

    console.debug(paths);

    resolve(paths);
  });
}

async function exportAll(path: string): Promise<Modules> {
  const modules: any = {};
  const paths = await readFiles(path);

  const jsFiles = paths.filter((fileName: string): boolean => {
    return !fileName.startsWith(".") && fileName.endsWith(".js");
  });

  await Promise.all(
    jsFiles.map(async (fileName) => {
      const name = fileName.split('.js')[0];
      
      try {
        modules[name] = (await import(`../${fileName}`)).default;
      } catch (exception) {}
    })
  );

  console.debug(modules);

  return modules;
}

export default exportAll(".");
