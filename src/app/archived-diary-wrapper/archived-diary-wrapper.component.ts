import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiaryPermissions} from "../../models/dto/diary-permissions";
import {ActivatedRoute} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";
import {IPermissionManager} from "../../services/abstractions/i-permission-manager";
import {DiaryComponent} from "../diary/diary.component";
import {Diary} from "../../models/diary";

@Component({
  selector: 'app-archived-diary-wrapper',
  standalone: true,
  imports: [CommonModule, DiaryComponent],
  templateUrl: './archived-diary-wrapper.component.html',
  styleUrl: './archived-diary-wrapper.component.scss'
})
export class ArchivedDiaryWrapperComponent {
  diaryId : number = 0;
  diary? : Diary;
  permissions : DiaryPermissions = new DiaryPermissions(true, false, false, false);

  constructor(
    activatedRoute : ActivatedRoute,
    @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
    private readonly diaryRepository : IDiaryRepository)
  {
    this.diaryId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
  }

  async ngOnInit()
  {
    this.diary = await this.diaryRepository.getArchivedDiary(this.diaryId);
  }
}
