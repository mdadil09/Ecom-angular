import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  register(logForm: NgForm) {
    console.log(logForm.value);
    this.authService.loginUser(logForm.value.email, logForm.value.password);
    this.router.navigate(['/']);
  }

  reset(logForm: NgForm) {
    logForm.reset();
  }

  navigateToSignup(): void {
    this.router.navigateByUrl('/signup');
  }
}
