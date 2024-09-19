/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { IdentifiableComponent } from '../../core';
import { DropdownHorizontalPosition, DropdownVerticalPosition } from './util/dropdown-position';

@Component({
  selector: 'atx-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent extends IdentifiableComponent {

  @Input()
  public buttonClass!: string;

  @Input()
  public containerClass!: string;

  @Input()
  public vPos: DropdownVerticalPosition = "bottom";

  @Input()
  public hPos: DropdownHorizontalPosition = "left";

  protected id!: string;

  constructor() {
    super();
    this.id = this.getID().toString();
  }

  protected onToggle(event: Event): void { //Typescript bug ToggleEvent
    console.log(event)
  }
}
