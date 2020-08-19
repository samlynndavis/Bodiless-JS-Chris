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

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { FetchChanges, PullChanges } from '../src/dist/RemoteChanges';

const mockUpstreamResponse = (data?: any) => ({
  status: 200,
  data: {
    upstream: {
      branch: 'null',
      commits: [],
      files: [],
      ...data,
    },
    production: { branch: 'origin/master', commits: [], files: [] },
    local: { branch: 'origin/test', commits: [], files: [] },
  },
});

const mockClient = (responseData?: any) => ({
  getChanges: jest.fn(() => Promise.resolve(mockUpstreamResponse(responseData))),
  pull: jest.fn(() => Promise.resolve({ status: 200 })),
  commit: jest.fn(() => Promise.resolve({ status: 200 })),
  getConflicts: () => jest.fn(() => Promise.resolve({ status: 200 })),
  getLatestCommits: () => jest.fn(() => Promise.resolve({ status: 200 })),
  reset: () => jest.fn(() => Promise.resolve({ status: 200 })),
});

const mockFormApi = {
  setValue: jest.fn(),
  getValue: jest.fn(),
};

const noChangesClient = mockClient();

const mockChangesClient = mockClient({
  branch: 'origin/feat/test',
  commits: ['Test Commit'],
  files: ['packages/gatsby-theme-bodiless/src/dist/RemoteChanges.tsx'],
});

const nonPullableChangesClient = mockClient({
  branch: 'null',
  commits: ['Test Commit'],
  files: ['packages/gatsby-theme-bodiless/src/dist/package-lock.json'],
});

describe('Fetch Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(
      <FetchChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should detect changes are available', async () => {
    const wrapper = mount(
      <FetchChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'There are updates available to be pulled. Click check (✓) to initiate.',
      );
    });
  });

  it('should detect changes are not available', async () => {
    const wrapper = mount(
      <FetchChanges
        client={noChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe('There are no changes to download.');
    });
  });

  it('should detect changes are available but cannot be pulled', async () => {
    const wrapper = mount(
      <FetchChanges
        client={nonPullableChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'report_problem_outlinedUpstream changes are available but cannot be fetched via the UI.',
      );
    });
  });
});

describe('Pull Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(
      <PullChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should pull changes', async () => {
    const wrapper = mount(
      <PullChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'Operation complete, page will refresh.',
      );
    });
  });
});
