/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AppBridgeError } from '../../../lib/core/error/app-bridge-error';
import { AppBridge } from '../../../lib/core/bridge/app-bridge';

describe('AppBridge', () => {
  const commandRef: any = {
    name: "testCommand",
    action: (firstName: string, lastName: string)=> {
        console.log(`Hello ${firstName} ${lastName}!`);
    }
  };
  const FIRST_NAME: string = "John";
  const LAST_NAME: string = "Doe";
  const MESSAGE: string = `Hello ${FIRST_NAME} ${LAST_NAME}!`;
  
  let invoker: AppBridge;

  beforeEach(() => {
    invoker = new AppBridge();
  });

  it('should create an instance', () => {
    expect(invoker).toBeTruthy();
  });

  it('getCommand() should return undefined wheth no command is defiend for the specified name', () => {
    expect(invoker.getCommand(commandRef.name)).toBeUndefined();
  });

  it('addCommand() should add a new command accessible with the getCommand() method', () => {
    invoker.addCommand(commandRef.name, commandRef.action);
    expect(invoker.getCommand(commandRef.name)).toEqual(commandRef.action);
  });

  it('removeCommand() should return false when the command does not exist', () => {
    expect(invoker.removeCommand(commandRef.name)).toBeFalse();
  });

  it('removeCommand() should return true the command reference whe it exists', () => {
    invoker.addCommand(commandRef.name, commandRef.action);
    expect(invoker.removeCommand(commandRef.name)).toBeTrue();
  });

  it('execute() should throw an excetion when the command does not exist', () => {
    expect(()=> invoker.execute(commandRef.name)).toThrow(new AppBridgeError("Invalid AppBridge command: method width name 'testCommand' does not exist."));
  });

  it('execute() should invoke the command when it exists', () => {
    invoker.addCommand(commandRef.name, commandRef.action);
    spyOn(console, 'log');
    invoker.execute(commandRef.name);
    expect(console.log).toHaveBeenCalled();
  });

  it('execute() should invoke the command with the specified parameters', () => {
    invoker.addCommand(commandRef.name, commandRef.action);
    spyOn(console, 'log');
    invoker.execute(commandRef.name, FIRST_NAME, LAST_NAME);
    expect(console.log).toHaveBeenCalledWith(MESSAGE);
  });
});
