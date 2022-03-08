const fs = require('fs');
const express = require('express');
// const {
//   createDefaultContentPlugins,
//   getSampleDefaultContentConfig,
// } = require('@bodiless/gatsby-theme-bodiless/dist/DefaultContent');
const { getDisabledPages } = require('@bodiless/components/node-api');
// const getSSIEntities = require('@bodiless/gatsby-plugin-ssi/read-ssi-entities');
// const {
//   getConfig: getSiteDefaultContentConfig,
// } = require('./src/components/Contentful');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const SITEURL = process.env.SITE_URL;

const disablePageList = getDisabledPages();
const disabledPages = Object.keys(disablePageList).filter(
  item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
);

// Gatsby plugins list.
const plugins = [
  {
    resolve: 'gatsby-plugin-compile-es6-packages',
    options: {
      modules: ['@bodiless/gatsby-theme-bodiless'],
    },
  },
  {
    resolve: '@bodiless/gatsby-theme-bodiless',
    options: {
      gatsbyImage: {
        sharpArgs: {
          quality: 90,
        },
      },
      // Static replacement options, see docs for more info.
      static: {
        // Pass false to disable static replacement.
        // Defaults to true.
        enabled: true,
        // By default, all files ending in ".bl-edit" will be replaced with a file with the same
        // name, but ending in ".static" instead. You can exclude files providing an array of
        // strings or a RegExp instance to the setting below. The strings or regex will be matched
        // against the **absolute** path of the .bl-edit file being imported. Strings will be
        // concatenated into a RegExp instance like this: new RegExp(excludeArray.join('|')).
        // Defaults to an empty array.
        exclude: ['bodiless-richtext'],
        // Pass false to disable logging all resolving operations.
        // Defaults to true.
        logging: true,
      }
    },
  },
  // {
  //   resolve: '@bodiless/gatsby-plugin-ssi',
  //   options: {
  //     ssiEntities: getSSIEntities('ssi/ssi_conf.json'),
  //   }
  // },
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: SITEURL,
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: { excludes: disabledPages },
  },
  // ...createDefaultContentPlugins(
  //   ...getSampleDefaultContentConfig(),
  //   ...getSiteDefaultContentConfig(),
  // ),
  {
    resolve: '@bodiless/__cxstarter__',
  }
];

const robotsTxtPolicy = [
  {
    userAgent: '*',
    allow: '/',
  },
];
process.env.ROBOTSTXT_POLICY = JSON.stringify(robotsTxtPolicy);

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc', { fallthrough: false }));
  },
  siteMetadata: {
    siteUrl: SITEURL,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins,
};
