import {Injectable} from "@angular/core";
import {IDiaryRepository} from "./abstractions/i-diary-repository";
import {DiaryMetadata} from "../models/dto/diary-metadata";
import {Tag} from "../models/tag";
import {SharedDiaryMetadata} from "../models/dto/shared-diary-metadata";
import {User} from "../models/user";
import {ArchivedDiaryMetadata} from "../models/dto/archived-diary-metadata";

@Injectable({providedIn: 'root'})
export class StubDiaryRepository implements IDiaryRepository
{
    private diaries: DiaryMetadata[];
    private readonly sharedDiaries : SharedDiaryMetadata[];
    private readonly archivedDiaries : ArchivedDiaryMetadata[];

    constructor()
    {
        this.diaries = [
            new DiaryMetadata(1, "Diary #1", "#d9c03c", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31)),
            new DiaryMetadata(2, "Diary #2", "#4e8786", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), [new Tag(1, "4K", "#45979a"), new Tag(2, "Full XDD", "#4169e1")]),
        ];

        this.sharedDiaries = [
          new SharedDiaryMetadata(1, "Diary #3", "#e17474", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31), new User("1", "John Doe", "johndoe@gmail.com", "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50")),
          new SharedDiaryMetadata(2, "Diary #4", "#3d1ed5", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), new User("2", "Jane Doe", "janedoe@gmail.com", "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"), [new Tag(3, "4K", "#45979a"), new Tag(4, "Shared", "#ffff00")]),
        ];

        this.archivedDiaries = [
          new ArchivedDiaryMetadata(1, "Diary #5", "#74dce1", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31), new Date(2023, 11, 17, 15, 25, 31)),
          new ArchivedDiaryMetadata(2, "Diary #6", "#8774e1", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), new Date(2023, 11, 18, 21, 35, 41), [new Tag(2, "4K", "#45979a"), new Tag(5, "Archived", "#ff0000")]),
        ];
    }

    getUserDiaries(userId : string): Promise<DiaryMetadata[]>
    {
        return Promise.resolve(this.diaries);
    }

    getSharedDiaries(userId: string): Promise<SharedDiaryMetadata[]>
    {
        return Promise.resolve(this.sharedDiaries);
    }

    getArchivedDiaries(userId: string): Promise<ArchivedDiaryMetadata[]>
    {
      return Promise.resolve(this.archivedDiaries);
    }

    deleteDiary(diaryId: number): Promise<void>
    {
      this.diaries.splice(this.diaries.findIndex(d => d.id === diaryId), 1);
      return Promise.resolve();
    }

}
