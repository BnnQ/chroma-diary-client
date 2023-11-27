import {DiaryMetadata} from "../../models/dto/diary-metadata";
import {SharedDiaryMetadata} from "../../models/dto/shared-diary-metadata";
import {ArchivedDiaryMetadata} from "../../models/dto/archived-diary-metadata";
import {DiaryUpsertDto} from "../../models/dto/diary-upsert-dto";
import {DiaryArchivationDto} from "../../models/dto/diary-archivation-dto";
import {Diary} from "../../models/diary";

export interface IDiaryRepository {
    getUserDiaries(userId : number): Promise<DiaryMetadata[]>;
    getSharedDiaries(userId : number) : Promise<SharedDiaryMetadata[]>;
    getArchivedDiaries(userId : number) : Promise<ArchivedDiaryMetadata[]>;
    getDiary(diaryId : number) : Promise<Diary>;
    getArchivedDiary(diaryId : number) : Promise<Diary>;
    createDiary(model : DiaryUpsertDto) : Promise<DiaryMetadata>;
    editDiary(model : DiaryUpsertDto) : Promise<DiaryMetadata>;
    archivateDiary(model : DiaryArchivationDto) : Promise<void>;
    unarchivateDiary(diaryId : number) : Promise<void>;
    deleteDiary(diaryId : number) : Promise<void>;
}
