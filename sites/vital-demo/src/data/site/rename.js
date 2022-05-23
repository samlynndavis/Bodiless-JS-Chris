const fs = require('fs');

const paths = [
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$category_name.json',
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$cham-sublist.json',
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$sublist$1cba8f2f-ce47-4e55-b949-e5624cf366e4$tag.json',
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$sublist$209784d3-427c-47a4-b75f-5d88c253cc23$tag.json',
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$sublist$2e90dc51-87e6-40f1-a948-d0f51cc4faa5$tag.json',
'filter$674ac63b-372b-4c1a-a17e-e75da61d8ba1$sublist.json',
'filter.json',
];

// const paths$ = [
// 'content-listing$36b32ff0-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$36b32ff0-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$36b32ff0-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$45d9f8b0-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$45d9f8b0-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$45d9f8b0-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$4977fb30-c096-11ec-b4cb-4b38911e4861$_tags.json',
// 'content-listing$4977fb30-c096-11ec-b4cb-4b38911e4861$image.json',
// 'content-listing$4977fb30-c096-11ec-b4cb-4b38911e4861$link.json',
// 'content-listing$4a6c2b00-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$4a6c2b00-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$4a6c2b00-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$4fb21cf0-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$4fb21cf0-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$4fb21cf0-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$5270a0b0-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$5270a0b0-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$5270a0b0-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$57424d00-bfed-11ec-a123-9fedd17f17d4$_tags.json',
// 'content-listing$57424d00-bfed-11ec-a123-9fedd17f17d4$image.json',
// 'content-listing$57424d00-bfed-11ec-a123-9fedd17f17d4$link.json',
// 'content-listing$76cc9ab0-bfe1-11ec-9ff0-39dc6dcea05c$_tags.json',
// 'content-listing$76cc9ab0-bfe1-11ec-9ff0-39dc6dcea05c$image.json',
// 'content-listing$76cc9ab0-bfe1-11ec-9ff0-39dc6dcea05c$link.json',
// 'content-listing$7e194730-bfe3-11ec-b6fd-5b8e76310bac$_tags.json',
// 'content-listing$7e194730-bfe3-11ec-b6fd-5b8e76310bac$image.json',
// 'content-listing$7e194730-bfe3-11ec-b6fd-5b8e76310bac$link.json',
// 'content-listing$bf5937b0-c7c6-11ec-a0b9-13ae2b680a52$_tags.json',
// 'content-listing$bf5937b0-c7c6-11ec-a0b9-13ae2b680a52$image.json',
// 'content-listing$bf5937b0-c7c6-11ec-a0b9-13ae2b680a52$link.json',
// 'content-listing$bfff89d0-c7c6-11ec-a0b9-13ae2b680a52$_tags.json',
// 'content-listing$bfff89d0-c7c6-11ec-a0b9-13ae2b680a52$image.json',
// 'content-listing$bfff89d0-c7c6-11ec-a0b9-13ae2b680a52$link.json',
// 'content-listing$ff9c3ff0-c7b9-11ec-b2fa-f1d307274fa1$_tags.json',
// 'content-listing$ff9c3ff0-c7b9-11ec-b2fa-f1d307274fa1$image.json',
// 'content-listing$ff9c3ff0-c7b9-11ec-b2fa-f1d307274fa1$link.json',
// 'content-listing.json',
// ];

paths.forEach(p => fs.renameSync(p, `content-listing$${p}`));

// paths.forEach(p => {
//   const p$ = p.replace('content-listing', 'content-listing$content');
//   fs.renameSync(p, p$);
// });