import {Injectable} from "@angular/core";
import {IDiaryRepository} from "./abstractions/i-diary-repository";
import {DiaryMetadata} from "../models/dto/diary-metadata";
import {Tag} from "../models/tag";
import {SharedDiaryMetadata} from "../models/dto/shared-diary-metadata";
import {User} from "../models/user";
import {ArchivedDiaryMetadata} from "../models/dto/archived-diary-metadata";
import {DiaryUpsertDto} from "../models/dto/diary-upsert-dto";
import {DiaryArchivationDto} from "../models/dto/diary-archivation-dto";
import {Diary} from "../models/diary";

// @Injectable({providedIn: 'root'})
// export class StubDiaryRepository implements IDiaryRepository
// {
//   private readonly diaryContents: Diary[];
//   private readonly diaries: DiaryMetadata[];
//   private readonly sharedDiaries: SharedDiaryMetadata[];
//   private readonly archivedDiaries: ArchivedDiaryMetadata[];
//
//   constructor()
//   {
//     this.diaries = [
//       new DiaryMetadata(1, "DiaryContent #1", "#d9c03c", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31)),
//       new DiaryMetadata(2, "DiaryContent #2", "#4e8786", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), [new Tag(1, "4K", "#45979a"), new Tag(2, "Full XDD", "#4169e1")]),
//     ];
//
//     this.diaryContents = [
//       new Diary(1, "DiaryContent #1"),
//       new Diary(2, "DiaryContent #2")
//     ];
//
//     this.sharedDiaries = [
//       new SharedDiaryMetadata(1, "DiaryContent #3", "#e17474", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31), new User("1", "John Doe", "johndoe@gmail.com", "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50")),
//       new SharedDiaryMetadata(2, "DiaryContent #4", "#3d1ed5", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), new User("2", "Jane Doe", "janedoe@gmail.com", "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"), [new Tag(3, "4K", "#45979a"), new Tag(4, "Shared", "#ffff00")]),
//     ];
//
//     this.archivedDiaries = [
//       new ArchivedDiaryMetadata(1, "DiaryContent #5", "#74dce1", new Date(2023, 11, 17, 5, 9, 45), new Date(2023, 11, 17, 15, 25, 31), new Date(2023, 11, 17, 15, 25, 31)),
//       new ArchivedDiaryMetadata(2, "DiaryContent #6", "#8774e1", new Date(2023, 11, 18, 7, 2, 31), new Date(2023, 11, 18, 21, 35, 41), new Date(2023, 11, 18, 21, 35, 41), [new Tag(2, "4K", "#45979a"), new Tag(5, "Archived", "#ff0000")]),
//     ];
//   }
//
//   getUserDiaries(userId: string): Promise<DiaryMetadata[]>
//   {
//     return Promise.resolve(this.diaries);
//   }
//
//   getSharedDiaries(userId: string): Promise<SharedDiaryMetadata[]>
//   {
//     return Promise.resolve(this.sharedDiaries);
//   }
//
//   getArchivedDiaries(userId: string): Promise<ArchivedDiaryMetadata[]>
//   {
//     return Promise.resolve(this.archivedDiaries);
//   }
//
//   getDiary(diaryId: number): Promise<Diary>
//   {
//     const diary = this.diaryContents.find(d => d.id === diaryId)!;
//     return Promise.resolve(diary);
//   }
//
//   getArchivedDiary(diaryId: number): Promise<Diary>
//   {
//     const diary = this.diaryContents.find(d => d.id === diaryId)!;
//     return Promise.resolve(diary);
//   }
//
//   createDiary(diaryCreateDto: DiaryUpsertDto): Promise<DiaryMetadata>
//   {
//     const newDiary = new DiaryMetadata(3, diaryCreateDto.title, diaryCreateDto.color, new Date(), new Date());
//     this.diaries.push(newDiary);
//     return Promise.resolve(newDiary);
//   }
//
//   editDiary(model: DiaryUpsertDto): Promise<DiaryMetadata>
//   {
//     const diary = this.diaries.find(d => d.id === model.id)!;
//     if (diary)
//     {
//       diary.title = model.title;
//       diary.color = model.color;
//       diary.tags = model.tags;
//     }
//     return Promise.resolve(diary);
//   }
//
//   archivateDiary(model: DiaryArchivationDto): Promise<void>
//   {
//     const diary = this.diaries.find(d => d.id === model.id)!;
//     if (diary)
//     {
//       this.diaries.splice(this.diaries.findIndex(d => d.id === model.id), 1);
//       this.archivedDiaries.push(new ArchivedDiaryMetadata(diary.id, diary.title, diary.color, diary.createdAt, new Date(), model.expiresAt, diary.tags));
//     }
//     return Promise.resolve();
//   }
//
//   deleteDiary(diaryId: number): Promise<void>
//   {
//     this.diaries.splice(this.diaries.findIndex(d => d.id === diaryId), 1);
//     return Promise.resolve();
//   }
//
// }
