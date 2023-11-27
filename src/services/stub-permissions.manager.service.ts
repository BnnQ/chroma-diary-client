import {IPermissionManager} from "./abstractions/i-permission-manager";
import {DiaryPermissions} from "../models/dto/diary-permissions";
import {Contributor} from "../models/contributor";
import {Inject, Injectable} from "@angular/core";
import {IDiaryRepository} from "./abstractions/i-diary-repository";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import {IUserManager} from "./abstractions/i-user-manager";
import {StubUserManagerService} from "./stub-user-manager.service";

@Injectable({providedIn: 'root'})
export class StubPermissionManager implements IPermissionManager
{
    contributors : Contributor[] = [];

    constructor(
      @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
      private readonly diaryRepository : IDiaryRepository,
      @Inject(SERVICE_IDENTIFIERS.IUserManager)
      private readonly userManager : IUserManager
    )
    {
      const numberOfContributors = 5;
      for (let i = 0; i < numberOfContributors; i++)
      {
        this.addDiaryContributor(1, i.toString());
      }
    }

    getUserDiaryPermissions(userId: number, diaryId: number): Promise<DiaryPermissions>
    {
        return Promise.resolve(new DiaryPermissions(true, true, true, true));
    }

    async addDiaryContributor(diaryId: number, userName: string): Promise<Contributor>
    {
      const contributor = new Contributor(this.contributors.length, await this.diaryRepository.getDiary(diaryId), await this.userManager.getUser(userName), new DiaryPermissions(true, true, true, true));
      this.contributors.push(contributor);

      return contributor;
    }

    removeDiaryContributor(contributorId : number): Promise<void>
    {
      this.contributors = this.contributors.filter(contributor => contributor.id !== contributorId);
      return Promise.resolve();
    }

    changeDiaryPermissions(contributor: Contributor): Promise<Contributor>
    {
      this.contributors = this.contributors.map(c => c.id === contributor.id ? contributor : c);
      return Promise.resolve(contributor);
    }

    getDiaryContributors(diaryId: number): Promise<Contributor[]>
    {
      return Promise.resolve(this.contributors.filter(contributor => contributor.diary.id === diaryId));
    }
}
