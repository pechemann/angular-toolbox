/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { Todo } from '../../../model/business/todo';
import { TodoService } from '../../../model/service/todo.service';
import { TODOS_MOCK_CONFIG } from '../../../mock/todo/http-mock-config';
import { IdentifiableComponent, ContentRendererDirective, EMPTY_STRING, HttpMockService, SubscriptionService, HttpMock } from 'projects/angular-toolbox/src/public-api';
import { UserService } from '../../../model/service/user.service';
import { LogerService } from '../../../model/service/logger.service';
import { Log } from '../../../model/business/log';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoItemAction, TodoItemActionType } from '../../model/business/todo-item-action';

@HttpMock(TODOS_MOCK_CONFIG)
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    AngularToolboxPageTitleComponent,
    ReactiveFormsModule,
    DatePipe,
    TodoItemComponent,
    ContentRendererDirective
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  protected todoList: Todo[] | null = null;
  protected logList: Log[] = [];

  protected readonly todoForm: FormGroup;

  constructor(breadcrumb: BreadcrumbService,
              private todoService: TodoService,
              private userService: UserService,
              private loggerService: LogerService,
              private subscriptionService: SubscriptionService,
              private formBuilder: FormBuilder,
              private mockService: HttpMockService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Todo"));
    this.todoForm = this.formBuilder.group({
      todoInput: [EMPTY_STRING, Validators.required ]
    });
  }

  public ngOnInit(): void {
    this.todoForm.disable();
    this.subscriptionService.register(this,
      this.loggerService.onLog.subscribe((log: Log)=> this.logList.push(log))
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionService.clearAll(this);
  }

  protected userSelect(event: Event): void {
    const selectedId: number = parseInt((event.target as HTMLSelectElement).value);
    this.userService.setUserId(selectedId);
    this.todoList = null;
    this.todoForm.disable();
    if (selectedId === -1) return;
    this.subscriptionService.register(this,
      this.todoService.getTodoList().subscribe(todoList => {
        this.todoList = todoList;
        this.todoForm.enable();
      })
    );
  }

  protected createTodo(): void {
    if (this.todoForm.valid) {
      const title: string = this.todoForm.get("todoInput")?.value;
      this.resetForm();
      this.subscriptionService.register(this,
        this.todoService.createTodo(title).subscribe((todo: Todo)=> this.todoList?.push(todo))
      );
    }
  }

  protected deleteAllTodos(): void {
    this.subscriptionService.register(this,
      this.todoService.deleteTodoList().subscribe(_=> (this.todoList as any).length = 0 )
    );
  }

  protected resetForm(): void {
    this.todoForm.reset();
  }

  protected onUserInput(action: TodoItemAction): void {
    const type: TodoItemActionType = action.type;
    const todo: Todo = action.todo;
    if (type === "update") {
      this.subscriptionService.register(this,
        this.todoService.updateTodo(todo).subscribe()
      );
    } else if (type === "delete") {
      this.subscriptionService.register(this,
        this.todoService.deleteTodo(todo).subscribe(todoId => {
          if (!this.todoList) return;
          const idx: number | undefined = this.todoList.findIndex((todo: Todo)=> todo.id === todoId);
          this.todoList.splice(idx, 1);
        })
      );
    }
  }

  protected logRendered(elm: HTMLElement): void {
    elm.scrollTop = elm.scrollHeight;
  }
}
