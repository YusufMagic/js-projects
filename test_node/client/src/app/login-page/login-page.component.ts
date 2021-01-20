import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any
  aSyb:any

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']){
        //Заходим в систему
      } else if (params['accessDenied']) {
        //Нужно сначалла авторизоваться
      }
    })
  }

  ngOnDestroy() {
    if (this.aSyb) {
      this.aSyb.unsubscribe()
    }
  }

  onSubmit() {
    this.aSyb = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview'])
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }
}
