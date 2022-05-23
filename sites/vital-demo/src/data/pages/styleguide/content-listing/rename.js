const fs = require('fs');

const paths = [
  'default$content$743e7ee0-c7ba-11ec-b2fa-f1d307274fa1$_tags.json',
  'default$content$743e7ee0-c7ba-11ec-b2fa-f1d307274fa1$image.json',
  'default$content$84195560-c7ba-11ec-b650-af804d5be96e$_tags.json',
  'default$content$84195560-c7ba-11ec-b650-af804d5be96e$image.json',
  'default$content$84e9c4c0-c7ba-11ec-b650-af804d5be96e$_tags.json',
  'default$content$84e9c4c0-c7ba-11ec-b650-af804d5be96e$image.json',
  'default$content.json',
  'default$filter$default$category_name.json',
  'default$filter$default$cham-sublist.json',
  'default$filter$default$sublist$48dcab34-b165-44c4-8c9f-512811ed6a18$tag.json',
  'default$filter$default$sublist$4bb1151d-6526-4c72-9d8e-845c1f0ef7cd$tag.json',
  'default$filter$default$sublist$default$tag.json',
  'default$filter$default$sublist.json',
];

const ps = paths.forEach(p => {
  const p1 = p.replace('default', 'styleguide-content-listing');
  fs.copyFileSync(p, `../../../site/${p1}`);
});
