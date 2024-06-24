import { Component, ElementRef, ViewChild } from '@angular/core';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { USER_LIST_MOCK, User } from '../subscription-service-demo/user-list.mock';
import { DemoComponent } from '../../ui/component/demo/demo.component';
import { ButtonRoleDirective } from 'angular-toolbox';

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

  public title: string = "ButtonRole Directive Demo";
  public presentation: string = "An easy-to-use directive that enables keyboard navigation and provides support for keyboard <code>Enter</code> key events";
  public srcCode: CodeWrapper = {
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
