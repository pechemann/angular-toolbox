import { HttpStatusCode } from "@angular/common/http";

export const config = {
    routes: [
        {
            path: "/test",
            get: {
                data: ()=> "Lorem Ipsum",
                error: (input: string)=> {
                    // Build error dynamically depending on input value.
                    return {
                        statusCode: HttpStatusCode.NotFound,
                        message: "Fuck You!"
                    }
                }
            }
        }
    ]
};