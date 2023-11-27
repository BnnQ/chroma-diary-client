export class Attachment
{
  constructor(public id: number, public url: string, public image : boolean, public video : boolean, public name?: string, public size?: number)
  {
    //empty
  }
}
