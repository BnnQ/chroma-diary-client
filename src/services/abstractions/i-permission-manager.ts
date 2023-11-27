import {DiaryPermissions} from "../../models/dto/diary-permissions";
import {Contributor} from "../../models/contributor";

export interface IPermissionManager
{
    getUserDiaryPermissions(userId : number, diaryId : number) : Promise<DiaryPermissions>;
    getDiaryContributors(diaryId : number) : Promise<Contributor[]>;
    addDiaryContributor(diaryId : number, userName : string) : Promise<Contributor>;
    removeDiaryContributor(contributorId : number) : Promise<void>;
    changeDiaryPermissions(contributor : Contributor) : Promise<Contributor>;
}
