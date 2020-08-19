# `@bodiless/gatsby-theme-bodiless`

> TODO: description

## Usage

```
const gatsbyThemeBodiless = require('@bodiless/gatsby-theme-bodiless');

// TODO: DEMONSTRATE API
```
### Plugins

#### Robots.txt

gatsby-plugin-robots-txt is leveraged to automatically generate robots.txt for a site. The plugin is enabled by default and will generate the following robots.txt file.
```
User-agent: *
Allow: /
```
In order to disable robots.txt plugin, set ROBOTSTXT_ENABLED env variable to '0'
```
ROBOTSTXT_ENABLED='0'
```
In order to add sitemap.xml to the generated robots.txt file, set ROBOTSTXT_SITEMAP env variable to your site sitemap.xml
```
ROBOTSTXT_SITEMAP='https://www.example.com/sitemap.xml'
```
In order to add host to the generated robots.txt file, set ROBOTSTXT_HOST env variable to your site host
```
ROBOTSTXT_HOST='https://www.example.com/'
```
In order to define custom rules in the generated robots.txt, set ROBOTSTXT_POLICY env variable to JSON string containing a list of policies. Format required for policies is described in https://github.com/itgalaxy/generate-robotstxt/tree/65abc04050ee0bb7bc1612163eb5af8c416c6994#usage
```
ROBOTSTXT_POLICY='[{"userAgent":"*","allow":"/","disallow":"/search","crawlDelay":10}]'
```
or in your site gatsby-config.js
```
const policies = [
  {
    userAgent: '*',
    allow: '/',
    disallow: '/search',
    crawlDelay: 10,
  },
];
process.env.ROBOTSTXT_POLICY = JSON.stringify(policies);
```

#### CSS compilation

Tailwind CSS compilation is configured and enabled by default. One can disable css compilation by setting BODILESS_TAILWIND_THEME_ENABLED env variable to '0'.

Tailwind CSS compilation is configured using PostCSS approach. gatsby-plugin-postcss is leveraged for this purpose.

#### CSS purging

Tailwind CSS purging is configured and enabled by default. One can disable css purging by setting BODILESS_PURGE_CSS_ENABLED env variable to '0'.

CSS purging is enabled for @bodiless/ui tailwind css and for site level tailwind css. Assumption is made that site level tailwind styles are in `src/css/style.css`. One can override path to site level styles by configuring BODILESS_TAILWIND_SITE_CSS env variable.

#### Exclude imported CSS from static builds

One can exclude css resources from static build by configuring BODILESS_ADMIN_ONLY_CSS_FILES environment variable. By default, all css resources are included to the static build.
