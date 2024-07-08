/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { TodoDas } from './das/todo.das';
import { Observable } from 'rxjs';
import { Todo } from '../business/todo';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class TodoService {

  constructor(private todoDas: TodoDas,
              private userService: UserService) { }

  public getTodoList(): Observable<Todo[]> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDas.getAll(currentuserid);
  }

  public deleteTodoList(): Observable<Todo[]> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDas.deleteAll(currentuserid);
  }

  public createTodo(title: string): Observable<Todo> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDas.create(currentuserid, title);
  }

  public deleteTodo(todo: Todo): Observable<number> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDas.delete(currentuserid, todo.id);
  }
  
  public updateTodo(todo: Todo): Observable<void> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDas.update(currentuserid, todo);
  }
}
