export class PostUpsertDto
{
  constructor(public id : number, public content : string, public diaryId : number, public mediaAttachments? : File[], public fileAttachments? : File[])
  {
    //empty
  }
}
