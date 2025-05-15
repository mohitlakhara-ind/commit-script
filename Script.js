const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk"); // npm i chalk

// 🎯 Config
const MAX_COMMITS = 95;
const MIN_COMMITS = 50;
const FILE_NAME = "contribution.txt";
const COMMIT_MESSAGES = [
  "Another contribution added! 🚀",
  "Refactored some code 🛠️",
  "Small tweak, big impact! ⚡",
  "Improving GitHub stats 📈",
  "Keep pushing forward! 🔥",
  "Consistency is key! ✅",
  "Committing to the grind! 💻",
  "Automating progress! 🤖",
  "More commits, more fun! 🎉",
  "Daily streak maintained! 🔥",
];

// 📌 Helpers
const runCommand = (cmd) => {
  try {
    return execSync(cmd, { encoding: "utf-8", stdio: "pipe" }).trim();
  } catch (e) {
    console.error(chalk.red(`❌ Command failed: ${cmd}\n${e.message}`));
    process.exit(1);
  }
};

const getRandomCommits = () =>
  Math.floor(Math.random() * (MAX_COMMITS - MIN_COMMITS + 1)) + MIN_COMMITS;

// 👷 Main Logic
const makeCommits = () => {
  // Check if we're inside a git repo
  try {
    runCommand("git rev-parse --is-inside-work-tree");
  } catch {
    console.error(chalk.red("🚫 Not inside a git repository!"));
    process.exit(1);
  }

  // Auto-detect branch
  const branch = runCommand("git branch --show-current");

  const commits = getRandomCommits();
  console.log(chalk.cyan(`📦 Generating ${commits} commits on branch '${branch}'...`));

  // Ensure the file exists
  const filePath = path.resolve(FILE_NAME);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    console.log(chalk.yellow(`📄 Created ${FILE_NAME} file.`));
  }

  for (let i = 1; i <= commits; i++) {
    const message =
      COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)];
    const timestamp = new Date().toISOString();

    fs.appendFileSync(filePath, `Commit #${i} at: ${timestamp}\n`);
    runCommand("git add .");
    runCommand(`git commit -m "${message}"`);

    console.log(chalk.green(`✅ Commit ${i}/${commits}: ${message}`));
  }

  // Push
  runCommand(`git push origin ${branch}`);
  console.log(chalk.bold.green(`🚀 ${commits} commits pushed to '${branch}'!`));
};

// Run
makeCommits();
