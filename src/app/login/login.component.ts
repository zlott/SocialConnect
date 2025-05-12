import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(2)]);
  
  txtError!: string;
  
  errorMessage = signal('');

  hide = signal(true);

  constructor(private authService: AuthService, private router: Router) {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage();
      });
  }

  onSubmit(): void {
    if(this.authService.login(this.email.value ?? '', this.password.value ?? '')) {
      this.txtError = '';
      this.router.navigateByUrl('');
    } else {
      this.txtError = 'Login failed!';
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  eyeClickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
}
