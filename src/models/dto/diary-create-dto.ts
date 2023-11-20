import {Tag} from "../tag";

export class DiaryCreateDto {
  constructor(
    public title : string,
    public color: string,
    public tags? : Tag[]) { }
}
