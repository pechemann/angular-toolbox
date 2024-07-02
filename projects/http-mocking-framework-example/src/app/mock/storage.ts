/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TodoDto } from "../model/business/dto/todo.dto";

export class Storage {

    private readonly DB: TodoDto[] = [
        {
            userId: 0,
            title: "Create test suite for the Foo component",
            completed: false
        },
        {
            userId: 0,
            title: "Complete documentation for the Foo component",
            completed: true
        }
    ];

    public getTodoCollection(userId: string): TodoDto[] | undefined {
        const id: number = parseInt(userId);
        return this.DB.filter((todo: TodoDto)=> todo.userId === id);
    }
}