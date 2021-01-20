import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token = null

  constructor(private http:HttpClient) {
  }

  login(user:User): Observable<string> {
    return this.http.post<string>('/api/login', user)
      .pipe(
        tap()
      )
  }

  register() {}
}
