/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AppBridgeCommand } from "../../model/business/lang/app-bridge-command";
import { AppBridgeError } from "../error";

/**
 * @private
 * The `AppBridge` class is an internal invoker utility that executes commans declared
 * by the `AppBridgeService` instance.
 */
export class AppBridge {
    
    /**
     * @private
     * Stores all commands registered by the `AppBridgeService` instance.
     */
    private readonly _commandMap: Map<string, AppBridgeCommand> = new  Map<string, AppBridgeCommand>();

    /**
     * Executes the command with the specified `name` parameter.
     * 
     * @param name The reference to the command to execute.
     * @param args The list of parmeters so be sent to the command.
     */
    public execute(name: string, ...args: any[]): void {
        const command: Function | undefined = this._commandMap.get(name);
        if (command) command.apply(null, args);
        else throw new AppBridgeError(`Invalid AppBridge command: method width name '${name}' does not exist.`);
    }
    
    /**
     * Registers a command.
     * 
     * @param name The name of the command to register.
     * @param command The command to register.
     */
    public addCommand(name: string, command: AppBridgeCommand): void {
        this._commandMap.set(name, command);
    }
    
    /**
     * Unregisters a command.
     * 
     * @param name The name of the command to unregister.
     * 
     * @returns `true` whether the command existed and has been removed; `false` otherwise.
     */
    public removeCommand(name: string): boolean {
        return this._commandMap.delete(name);
    }

    /**
     * Returns the command with the specified name.
     * 
     * @param name The name of the command to retrieve.
     * 
     * @returns Returns the command associated with the specified name.
     *          If no command is associated with the specified name, `undefined` is returned.
     */
    public getCommand(name: string): AppBridgeCommand | undefined {
        return this._commandMap.get(name);
    }

    /**
     * Returns a boolean indicating whether a command with the specified name exists or not.
     * 
     * @param name The name of the command to retrieve.
     * 
     * @returns Returns `true` whether the command exists; `false` otherwise.
     */
    public hasCommand(name: string): boolean {
        return this._commandMap.has(name);
    }
}