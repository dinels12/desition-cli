import GenerateFiles from "@dinels/desition-helpers";

(async () => {
  try {
    const genInterfacesFiles = new GenerateFiles({
      routePath: "./**/interfaces/**/*.interface.ts",
      savePath: __dirname + "/app/interfaces",
      suffixStart: "I",
      typeSuffix: ".ts",
    });
    const files = await genInterfacesFiles.inspectFiles();
    await genInterfacesFiles.generateInterfaces(
      "index.ts",
      "./src/app/",
      files
    );
  } catch (e) {
    console.log(e);
  }
})();

(async () => {
  try {
    const genModelsFiles = new GenerateFiles({
      routePath: "./**/models/**/*.model.ts",
      savePath: __dirname + "/app/models",
      suffixEnd: "Model",
      typeSuffix: ".ts",
    });
    const files = await genModelsFiles.inspectFiles();
    await genModelsFiles.generateModels("index.ts", "./src/app/", files);
  } catch (e) {
    console.log(e);
  }
})();
