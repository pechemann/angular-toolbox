/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AppBridgeCommand } from '../../../../public-api';

export const BRIDGE_COMMAND_NAME: string = "testCommand";

export const BRIDGE_COMMAND: AppBridgeCommand = (firstName: string, lastName: string)=> {
  console.log(`Hello ${firstName} ${lastName}!`);
}

export const FIRST_NAME: string = "John";
export const LAST_NAME: string = "Doe";
export const ERROR_MESSAGE: string = `Hello ${FIRST_NAME} ${LAST_NAME}!`;
