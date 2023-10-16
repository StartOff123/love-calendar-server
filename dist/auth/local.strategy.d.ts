import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authSetvice;
    constructor(authSetvice: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
