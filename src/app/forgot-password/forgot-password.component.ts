import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    const email = this.forgotPasswordForm.value.email; // Correctly fetch email from form

    this.http.post('http://localhost:8100/timeforge/auth/forgot-password',
      { email: email }, // send as JSON body
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe({
      next: () => {
        this.toastr.success('Password reset email sent!');
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error sending email');
        console.error(err);
        this.loading = false;
      }
    });
  }


}
