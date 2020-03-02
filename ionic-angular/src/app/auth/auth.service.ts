import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    _userIsAuthenticated = true;
    private _userId = 'def';

    constructor() {
    }

    get userId(){
        return this._userId;
    }

    login() {
        this._userIsAuthenticated = true;
    }

    logout() {
        this._userIsAuthenticated = false;
    }
}
