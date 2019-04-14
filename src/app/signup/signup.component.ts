import { Router } from '@angular/router';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/shared/classes/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    submitted: boolean;
    user: User;
    loginForm: FormGroup;
    constructor(private fb: FormBuilder, private localSt: LocalStorageService, private router: Router) {
        this.createForm();
    }
    createForm() {
        this.loginForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() { }
    onSubmit() {
        this.submitted = true;
        this.user = this.loginForm.value;
        this.localSt.clear('submitted');
        this.localSt.store('submitted', this.submitted);
        this.localSt.store('login', this.user.login);
        this.localSt.store('password', this.user.password);
        this.router.navigate(['/checklist']);
    }
}
