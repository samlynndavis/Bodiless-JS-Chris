/**
 * Copyright © 2022 Johnson & Johnson
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

import React from 'react';
import { stylable } from '@bodiless/fclasses';

// @todo update this placeholder with the real design icon
const Search = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    {...props}
  >
    <path fill="#F0F" d="m7.7 6.29 5.78 5.78-1.41 1.42L6.28 7.7z" />
    <circle cx="4.5" cy="4.5" r="3.5" stroke="#F0F" strokeWidth="2" />
  </svg>

);

const SearchIcon = stylable(Search);

export default SearchIcon;
