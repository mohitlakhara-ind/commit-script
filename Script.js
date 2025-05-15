const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// 🎯 Config
const MAX_COMMITS = 35;
const MIN_COMMITS = 10;
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
const DRY_RUN = process.argv.includes("--dry-run");

// 📌 Helper to run shell commands
const runCommand = (cmd, env = {}) => {
  try {
    return execSync(cmd, { stdio: "pipe", encoding: "utf-8", env: { ...process.env, ...env } }).trim();
  } catch (err) {
    console.error(chalk.red(`❌ Failed: ${cmd}`));
    console.error(chalk.gray(err.message));
    if (!DRY_RUN) process.exit(1);
  }
};

// 🎲 Random integer in range
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ⏳ Pause for realism
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// 🧠 Generate random date within the past few days
const getRandomPastDate = () => {
  const daysAgo = randInt(0, 5);
  const hours = randInt(1, 23);
  const minutes = randInt(0, 59);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

// 🔁 Main Logic
const makeCommits = async () => {
  try {
    runCommand("git rev-parse --is-inside-work-tree");
  } catch {
    console.log(chalk.red("🚫 This isn’t a Git repo!"));
    process.exit(1);
  }

  const branch = runCommand("git branch --show-current");
  const totalCommits = randInt(MIN_COMMITS, MAX_COMMITS);
  console.log(chalk.cyan(`💥 Generating ${totalCommits} commits on '${branch}'...`));

  const filePath = path.resolve(FILE_NAME);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    console.log(chalk.yellow(`📄 Created ${FILE_NAME}`));
  }

  for (let i = 1; i <= totalCommits; i++) {
    const msg = COMMIT_MESSAGES[randInt(0, COMMIT_MESSAGES.length - 1)];
    const time = getRandomPastDate();
    fs.appendFileSync(filePath, `Commit #${i} at: ${time}\n`);

    runCommand("git add .");
    runCommand(`git commit -m "${msg}"`, {
      GIT_AUTHOR_DATE: time,
      GIT_COMMITTER_DATE: time,
    });

    console.log(chalk.green(`✅ ${i}/${totalCommits}: ${msg} [${time}]`));

    // 🔁 Add random delay between commits
    const delay = randInt(500, 3000); // 0.5s to 3s
    console.log(chalk.gray(`⏳ Waiting ${delay}ms before next commit...`));
    await sleep(delay);
  }

  if (!DRY_RUN) {
    runCommand(`git push origin ${branch}`);
    console.log(chalk.bold.green(`🚀 All ${totalCommits} commits pushed to '${branch}'!`));
  } else {
    console.log(chalk.blue(`🧪 Dry run complete. No commits pushed.`));
  }
};

// ⚙️ Run
makeCommits();
