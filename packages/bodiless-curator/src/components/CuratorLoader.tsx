// import { useEffect } from 'react';

const withCuratorLoader = (scriptFunction: any, scriptId: string) => {
  setTimeout(() => {
    // useEffect(() => {
    console.log(scriptId);
    // if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = scriptFunction;
    document.getElementsByTagName('body')[0].appendChild(script);
    // }
    // });
  }, 1000);
};

export default withCuratorLoader;
