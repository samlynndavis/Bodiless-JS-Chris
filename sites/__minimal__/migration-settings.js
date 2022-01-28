/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  /**
   * page url that should be scraped
   */
  url: 'https://example.com/',
  /**
   * crawler settings
   */
  crawler: {
    maxDepth: 100,
  },
  /**
   * page creator settings
   */
  pageCreator: {
    /**
     * enable/disable page creation
     *
     * set boolean or function that returns boolean
     */
    // isEnabled: pagePath => (new URL(pagePath)).pathname.startsWith('/products'),

    /**
     * name of created page index file
     *
     * set string or function that returns string
     */
    // pageIndexFile: pagePath => (new URL(pagePath)).pathname === '/' ? 'home.jsx' : 'default.jsx',
  },
  transformers: [
  ],
  /**
   * a list of plugins that can subscribe to events emitted by the tool
   */
  plugins: [
  ],
};
