/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TodoDto } from "../model/business/dto/todo.dto";

export class DataStorage {

    private autoIncrementIdx: number = 3;

    private DB: TodoDto[] = [
        {
            userId: 0,
            title: "Create test suite for the Foo component",
            completed: false,
            id: 1
        },
        {
            userId: 1,
            title: "Book a hotel room",
            completed: false,
            id: 2
        },
        {
            userId: 0,
            title: "Complete documentation for the Foo component",
            completed: true,
            id: 3
        }
    ];

    public getTodoCollection(userId: number): TodoDto[] | undefined {
        return this.DB.filter((todo: TodoDto)=> todo.userId === userId);
    }

    public deteteTodoCollection(userId: number): boolean {
        this.DB = this.DB.filter((todo: TodoDto)=> todo.userId !== userId);
        return true;
    }
    
    public addTodo(userId: number, title: string): TodoDto {
        const dto: TodoDto = {
            userId: userId,
            title: title,
            completed: false,
            id: ++this.autoIncrementIdx
        };
        this.DB.push(dto);
        return dto;
    }

    public updateTodo(userId: number, id: number, title: string, completed: boolean): boolean {
        const dto: TodoDto | undefined = this.DB.find((todo: TodoDto)=> todo.userId === userId && todo.id === id);
        if (!dto) return false;
        dto.title = title;
        dto.completed = completed;
        return true;
    }

    public deleteTodo(userId: number, todoId: number): boolean {
        const idx: number = this.DB.findIndex((todo: TodoDto)=> todo.userId === userId && todo.id === todoId);
        if (idx === -1) return false;
        this.DB.splice(idx, 1);
        return true;
    }
    
    
}