/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";

export interface TestItem {
  value: string;
}

export const TEST_ITEM: TestItem = { value: "test item" };

export enum Key {
  Backspace = 'Backspace',
  Tab = 'Tab',
  Shift = 'Shift',
  Control = 'Control',
  Alt = 'Alt',
  Pause = 'Pause',
  CapsLock = 'CapsLock',
  Escape = 'Escape',
  Space = ' ',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  End = 'End',
  Home = 'Home',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  PrintScreen = 'PrintScreen',
  Insert = 'Insert',
  Delete = 'Delete',
  Digit0 = '0',
  Digit1 = '1',
  Digit2 = '2',
  Digit3 = '3',
  Digit4 = '4',
  Digit5 = '5',
  Digit6 = '6',
  Digit7 = '7',
  Digit8 = '8',
  Digit9 = '9',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
  e = 'e',
  f = 'f',
  g = 'g',
  h = 'h',
  i = 'i',
  j = 'j',
  k = 'k',
  l = 'l',
  m = 'm',
  n = 'n',
  o = 'o',
  p = 'p',
  q = 'q',
  r = 'r',
  s = 's',
  t = 't',
  u = 'u',
  v = 'v',
  w = 'w',
  x = 'x',
  y = 'y',
  z = 'z',
  Meta = 'Meta',
  ContextMenu = 'ContextMenu',
  AudioVolumeMute = 'AudioVolumeMute',
  AudioVolumeDown = 'AudioVolumeDown',
  AudioVolumeUp = 'AudioVolumeUp',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  NumLock = 'NumLock',
  ScrollLock = 'ScrollLock',
  Semicolon = ';',
  Equal = '=',
  Comma = ',',
  Minus = '-',
  Period = '.',
  Slash = '/',
  Backquote = '`',
  BracketLeft = '[',
  Backslash = '\\',
  BracketRight = ']',
  Quote = "'",
  Tilde = '~',
  Exclamation = '!',
  At = '@',
  Sharp = '#',
  Dollar = '$',
  Percent = '%',
  Caret = '^',
  Ampersand = '&',
  Asterisk = '*',
  ParenthesisLeft = '(',
  ParenthesisRight = ')',
  Underscore = '_',
  Plus = '+',
  OpenBrace = '{',
  CloseBrace = '}',
  Pipe = '|',
  Colon = ':',
  Quote2 = '"',
  AngleBracketLeft = '<',
  AngleBracketRight = '>',
  QuestionMark = '?'
};

@Component({
  template: `<div id="testElm" buttonRole (enter)="onEnter(item)"></div>`
})
export class ButtonRoleDirectiveTestComponent {

  protected readonly item: TestItem = TEST_ITEM;

  public onEnter(item: TestItem): void {}
}

@Component({
  template: `<div id="testElm" buttonRole delegateClick (enter)="onEnter(item)"></div>`
})
export class ButtonRoleDirectiveWithDelegationTestComponent {

  protected readonly item: TestItem = TEST_ITEM;

  public onEnter(item: TestItem): void {}
}

@Component({
  template: `<div id="testElm" buttonRole routerLink="/expectedUrl"></div>`
})
export class ButtonRoleDirectiveWithRouterLinkTestComponent implements AfterViewChecked {

  constructor(private _cdRef: ChangeDetectorRef) {}

  public ngAfterViewChecked(): void {
    this._cdRef.detectChanges();
  }
}
