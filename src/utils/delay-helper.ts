export class DelayHelper {
  public static wait(milliseconds : number) : Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, milliseconds));
  }
}
