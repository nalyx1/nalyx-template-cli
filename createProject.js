import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function createProject(templateDir, projectName) {
  console.log("Organizando estrutura do projeto...");
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  const packagePath = path.resolve(projectDir, "package.json");

  fs.mkdirSync(projectDir, { recursive: true });

  fs.cpSync(templateDir, projectDir, { recursive: true });

  const projectPackageJson = JSON.parse(
    fs.readFileSync(packagePath).toString()
  );
  projectPackageJson.name = projectName;
  projectPackageJson.description = "";
  projectPackageJson.keywords = [];
  projectPackageJson.author = "";

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(projectPackageJson, null, 2)
  );

  fs.renameSync(
    path.resolve(projectDir, "gitignore"),
    path.resolve(projectDir, ".gitignore")
  );

  console.log("Instalando as dependências...");

  process.chdir(projectName);
  execSync("git init -q");
  execSync("npm install");
  execSync("git config --global core.safecrlf false");
  execSync("git add --all");
  execSync('git commit -m "chore: projeto iniciado com nalyx-template-cli"');

  console.log("Projeto pronto!");
}

export default createProject;
