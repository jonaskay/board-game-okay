#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const DEFAULT_AUDIO_DIR = "assets/episodes";
const EPISODES_DIR = "src/episodes";
const AUDIO_URL_BASE = "https://storage.googleapis.com/board-game-okay-feed";

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextEpisodeNumber(files) {
  let maxEpisode = 0;

  for (const file of files) {
    const match = file.match(/^(\d{3})\.md$/);
    if (!match) {
      continue;
    }
    const number = Number.parseInt(match[1], 10);
    if (number > maxEpisode) {
      maxEpisode = number;
    }
  }

  const next = maxEpisode + 1;
  return String(next).padStart(3, "0");
}

function parseAfinfoOutput(output) {
  const titleMatch = output.match(/^\s*title:\s*(.+)$/im);
  const durationMatch = output.match(/estimated duration:\s*([\d.]+)\s*sec/i);

  if (!durationMatch || !durationMatch[1]) {
    throw new Error("Could not read MP3 duration from afinfo output.");
  }

  const title = titleMatch ? titleMatch[1].trim() : "";
  const duration = Math.round(Number.parseFloat(durationMatch[1]));

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error("Invalid MP3 duration from afinfo output.");
  }

  return { title, duration };
}

function readTitleFromMdls(audioPath) {
  let output;
  try {
    output = execFileSync("mdls", ["-raw", "-name", "kMDItemTitle", audioPath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const details = error && typeof error.message === "string" ? error.message : "Unknown error";
    throw new Error(`Failed to run mdls on ${audioPath}: ${details}`);
  }

  const value = output.trim();
  if (!value || value === "(null)") {
    return "";
  }

  return value;
}

function readAudioMetadata(audioPath) {
  let output;
  try {
    output = execFileSync("afinfo", [audioPath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error("afinfo command is not available. This script requires macOS afinfo.");
    }
    const details = error && typeof error.message === "string" ? error.message : "Unknown error";
    throw new Error(`Failed to run afinfo on ${audioPath}: ${details}`);
  }

  const { title: afinfoTitle, duration } = parseAfinfoOutput(output);
  const title = afinfoTitle || readTitleFromMdls(audioPath);

  if (!title) {
    throw new Error(
      "MP3 metadata title is missing. Please set the title tag first so afinfo/mdls can read it."
    );
  }

  return { title, duration };
}

function escapeTitleForYaml(title) {
  return title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function getNewestMp3(audioDir) {
  const entries = await fs.readdir(audioDir, { withFileTypes: true });
  const mp3Names = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp3"))
    .map((entry) => entry.name);

  if (mp3Names.length === 0) {
    throw new Error(`No MP3 files found in ${audioDir}`);
  }

  const filesWithStats = await Promise.all(
    mp3Names.map(async (name) => {
      const filePath = path.join(audioDir, name);
      const stats = await fs.stat(filePath);
      return { filePath, mtimeMs: stats.mtimeMs, size: stats.size };
    })
  );

  filesWithStats.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return filesWithStats[0];
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const audioDirArg = args.find((arg) => !arg.startsWith("--")) || DEFAULT_AUDIO_DIR;
  const audioDir = path.resolve(process.cwd(), audioDirArg);
  const episodesDir = path.resolve(process.cwd(), EPISODES_DIR);

  try {
    const newestMp3 = await getNewestMp3(audioDir);

    const episodeFiles = await fs.readdir(episodesDir);
    const episodeNumber = getNextEpisodeNumber(episodeFiles);

    const { title, duration } = readAudioMetadata(newestMp3.filePath);

    const outputFile = path.join(episodesDir, `${episodeNumber}.md`);
    const safeTitle = escapeTitleForYaml(title);
    const content = `---\ntitle: "${safeTitle}"\ntype: "full"\nexplicit: "false"\ndate: ${getLocalDate()}\naudioUrl: ${AUDIO_URL_BASE}/${episodeNumber}-board-game-okay.mp3\naudioSize: ${newestMp3.size}\naudioDuration: ${duration}\n---\n\n`;

    console.log(`Selected MP3: ${newestMp3.filePath}`);
    console.log(`Next episode: ${episodeNumber}`);

    if (dryRun) {
      console.log(`\n[DRY RUN] Preview of ${outputFile}:`);
      console.log(content);
    } else {
      await fs.writeFile(outputFile, content, { flag: "wx" });
      console.log(`Created: ${outputFile}`);
    }
  } catch (error) {
    const message = error && typeof error.message === "string" ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exitCode = 1;
  }
}

main();
