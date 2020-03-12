import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {map, tap} from 'rxjs/operators';
import {Plugins} from '@capacitor/core';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);


    get userIsAuthenticated() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                //convert to boolean with " !! "
                return !!user.token;
            } else {
                return false;
            }

        }))
    }

    get userId() {
        return this._user.asObservable().pipe(map(user => {
            if (user) {
                return user.id;
            } else {
                return null;
            }
        }))
    }

    constructor(private http: HttpClient) {
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
                environment.firebaseAPIKey
            }`,
            {email: email, password: password, returnSecureToken: true}
        ).pipe(tap(this.setUserData.bind(this)));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {email: email, password: password})
            .pipe(tap(this.setUserData.bind(this)));
    }

    logout() {
        this._user.next(null);
    }

    private setUserData(userData: AuthResponseData) {
        const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000); //expiration time in seconds
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expirationTime));
        this.storeAuthData(userData.localId, userData.idToken, expirationTime.toISOString());
    }

    private storeAuthData(userId: string, token: string, tokenExpirationDate: string){
        const data = JSON.stringify({userId: userId, token: token, tokenExpirationDate: tokenExpirationDate});
        Plugins.Storage.set({key: 'authData', value: data });
    }
}
