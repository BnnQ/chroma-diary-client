import {User} from "../user";
import {Tag} from "../tag";

export class SharedDiaryMetadata
{
  constructor(
    public id: number,
    public title: string,
    public color: string,
    public createdAt: Date,
    public updatedAt: Date,
    public author: User,
    public tags?: Tag[]) {}
}
