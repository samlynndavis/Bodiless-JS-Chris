import React, { ComponentType, useEffect, useState } from 'react';
import CuratorContext from './CuratorContext';
declare global {
  interface Window {
    /**
     * Curator calls this function when the page has finished downloading the
     * JavaScript for the API.
     */
    onCuratorReady: Function;
  }
}

const CuratorProvider: ComponentType<any> = ({
  scriptFunction,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = scriptFunction;
    document.getElementsByTagName('body')[0].appendChild(script);
  });

  useEffect(() => {
    window.onCuratorReady = () => {
      setIsLoaded(true);
    };
  });

  return (
    <CuratorContext.Provider value={{ isLoaded }}>
      {children}
    </CuratorContext.Provider>
  );
};

export default CuratorProvider;
