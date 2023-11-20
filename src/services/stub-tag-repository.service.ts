import {Tag} from "../models/tag";
import {ITagRepository} from "./abstractions/i-tag-repository";

export class StubTagRepositoryService implements ITagRepository
{
  tags : Tag[];

  constructor()
  {
    this.tags = [new Tag(1, 'tag1', '#000000'), new Tag(2, 'tag2', '#333'), new Tag(3, 'tag3', '#fff')];
  }

  getTags(search: string, limit: number): Promise<Tag[]>
  {
    return Promise.resolve(this.tags.filter(t => t.name.includes(search)).slice(0, limit));
  }
}
