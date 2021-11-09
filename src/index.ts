#!/usr/bin/env node

import inquirer from "inquirer";
import shell from "shelljs";

const handleConfig = async () => {
  const finded = shell.find("./desition.config.json")[0];
  const regex = /desition|config|json/;

  if (regex.test(finded)) console.log(finded);
};

handleConfig();

enum Commands {
  Create = "Create new api module",
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

    // shell.mkdir(name);

    console.log(answers["create"]);
  }
  promptUser();
}

async function promptUser(): Promise<void> {
  // console.clear();
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
    case Commands.Quit:
      break;
  }
}

promptUser();
