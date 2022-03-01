import React from 'react';
import { HOC } from '@bodiless/fclasses';

export const withNoop: HOC = Component => props => <Component {...props} />;
