import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {UserLoginDto} from "../../models/dto/user-login-dto";
import {RedirectUtils} from "../../utils/redirect-utils";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email?: string = undefined;
  password?: string;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IUserManager)
    protected readonly userManager: IUserManager,
    protected readonly router : Router
  ) {}

  errorMessage?: string;
  async login() {
    console.log('login');
    if (!this.email) {
      this.errorMessage = 'Email is required';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Password is required';
      return;
    }

    try {
      await this.userManager.login(
        new UserLoginDto(
          this.email,
          this.password
        )
      );

      RedirectUtils.redirectToHome();
    } catch (error: any) {
      console.log('error', error);
    }
  }
}
