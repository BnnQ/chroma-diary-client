import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";
import {IPermissionManager} from "../../services/abstractions/i-permission-manager";
import {DiaryPermissions} from "../../models/dto/diary-permissions";
import {DiaryComponent} from "../diary/diary.component";
import {Diary} from "../../models/diary";
import {IUserManager} from "../../services/abstractions/i-user-manager";

@Component({
  selector: 'app-diary-wrapper',
  standalone: true,
  imports: [CommonModule, DiaryComponent],
  templateUrl: './diary-wrapper.component.html'
})
export class DiaryWrapperComponent implements OnInit {
  diaryId : number = 0;
  diary? : Diary;
  permissions?: DiaryPermissions;

  constructor(activatedRoute : ActivatedRoute, @Inject(SERVICE_IDENTIFIERS.IDiaryRepository) private readonly diaryRepository : IDiaryRepository, @Inject(SERVICE_IDENTIFIERS.IPermissionManager) private readonly permissionManager : IPermissionManager, @Inject(SERVICE_IDENTIFIERS.IUserManager) private readonly userManager : IUserManager)
  {
    this.diaryId = parseInt(activatedRoute.snapshot.paramMap.get("id")!);
  }

  async ngOnInit(): Promise<void> {
    this.diary = await this.diaryRepository.getDiary(this.diaryId);
    this.permissions = await this.permissionManager.getUserDiaryPermissions(await this.userManager.getCurrentUserId(), this.diaryId);
    console.log('diary', this.diary);
    console.log('permissions', this.permissions);
  }
}
