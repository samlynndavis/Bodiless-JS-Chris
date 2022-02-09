import { flowHoc, addClasses } from '@bodiless/fclasses';

export const asBox = flowHoc(
  addClasses('w-full h-36'),
  flowHocmeta.term('Component')('Box'),
  flowHocmeta.term('Attribute')('Styles'),
  flowHocmeta.term('Type')('Box'),
);

export const withBlueBorder = flowHoc(
  addClasses('border-blue-800 border-8'),
  flowHocmeta.term('Color')('Blue-Border'),
  flowHocmeta.term('Attribute')('border'),
);

export const withTealBorder = flowHoc(
  addClasses('border-teal-800 border-8'),
  flowHocmeta.term('Color')('Teal-Border'),
  flowHocmeta.term('Attribute')('border'),
);

export const asRounded = flowHoc(
  addClasses('rounded-2xl'),
  flowHocmeta.term('Border')('Rounded'),
  flowHocmeta.term('Attribute')('border-radius'),
);

export const asSquare = flowHoc(
  flowHocmeta.term('Border')('Square'),
);

export const asBlue = flowHoc(
  addClasses('bg-blue-800'),
  flowHocmeta.term('Color')('Blue'),
  flowHocmeta.term('Attribute')('bg-color'),
);
export const asOrange = flowHoc(
  addClasses('bg-orange-800'),
  flowHocmeta.term('Color')('Orange'),
  flowHocmeta.term('Attribute')('bg-color'),
);
export const asTeal = flowHoc(
  addClasses('bg-teal-800'),
  flowHocmeta.term('Color')('Teal'),
  flowHocmeta.term('Attribute')('bg-color'),
);
