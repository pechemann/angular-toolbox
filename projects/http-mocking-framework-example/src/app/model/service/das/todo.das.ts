/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TodoDto } from '../../business/dto/todo.dto';
import { LogerService } from '../logger.service';
import { LogLevel } from '../../business/log';
import { Todo } from '../../business/todo';
import { UpdateTodoDto } from '../../business/dto/update-todo.dto';

const API_PATH: string = "https://my-awsome-company.com/todos/";

@Injectable({
  providedIn: "root"
})
export class TodoDas {

  constructor(private http: HttpClient,
              private loggerService: LogerService) { }

  public getAll(userId: number): Observable<Todo[]> {
    const endpoint: string = API_PATH + userId;
    this.logEndpoint("GET", endpoint);
    return this.http.get<any>(endpoint, { observe: 'response' }).pipe(
      map(response=> {
        this.logResponse("GET", response);
        const result: Todo[] = [];
        response.body.forEach((dto: TodoDto)=> {
          result.push( { title: dto.title, completed: dto.completed, id: dto.id } );
        });
        return result;
      }),
      catchError(err => this.logError("GET", err))
    );
  }

  public deleteAll(userId: number): Observable<any> {
    const endpoint: string = API_PATH + userId;
    this.logEndpoint("DELETE", endpoint);
    return this.http.delete<any>(endpoint, { observe: 'response' }).pipe(
      tap(response => this.logResponse("DELETE", response)),
      catchError(err => this.logError("DELETE", err))
    );
  }

  public create(userId: number, title: string): Observable<Todo> {
    const endpoint: string = `${API_PATH}${userId}/todo`;
    this.logEndpoint("POST", endpoint);
    return this.http.post<any>(endpoint, title, { observe: 'response' }).pipe(
      map(response => {
        const responseDto: TodoDto = response.body;
        this.logResponse("POST", response);
        return { title: responseDto.title, completed: responseDto.completed, id: responseDto.id };
      }),
      catchError(err => this.logError("POST", err))
    );
  }
  
  public delete(userId: number, todoId: number): Observable<number> {
    const endpoint: string = `${API_PATH}${userId}/todo/${todoId}`;
    this.logEndpoint("DELETE", endpoint);
    return this.http.delete<any>(endpoint, { observe: 'response' }).pipe(
      map(response => {
        this.logResponse("DELETE", response);
        return parseInt(response.body);
      }),
      catchError(err => this.logError("DELETE", err))
    );
  }
  
  public update(userId: number, todo: Todo): Observable<void> {
    const endpoint: string = `${API_PATH}${userId}/todo/${todo.id}`;
    const update: UpdateTodoDto = {
      title: todo.title,
      completed: todo.completed
    };
    this.logEndpoint("PUT", endpoint);
    return this.http.put<any>(endpoint, update, { observe: 'response' }).pipe(
      map(response => this.logResponse("PUT", response)),
      catchError(err => this.logError("PUT", err))
    );
  }

  private logEndpoint(method: string, endpoint: string) {
    this.loggerService.log(`HTTP ${method}: ${endpoint}`, LogLevel.DEBUG);
  }

  private logResponse(method: string, response: HttpResponse<any>): void {
    this.loggerService.log(`HTTP ${method} responded with status: ${response.status}`, LogLevel.DEBUG);
  }

  private logError(method: string, err: HttpErrorResponse): Observable<never> {
    this.loggerService.log(`HTTP ${method} responded with error: ${err.status} ${err.message}`, LogLevel.ERROR);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
