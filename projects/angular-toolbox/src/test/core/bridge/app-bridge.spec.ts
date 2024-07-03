/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AppBridgeError } from '../../../lib/core/error/app-bridge-error';
import { AppBridge } from '../../../lib/core/bridge/app-bridge';
import { BRIDGE_COMMAND, BRIDGE_COMMAND_NAME, ERROR_MESSAGE, FIRST_NAME, LAST_NAME } from './test-util/app-bridge-test-utils';

describe('AppBridge', () => {

  let invoker: AppBridge;

  beforeEach(() => {
    invoker = new AppBridge();
  });

  it('should create an instance', () => {
    expect(invoker).toBeTruthy();
  });

  it('getCommand() should return undefined wheth no command is defiend for the specified name', () => {
    expect(invoker.getCommand(BRIDGE_COMMAND_NAME)).toBeUndefined();
  });

  it('addCommand() should add a new command accessible with the getCommand() method', () => {
    invoker.addCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
    expect(invoker.getCommand(BRIDGE_COMMAND_NAME)).toEqual(BRIDGE_COMMAND);
  });

  it('removeCommand() should return false when the command does not exist', () => {
    expect(invoker.removeCommand(BRIDGE_COMMAND_NAME)).toBeFalse();
  });

  it('removeCommand() should return true the command reference when it exists', () => {
    invoker.addCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
    expect(invoker.removeCommand(BRIDGE_COMMAND_NAME)).toBeTrue();
  });

  it('execute() should throw an excetion when the command does not exist', () => {
    expect(()=> invoker.execute(BRIDGE_COMMAND_NAME)).toThrow(new AppBridgeError("Invalid AppBridge command: method width name 'testCommand' does not exist."));
  });

  it('hasCommand() should return false wether the command with the specified name does not exist', () => {
    expect(invoker.hasCommand(BRIDGE_COMMAND_NAME)).toBeFalse();
  });

  it('hasCommand() should return true wether the command with the specified name exists', () => {
    invoker.addCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
    expect(invoker.hasCommand(BRIDGE_COMMAND_NAME)).toBeTrue();
  });

  it('execute() should invoke the command when it exists', () => {
    invoker.addCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
    spyOn(console, 'log');
    invoker.execute(BRIDGE_COMMAND_NAME);
    expect(console.log).toHaveBeenCalled();
  });

  it('execute() should invoke the command with the specified parameters', () => {
    invoker.addCommand(BRIDGE_COMMAND_NAME, BRIDGE_COMMAND);
    spyOn(console, 'log');
    invoker.execute(BRIDGE_COMMAND_NAME, FIRST_NAME, LAST_NAME);
    expect(console.log).toHaveBeenCalledWith(ERROR_MESSAGE);
  });
});
