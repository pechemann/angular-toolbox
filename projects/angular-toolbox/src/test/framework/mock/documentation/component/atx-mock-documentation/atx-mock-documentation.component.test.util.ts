/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockConfig, HttpMockEndpoint, HttpMockInterceptor, Uuid } from 'projects/angular-toolbox/src/public-api';

export const buildMockSkeleton = (): HttpMockConfig => {
  const cfg: HttpMockConfig = {
    interceptors: []
  };
  return cfg;
};

export const buildInterceptorSkeleton = (): HttpMockInterceptor => {
  const cfg: HttpMockInterceptor = {
    id: Uuid.build().toString(),
    endpoints: []
  };
  return cfg;
};

export const buildEndpointSkeleton = (route: string): HttpMockEndpoint => {
  const cfg: HttpMockEndpoint = {
    route: route
  };
  return cfg;
};
