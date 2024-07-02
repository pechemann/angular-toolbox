/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TodoDto } from '../../business/dto/todo.dto';
import { LogerService } from '../logger.service';
import { LogLevel } from '../../business/log';
import { Todo } from '../../business/todo';

@Injectable({
  providedIn: "root"
})
export class TodoDao {

  constructor(private http: HttpClient,
              private loggerService: LogerService) { }

  public getAll(userId: number): Observable<Todo[]> {
    const endpoint: string = "https://my-awsome-company.com/todos/" + userId;
    this.loggerService.log("HTTP GET: " + endpoint, LogLevel.DEBUG);
    return this.http.get<any>(endpoint, { observe: 'response' }).pipe(
      map(response=> {
        this.loggerService.log("HTTP GET responded with status: " + response.status, LogLevel.DEBUG);
        const result: Todo[] = [];
        response.body.forEach((dto: TodoDto)=> {
          result.push( { title: dto.title, completed: dto.completed, id: dto.id } );
        });
        return result;
      }),
      catchError((err)=>{
        this.loggerService.log(`HTTP GET responded with error: ${err.status} ${err.message}`, LogLevel.ERROR);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  public deleteAll(userId: number): Observable<any> {
    const endpoint: string = "https://my-awsome-company.com/todos/" + userId;
    this.loggerService.log("HTTP DELETE: " + endpoint, LogLevel.DEBUG);
    return this.http.delete<any>(endpoint, { observe: 'response' }).pipe(
      tap(response => {
        this.loggerService.log("HTTP DELETE responded with status: " + response.status, LogLevel.DEBUG);
      }),
      catchError((err)=>{
        this.loggerService.log(`HTTP DELETE responded with error: ${err.status} ${err.message}`, LogLevel.ERROR);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  public create(userId: number, title: string): Observable<Todo> {
    const endpoint: string = `https://my-awsome-company.com/todos/${userId}/todo`;
    this.loggerService.log("HTTP POST: " + endpoint, LogLevel.DEBUG);
    return this.http.post<any>(endpoint, title, { observe: 'response' }).pipe(
      map(response => {
        const responseDto: TodoDto = response.body;
        this.loggerService.log("HTTP POST responded with status: " + response.status, LogLevel.DEBUG);
        return { title: responseDto.title, completed: responseDto.completed, id: responseDto.id };
      }),
      catchError((err)=>{
        this.loggerService.log(`HTTP POST responded with error: ${err.status} ${err.message}`, LogLevel.ERROR);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }
}
