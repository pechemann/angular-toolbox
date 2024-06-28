/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

// Source: https://ymnjk.csb.app/
export const USER_LIST_MOCK: User[] = [
    {
      id: 1,
      firstName: "Jasun",
      lastName: "Nolte",
      email: "jnolte0@imdb.com"
    },
    {
      id: 2,
      firstName: "Frasquito",
      lastName: "Bracknall",
      email: "fbracknall1@issuu.com"
    },
    {
      id: 3,
      firstName: "Annetta",
      lastName: "Gras",
      email: "agras2@slashdot.org"
    },
    {
      id: 4,
      firstName: "Mortimer",
      lastName: "Cloney",
      email: "mcloney3@lulu.com"
    },
    {
      id: 5,
      firstName: "Gwendolen",
      lastName: "Scoines",
      email: "gscoines4@qq.com"
    }
  ];