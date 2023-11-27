import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {UserRegisterDto} from "../../models/dto/user-register-dto";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  firstName?: string = undefined;
  lastName?: string = undefined;
  email?: string = undefined;
  password?: string;
  confirmPassword?: string;

  constructor(
      @Inject(SERVICE_IDENTIFIERS.IUserManager)
      protected readonly userManager: IUserManager,
      protected readonly router : Router
  ) {}

  errorMessage?: string;
  async register() {
    if (!this.firstName) {
      this.errorMessage = 'First name is required.';
      return;
    }
    if (!this.lastName) {
      this.errorMessage = 'Last name is required';
      return;
    }
    if (!this.email) {
      this.errorMessage = 'Email is required';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Password is required';
      return;
    }
    if (!this.confirmPassword) {
      this.errorMessage = 'Confirm password is required';
      return;
    }

    try {
      await this.userManager.register(
          new UserRegisterDto(
              this.firstName + ' ' + this.lastName,
              this.email,
              this.password,
              this.confirmPassword
          )
      );

      await this.router.navigate(['/']);
    } catch (error: any) {
      console.error(error);
    }
  }
}
