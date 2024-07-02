/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TodoDto } from "../model/business/dto/todo.dto";

export class DataStorage {

    private DB: TodoDto[] = [
        {
            userId: 0,
            title: "Create test suite for the Foo component",
            completed: false
        },
        {
            userId: 1,
            title: "Book a hotel room",
            completed: false
        },
        {
            userId: 0,
            title: "Complete documentation for the Foo component",
            completed: true
        }
    ];

    public getTodoCollection(userId: number): TodoDto[] | undefined {
        return this.DB.filter((todo: TodoDto)=> todo.userId === userId);
    }

    public deteteTodoCollection(userId: number): boolean {
        this.DB = this.DB.filter((todo: TodoDto)=> todo.userId !== userId);
        return true;
    }
}