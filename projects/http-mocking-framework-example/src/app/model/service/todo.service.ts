/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { TodoDao } from './dao/todo.dao';
import { Observable } from 'rxjs';
import { Todo } from '../business/todo';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class TodoService {

  constructor(private todoDao: TodoDao,
              private userService: UserService) { }

  public getTodoList(): Observable<Todo[]> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDao.getTodos(currentuserid);
  }

  public deleteTodoList(): Observable<Todo[]> {
    const currentuserid: number = this.userService.getUserId();
    return this.todoDao.deleteTodos(currentuserid);
  }
}
