import { BaseError } from "./BaseError";

export class ShowError extends BaseError{
    constructor(message: string){
        super(message, 403)
    }
}

