import { observer } from 'mobx-react';
import asBreadcrumbStatic from './asBreadcrumb.static';

const asBreadcrumb: typeof asBreadcrumbStatic = (...args) => Component => observer(
  asBreadcrumbStatic(...args)(Component)
);

export default asBreadcrumb;
export * from './asBreadcrumb.static';
