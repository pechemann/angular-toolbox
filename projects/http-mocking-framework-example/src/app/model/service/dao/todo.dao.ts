/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodoDto } from '../../business/dto/todo.dto';
import { LogerService } from '../logger.service';
import { LogLevel } from '../../business/log';
import { Todo } from '../../business/todo';

@Injectable({
  providedIn: "root"
})
export class TodoDao {

  constructor(private _http: HttpClient,
              private _loggerService: LogerService) { }

  public getTodos(userId: number): Observable<Todo[]> {
    const endpoint: string = "https://my-awsome-company.com/todos/" + userId;
    this._loggerService.log("HTTP GET: " + endpoint, LogLevel.DEBUG);
    return this._http.get<any>(endpoint, { observe: 'response' }).pipe(
      map(response=> {
        const status: HttpStatusCode = response.status;
        this._loggerService.log("HTTP GET responded with status: " + status, status === HttpStatusCode.Ok ? LogLevel.DEBUG : LogLevel.ERROR);
        const result: Todo[] = [];
        response.body.forEach((dto: TodoDto)=> {
          result.push( { title: dto.title, completed: dto.completed } );
        });
        return result;
      })
    );
  }
}
