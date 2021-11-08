import { createContext } from 'react';
import { CuratorContextData } from './types';

const CuratorContext = createContext<CuratorContextData>({
  isLoaded: false,
});

export default CuratorContext;
