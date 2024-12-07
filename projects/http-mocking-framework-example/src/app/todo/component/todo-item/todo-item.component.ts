/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../model/business/todo';
import { TodoItemAction, TodoItemActionType } from '../../model/business/todo-item-action';

@Component({
    selector: 'todo-item',
    imports: [],
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  @Output()
  public readonly userInput: EventEmitter<TodoItemAction> = new EventEmitter<TodoItemAction>();

  @Input()
  public todo!: Todo;

  protected completedChange(event: Event): void {
    this.todo.completed = (event.target as HTMLInputElement).checked;
    this.dispatchEvent("update");
  }

  protected titleChange(event: Event): void {
    const titleValue: string = (event.target as HTMLInputElement).value;
    if (titleValue.length) {
      this.todo.title = titleValue;
      this.dispatchEvent("update");
    }
  }

  protected deleteTodo(): void {
    this.dispatchEvent("delete");
  }

  private dispatchEvent(type: TodoItemActionType): void {
    this.userInput.emit({
      todo: this.todo,
      type: type
    });
  }
}
