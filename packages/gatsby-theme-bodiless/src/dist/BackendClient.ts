/**
 * Copyright © 2019 Johnson & Johnson
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

import path from 'path';
import axios from 'axios';
import { v1 } from 'uuid';

const backendPort = process.env.GATSBY_BODILESS_BACKEND_PORT || 8001;

type BackendClientConf = {
  baseUrl?: string,
  prefix?: string,
  clientId?: string,
};

export default class BackendClient {
  private root: string;

  private prefix: string;

  private clientId: string;

  private pendingRequests: string[] = [];

  constructor(backendClientConf?: BackendClientConf) {
    const {
      baseUrl = undefined,
      prefix = undefined,
      clientId = undefined,
    } = backendClientConf || {};
    let host = `http://localhost:${backendPort}`;
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      const loc = window.location;
      host = `${loc.protocol}//${loc.hostname}:${loc.port}`;
    }
    this.root = baseUrl || process.env.GATSBY_BODILESS_BACKEND_URL || host;
    this.prefix = prefix || process.env.GATSBY_BODILESS_BACKEND_PREFIX || '/___backend';
    this.clientId = clientId || v1();
  }

  setClientId(clientId: string) {
    this.clientId = clientId;
  }

  private getRequestOptions() {
    const options = {
      headers: { 'x-bl-clientid': this.clientId },
    };
    return options;
  }

  get(resourcePath: string) {
    return axios.get(this.root + resourcePath, this.getRequestOptions());
  }

  post(resourcePath: string, data: any) {
    const pendingRequests = this.pendingRequests;
    window.addEventListener('beforeunload', function (e) {
      if (pendingRequests.length > 0) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = 'Are you sure you want to leave?';
      };
    });
    const requestId = v1();
    this.pendingRequests.push(requestId);
    console.log(this.pendingRequests);
    return axios.post(this.root + resourcePath, data, this.getRequestOptions())
      .then(result => { this.pendingRequests = this.pendingRequests.filter(item => item !== requestId); return result;});
  }

  savePath(resourcePath: string, data: any) {
    const fullPath = path.join(this.prefix, 'content', resourcePath);
    return this.post(fullPath, data);
  }

  log(data: any) {
    const fullPath = path.join(this.prefix, 'log');
    return this.post(fullPath, data);
  }

  getPath(resourcePath: string) {
    const fullPath = path.join(this.prefix, 'content', resourcePath);
    return this.get(fullPath);
  }

  saveFile(file: string) {
    // eslint-disable-next-line no-undef
    const payload = new FormData();
    payload.append('file', file);
    return this.post(`${this.prefix}/asset/`, payload);
  }

  savePage(path$: string, template?: string) {
    const payload = {
      path: path$,
      template,
    };
    return this.post(`${this.prefix}/pages`, payload);
  }

  commit(
    message: string,
    directories: string[],
    paths: string[],
    files: string[],
    author?: string,
  ) {
    const d = directories || [];
    const p = paths || [];
    const f = files || [];
    const post = {
      message,
      dirs: Array.isArray(d) ? d : [d],
      paths: Array.isArray(p) ? p : [p],
      files: Array.isArray(f) ? f : [f],
      author,
    };
    return this.post(`${this.prefix}/change/commit`, post);
  }

  getLatestCommits() {
    return this.post(`${this.prefix}/get/commits`, {});
  }

  pull() {
    return this.post(`${this.prefix}/change/pull`, {});
  }

  reset() {
    return this.post(`${this.prefix}/change/reset`, {});
  }

  amend(paths: string[], files: string[]) {
    const p = paths || [];
    const f = files || [];
    const post = {
      paths: Array.isArray(p) ? p : [p],
      files: Array.isArray(f) ? f : [f],
    };
    return this.post(`${this.prefix}/change/amend`, post);
  }

  setCurrent(name: string) {
    return this.post(`${this.prefix}/set/current`, { name });
  }

  getSetList() {
    return this.get(`${this.prefix}/set/list`);
  }
}
