/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const checkSymlinkExists = dest => {
  // Cannot use fs.exists bc it checks the target of the symlink
  try {
    const stats = fs.lstatSync(dest);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Adds symlinks from site-level node_modules to their
 * equivalent at the repository root.  These are not created
 * by lerna, but are needed for some bodiess auto-discovery
 * mechanisms (docs, env vars, etc).
 *
 * @param string namespace 
 * The npm namespace to symlink.  Creates a symlink for the whole
 * namespace if it does not already exists, otehrwise, symlinks all
 * it's sub-packages.
 */
const setMissingSymlinks = namespace => {
  const nodeModules = path.resolve(path.join('.', 'node_modules'));
  if (!fs.existsSync(nodeModules)) fs.mkdirSync(nodeModules);
  const dest = path.resolve(path.join('.', 'node_modules', namespace));
  const source  = path.resolve(path.join('..', '..', 'node_modules', namespace));
  const  rel = path.relative(path.dirname(dest), source);
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    console.warn(source, 'does not exist or is not a direlctory, not symlinking it.');
  } else if (!checkSymlinkExists(dest)) {
    console.log('Symlinking', dest, '->', rel);
    fs.symlinkSync(rel, dest);
  } else {
    console.log('Symlink to ', dest, 'already exists.');
  }
}

const args = process.argv.slice(2);
args.forEach(arg => setMissingSymlinks(arg));
