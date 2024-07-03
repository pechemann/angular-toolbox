/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AppBridgeCommand } from '../../../../public-api';

export const BRIDGE_COMMAND_NAME: string = "testCommand";

export const BRIDGE_COMMAND: AppBridgeCommand = (firstName: string, lastName: string)=> {
  console.log(`Hello ${firstName} ${lastName}!`);
}

export const FIRST_NAME: string = "John";
export const LAST_NAME: string = "Doe";
export const ERROR_MESSAGE: string = `Hello ${FIRST_NAME} ${LAST_NAME}!`;

import { Component } from "@angular/core";

@Component({
  template: `<h1>MockComponent</h1>`,
  standalone: true
})
export class MockComponent {}

export const getButton = (anchor: string | null = null): HTMLLinkElement => {
  const link: HTMLElement = document.createElement("a");
  if (anchor) link.setAttribute("href", anchor);
  return link as HTMLLinkElement;
}

export class MockEvent extends MouseEvent {
  constructor(private tgt: any) { super("click"); }
  override get target(): any {
    return this.tgt;
  }
}

export const addAnchor = (doc: any, name: string): HTMLElement => {
  const elm: HTMLElement = doc.createElement("div");
  elm.setAttribute("id", name);
  doc.body.appendChild(elm);
  return elm;
}

const ANCHOR_NAME_BASE: string = "my-anchor-";
let anchorIdx: number = 0;

export const getAnchorName = (): string => {
  anchorIdx++;
  return ANCHOR_NAME_BASE + anchorIdx;
}