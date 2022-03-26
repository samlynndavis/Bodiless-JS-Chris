// @ts-ignore
import walk from '@root/walk';

type RecursiveRenameProps = {
  path: string,
  search: string,
  replace: string,
}

export async function recursiveRename(props: RecursiveRenameProps) {
  const found: string[] = [];
  await walk.walk(props.path, async (err: any, pathname: any) => {
    if (err) {
      console.log('Warning could not stat', pathname, err.message);
      return;
    }
    if (new RegExp(props.search).test(pathname)) found.push(pathname);
  });
  console.log(found);
}
