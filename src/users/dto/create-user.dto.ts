export class CreateUserDTO {
  name: string;
  lastName: string;
  email: string;
  username: string;
  birthdate: Date;
  password: string;
  profilePicture?: string;
}
