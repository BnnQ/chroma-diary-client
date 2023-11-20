import {Tag} from "../tag";

export class DiaryMetadata
{
  constructor(
    public id : number,
    public title : string,
    public color: string,
    public createdAt : Date,
    public updatedAt : Date,
    public tags? : Tag[]) { }
}
