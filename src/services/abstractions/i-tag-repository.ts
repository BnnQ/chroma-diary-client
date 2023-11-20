import {Tag} from "../../models/tag";

export interface ITagRepository
{
  getTags(search: string, limit: number): Promise<Tag[]>;
}
