#!/usr/bin/env node

import inquirer from "inquirer";
import shell from "shelljs";
import fs from "fs/promises";
import { generateFiles } from "./lib/generateFiles";

let config = {
  outputDir: "./",
  apiVersion: "v1",
};

const handleConfig = async () => {
  const fileName = "./desition.config.json";
  const finded = shell.find(fileName)[0];
  const regex = /desition|config|json/;
  if (regex.test(finded)) {
    const data = await fs.readFile(finded, "utf8");
    config = JSON.parse(data);
  } else {
    await fs.writeFile(fileName, JSON.stringify(config));
  }
};

enum Commands {
  Create = "Create new api module",
  Generate = "Generate the Interfaces and Models",
  Quit = "Quit",
}

async function promptCreate(): Promise<void> {
  console.clear();
  const answers = (await inquirer.prompt({
    type: "input",
    name: "create",
    message: "Enter Api Name:",
  })) as any;
  if (answers["create"] !== "") {
    const name = answers["create"];
    const { outputDir, apiVersion } = config;
    const result = outputDir + `/${apiVersion}/${name}`;
    const finded = shell.find(result)[0];
    if (!finded) {
      console.log("wait a sec. we are generating new api module");
      await generateFiles(result, name, apiVersion);
    } else {
      console.log("The module already exists");
    }
  }
  promptUser();
}

async function promptUser(): Promise<void> {
  await handleConfig();
  console.clear();

  const answers = (await inquirer.prompt({
    type: "list",
    name: "command",
    message: "Choose option",
    choices: Object.values(Commands),
  })) as any;

  switch (answers["command"]) {
    case Commands.Create:
      promptCreate();
      break;
    case Commands.Generate:
      shell.exec("yarn generate");
      break;
    case Commands.Quit:
      break;
  }
}

promptUser();
