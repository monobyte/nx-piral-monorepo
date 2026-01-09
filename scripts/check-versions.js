#!/usr/bin/env node

/**
 * Version Check Script
 *
 * Displays current versions of all projects in the monorepo.
 * Useful for quick version overview before releases.
 *
 * Usage: node scripts/check-versions.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function getPackageJson(projectPath) {
  const pkgPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  }
  return null;
}

function getProjects(baseDir, type) {
  const dir = path.join(process.cwd(), baseDir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => {
      const projectPath = path.join(dir, name);
      return (
        fs.statSync(projectPath).isDirectory() &&
        fs.existsSync(path.join(projectPath, 'package.json'))
      );
    })
    .map((name) => {
      const projectPath = path.join(dir, name);
      const pkg = getPackageJson(projectPath);
      return {
        name: pkg?.name || name,
        version: pkg?.version || 'unknown',
        path: path.join(baseDir, name),
        type,
        private: pkg?.private || false,
      };
    });
}

function printTable(projects, title) {
  console.log(`\n${COLORS.bright}${COLORS.cyan}${title}${COLORS.reset}`);
  console.log('─'.repeat(60));

  if (projects.length === 0) {
    console.log(`${COLORS.dim}  No projects found${COLORS.reset}`);
    return;
  }

  const maxNameLen = Math.max(...projects.map((p) => p.name.length));
  const maxVersionLen = Math.max(...projects.map((p) => p.version.length));

  console.log(
    `  ${COLORS.dim}${'Name'.padEnd(maxNameLen)}  ${'Version'.padEnd(maxVersionLen)}  Path${COLORS.reset}`
  );

  projects.forEach((project) => {
    const versionColor = project.private ? COLORS.yellow : COLORS.green;
    const privateMarker = project.private ? `${COLORS.dim} (private)${COLORS.reset}` : '';

    console.log(
      `  ${COLORS.bright}${project.name.padEnd(maxNameLen)}${COLORS.reset}  ` +
        `${versionColor}${project.version.padEnd(maxVersionLen)}${COLORS.reset}  ` +
        `${COLORS.dim}${project.path}${COLORS.reset}${privateMarker}`
    );
  });
}

function main() {
  console.log(`\n${COLORS.bright}${COLORS.blue}📦 Monorepo Version Overview${COLORS.reset}`);
  console.log('═'.repeat(60));

  const apps = getProjects('apps', 'app');
  const packages = getProjects('packages', 'package');

  printTable(apps, '🚀 Applications');
  printTable(packages, '📚 Packages');

  // Summary
  console.log(`\n${COLORS.dim}─${'─'.repeat(59)}${COLORS.reset}`);
  console.log(
    `${COLORS.dim}Total: ${apps.length} apps, ${packages.length} packages${COLORS.reset}\n`
  );
}

main();
