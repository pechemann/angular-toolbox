/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, DOCUMENT, ElementRef, Inject, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { USER_LIST_MOCK, User } from '../subscription-service-demo/user-list.mock';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { ButtonRoleDataObject, ButtonRoleDirective } from 'projects/angular-toolbox/src/public-api';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
    selector: 'app-button-role-directive',
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
  protected selectedUser: User | null = null;

  constructor(breadcrumb: BreadcrumbService,
              @Inject(DOCUMENT) private document: Document) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
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
    @for (user of data; track user) {
        <tr buttonRole delegateClick (enter)="showModal($event)" [atxData]="user">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
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

  protected showModal(event: ButtonRoleDataObject<User>): void {
    this.selectedUser = event.data;
    this._modal.nativeElement.showModal();
  }

  protected closeModal(event: Event): void {
    const user: User | null = this.selectedUser;
    let idx: number = user ? user.id : 0;
    if (idx >= this.data.length) idx = 0;
    this._modal.nativeElement.close();
    // @ts-ignore
    setTimeout(()=> this.document.getElementById(`user_${idx}`)?.focus({ focusVisible: true }), 100);
  }
}
