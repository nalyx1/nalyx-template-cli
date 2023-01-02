#! /usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import createProject from "./createProject.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.resolve(__dirname, "templates");
const projectDir = process.cwd();

const choices = fs.readdirSync(templatesDir);

const questions = [
  {
    name: "project-choice",
    type: "list",
    message: "Escolha um template:",
    choices: choices,
  },
  {
    name: "project-name",
    type: "input",
    message: "Nome do projeto:",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return "Digite um nome de projeto válido.";
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  const projectChoice = answers["project-choice"];
  const projectName = answers["project-name"];
  const templateDir = `${__dirname}/templates/${projectChoice}`;

  createProject(templateDir, projectName);
});
