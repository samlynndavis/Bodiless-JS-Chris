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

const React = require('react');
const oneLine = require('common-tags/lib/oneLine');
const { hasLogs, flush } = require('./dist/fsLogHandler');

exports.onRenderBody = ({
  setHeadComponents,
  pathname,
}) => {
  if (hasLogs()) {
    flush(`@bodiless/gatsby-theme: gatsby ssr errors found on pathname: ${pathname}`);
  }

  /**
   * For the browser not supporting lazy loading, Gatsby Image performs the transition from the
   * placeholder to the full image after the hydration, through a react hook.
   * This script allows to transition from the placeholder to the full image
   * for browers not supporting lazy loading, when gatsby image is not hydrated.
   */
  const lazyLoadingFallbackScript = oneLine`const e = "undefined" != typeof HTMLImageElement && "loading" in HTMLImageElement.prototype;
  const b = "undefined" != typeof IntersectionObserver && "undefined" != typeof IntersectionObserverEntry && "intersectionRatio" in IntersectionObserverEntry.prototype && "isIntersecting" in IntersectionObserverEntry.prototype;
  !e && b && document.addEventListener("load", (function(e) {
      let options = {
          threshold: 0.1
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            if (void 0 === entry.target.dataset.src) return;
            const t = entry.target;
            let a = null;
            let n = t;
            for (; null === a && n;) void 0 !== n.parentNode.dataset.gatsbyImageWrapper && (a = n.parentNode), n = n.parentNode;
            const o = a.querySelector("img[data-placeholder-image]");
            t.src = t.dataset.src;
            t.decode().catch((()=>{})).then((()=>{
              t.style.opacity = 1; o&&(o.style.opacity = 0, o.style.transition = "opacity 500ms linear"); observer.unobserve(t);
            }));
          }
        });
      }, options);
      const targets = document.querySelectorAll("img[loading='lazy']");
      targets.forEach((target) => observer.observe(target));
  }), !0);`;
  setHeadComponents([
    React.createElement('script', {
      key: 'lazy-loading-fallback-script',
      dangerouslySetInnerHTML: {
        __html: lazyLoadingFallbackScript,
      },
    })
  ]);
};
