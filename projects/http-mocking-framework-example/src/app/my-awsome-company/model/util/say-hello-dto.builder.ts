/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { SayHelloDto } from "../business/say-hello.dto";

export class SayHelloDtoBuilder {

    public build(name: string): SayHelloDto {
        const decodedName: string = decodeURIComponent(name);
        return { message: `Hello ${ decodedName }!` };
    }
}