import {DiaryPermissions} from "./dto/diary-permissions";
import {Diary} from "./diary";
import {User} from "./user";

export class Contributor
{
  constructor(public id : number, public diary : Diary, public user : User, public permissions : DiaryPermissions)
  {
    //empty
  }
}
