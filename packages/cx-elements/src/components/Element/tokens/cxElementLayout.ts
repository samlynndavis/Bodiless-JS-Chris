import { flowHoc } from '@bodiless/fclasses';
import { asTokenGroup } from '../../../util';

const meta = [
  flowHoc.meta.term('Type')('Element'),
  flowHoc.meta.term('Group')('Layout'),
];

export const cxElementLayout = asTokenGroup(...meta)({
  WithFlexCenterXY: ''
});
