const { execSync } = require("child_process");
const fs = require("fs");

// Configuration
const MAX_COMMITS = 95; // Maximum commits per run
const MIN_COMMITS = 50; // Minimum commits per run
const FILE_NAME = "contribution.txt"; // File to modify
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

// Function to execute shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "ignore" });
  } catch (error) {
    console.error(`Error executing command: ${command}\n`, error.message);
  }
};

// Function to generate a random commit count
const getRandomCommits = () =>
  Math.floor(Math.random() * (MAX_COMMITS - MIN_COMMITS + 1)) + MIN_COMMITS;

// Function to create and commit changes
const makeCommits = () => {
  const commits = getRandomCommits();
  console.log(`Generating ${commits} commits...`);

  for (let i = 0; i < commits; i++) {
    const message =
      COMMIT_MESSAGES[Math.floor(Math.random() * COMMIT_MESSAGES.length)];
    const timestamp = new Date().toISOString();

    // Modify file to create changes
    fs.appendFileSync(FILE_NAME, `Commit at: ${timestamp}\n`);

    // Git commands
    runCommand("git add .");
    runCommand(`git commit -m "${message}"`);
  }

  // Push changes
  runCommand("git push origin main");
  console.log(`✅ ${commits} commits pushed successfully! 🚀`);
};

// Run script
makeCommits();

//to run :
// cd gith
// node ./Script.js  
