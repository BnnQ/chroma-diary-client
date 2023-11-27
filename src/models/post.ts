import {Attachment} from "./attachment";

export class Post
{
  constructor(public id: number, public content: string, public createdAt : Date, public updatedAt : Date, public attachments?: Attachment[])
  {
    //empty
  }
}
