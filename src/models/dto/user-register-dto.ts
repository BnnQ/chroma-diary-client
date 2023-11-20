export class UserRegisterDto {
  constructor(
    public fullName : string,
    public email : string,
    public password : string,
    public confirmPassword : string) { }
}
