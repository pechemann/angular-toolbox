/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { USER_LIST_MOCK, User } from '../subscription-service-demo/user-list.mock';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { ButtonRoleDirective } from 'angular-toolbox';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';

@Component({
  selector: 'app-button-role-directive',
  standalone: true,
  imports: [
    DemoComponent,
    ButtonRoleDirective
  ],
  templateUrl: './button-role-directive.component.html',
  styles: ['dialog { width: 400px; }']
})
export class ButtonRoleDirectiveComponent {

  @ViewChild("msgDialog")
  private _modal!: ElementRef<HTMLDialogElement>;

  protected data: User[] = USER_LIST_MOCK;
  protected selectedUser!: User;

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("ButtonRole Directive"));
  }

  protected documentation: DocumentationLink = {
    label: "ButtonRole Directive",
    commands: ['/resources', 'documentation', 'button-role-directive']
  };
  protected title: string = "ButtonRole Directive Demo";
  protected presentation: string = "An easy-to-use directive that enables keyboard navigation and provides support for keyboard <code>Enter</code> key events";
  protected srcCode: CodeWrapper = {
    html: [`...
<tbody>
    @for (item of data; track item) {
        <tr buttonRole delegateClick (enter)="showModal(item)">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
        </tr>
    }
</tbody>
...
`],
  typescript: [`export class ButtonRoleDirectiveComponent {

  protected data: User[] = USER_LIST_MOCK;

  protected showModal(user: User): void {
    this.modal.showModal(user);
  }
}`]
  };

  protected showModal(user: User): void {
    this.selectedUser = user;
    this._modal.nativeElement.showModal();
  }

  protected closeModal(): void {
    this._modal.nativeElement.close();
  }
}
