export class RedirectUtils {
  private static baseUrl =
    window.location.protocol + '//' + window.location.host;

  static redirectToHome() {
    window.location.replace(this.baseUrl);
  }
}
