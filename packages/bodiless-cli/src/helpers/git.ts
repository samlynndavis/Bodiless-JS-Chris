import Spawner from './Spawner';

function listTagsSync(repoDir: string) {
  const spawner = new Spawner();
  spawner.options.stdio = 'pipe';
  spawner.options.cwd = repoDir;
  return spawner.execSync('git', 'tag', '-l', '--sort=-version:refname', '"v*"')
    .toString()
    .split('\n')
    .filter(Boolean);
}
export function listBranchesSync(repoDir: string) {
  const spawner = new Spawner();
  spawner.options.stdio = 'pipe';
  spawner.options.cwd = repoDir;
  return spawner.execSync('git', 'branch', '-r')
    .toString()
    .split('\n')
    .filter(Boolean)
    .map(b => b.trim())
    .sort();
}
export function listVersionsSync(repoDir: string) {
  return listTagsSync(repoDir).filter(v => v.match(/^v(\d+\.)?(\d+\.)?(\d+)$/));
}
