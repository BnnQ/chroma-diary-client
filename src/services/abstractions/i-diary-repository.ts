import {DiaryMetadata} from "../../models/dto/diary-metadata";
import {SharedDiaryMetadata} from "../../models/dto/shared-diary-metadata";
import {ArchivedDiaryMetadata} from "../../models/dto/archived-diary-metadata";

export interface IDiaryRepository {
    getUserDiaries(userId : string): Promise<DiaryMetadata[]>;
    getSharedDiaries(userId : string) : Promise<SharedDiaryMetadata[]>;
    getArchivedDiaries(userId : string) : Promise<ArchivedDiaryMetadata[]>;
    deleteDiary(diaryId : number) : Promise<void>;
}
