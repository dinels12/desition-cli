import fs from "fs/promises";
import shell from "shelljs";
import templates from "./templates";

// type Templates =
//   | "model"
//   | "helper"
//   | "controller"
//   | "interface"
//   | "middleware"
//   | "routes";

const getSingularNameLowerCase = (name: string) => {
  let index = name.lastIndexOf("s");
  let newName = name.slice(0, index);

  return newName;
};

const getSingularNameUpperCase = (name: string) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

export const generateFiles = async (
  outputDir: string,
  name: string,
  apiVersion: string
) => {
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
      const singularName = name.endsWith("s")
        ? getSingularNameLowerCase(name)
        : name;
      await fs.writeFile(
        `${route}/${singularName}.${key}.ts`,
        item
          .replace(/NAMEL/g, singularName)
          .replace(/NAMEU/g, getSingularNameUpperCase(singularName))
          .replace(/APIVERSION/g, apiVersion)
      );
    });
    resolve("done");
  });
};
