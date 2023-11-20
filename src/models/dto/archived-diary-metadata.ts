import {User} from "../user";
import {Tag} from "../tag";

export class ArchivedDiaryMetadata
{
  constructor(
    public id: number,
    public title: string,
    public color: string,
    public createdAt: Date,
    public archivedAt: Date,
    public expiresAt: Date,
    public tags?: Tag[]) {}
}
