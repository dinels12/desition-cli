import fs from "fs/promises";
import shell from "shelljs";
import templates from "./templates";

export const generateFiles = async (outputDir: string, name: string) => {
  return await new Promise(async (resolve, reject) => {
    let files = [
      "/controllers",
      "/controllers/helpers",
      "/interfaces",
      "/middlewares",
      "/models",
      "/routes",
    ];
    files = files.map((item) => outputDir + item);
    files.push(outputDir);
    shell.mkdir("-p", files);
    Object.keys(templates).map(async (key) => {
      const item = templates[key] as string;
      const regex = new RegExp(key, "g");
      const route = files.find((item) => regex.test(item));
      //   console.log(route, item);
      await fs.writeFile(
        `${route}/${name}.${key}.ts`,
        item.replace("NAME", name)
      );
    });
    resolve("done");
  });
};
