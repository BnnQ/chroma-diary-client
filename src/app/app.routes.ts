import { Routes } from '@angular/router';
import {MyDiariesComponent} from "./my-diaries/my-diaries.component";
import {SharedDiariesComponent} from "./shared-diaries/shared-diaries.component";
import {ArchivedDiariesComponent} from "./archived-diaries/archived-diaries.component";
import {DiaryComponent} from "./diary/diary.component";

export const routes: Routes = [
  { path: '', component: MyDiariesComponent, data: { name: "My diaries", icon: "fa-grid" } },
  { path: 'shared', component: SharedDiariesComponent, data: { name: "Shared diaries", icon: "fa-cloud" } },
  { path: 'archived', component: ArchivedDiariesComponent , data: { name: "Archived diaries", icon: "fa-box-archive" }},
  { path: 'diary/:id', component: DiaryComponent, data: { name: "Diary" } },
];
