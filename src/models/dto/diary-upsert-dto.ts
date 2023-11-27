import {Tag} from "../tag";
import {TagCreateDto} from "./tag-create-dto";
import {TagDto} from "./tag-dto";

export class DiaryUpsertDto
{
  constructor(
    public id : number,
    public title : string,
    public color: string,
    public tags? : Tag[],
    public additionalTags? : TagCreateDto[]) {
    this.tags = this.tags?.map(t => {
      return new Tag(t.id, t.name, t.color);
    });
  }
}
