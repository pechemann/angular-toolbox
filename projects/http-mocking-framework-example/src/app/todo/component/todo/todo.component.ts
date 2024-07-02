/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { Todo } from '../../../model/business/todo';
import { TodoService } from '../../../model/service/todo.service';
import { TODOS_MOCK_CONFIG } from '../../../mock/http-mock-config';
import { HttpMock, } from 'projects/angular-toolbox/src/lib/framework/mock/http/proxy';
import { AbstractIdentifiable, HttpMockService, SubscriptionService } from 'angular-toolbox';
import { UserService } from '../../../model/service/user.service';
import { LogerService } from '../../../model/service/logger.service';
import { Log } from '../../../model/business/log';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@HttpMock(TODOS_MOCK_CONFIG)
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    AngularToolboxPageTitleComponent,
    FormsModule,
    DatePipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent extends AbstractIdentifiable implements OnInit, OnDestroy {

  protected todoList: Todo[] = [];
  protected logList: Log[] = [];

  constructor(breadcrumb: BreadcrumbService,
              private _todoService: TodoService,
              private _userService: UserService,
              private _loggerService: LogerService,
              private _subscriptionService: SubscriptionService,
              private mockService: HttpMockService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Todo"));
  }

  public ngOnInit(): void {
    this._subscriptionService.register(this,
      this._loggerService.onLog.subscribe((log: Log)=> this.logList.push(log))
    );
  }

  public ngOnDestroy(): void {
    this._subscriptionService.clearAll(this);
  }

  protected userSelect(event: any): void {
    const userId: number = event.target.value;
    this._userService.setUserId(userId);
    if (userId === -1) {
      this.todoList.length = 0;
      return;
    }
    this._subscriptionService.register(this,
      this._todoService.getTodoList().subscribe(todoList => this.todoList = todoList)
    );
  }
}
