import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedDiaryMetadata} from "../../models/dto/shared-diary-metadata";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {CustomPipesModule} from "../../modules/custom-pipes.module";

@Component({
  selector: 'app-shared-diaries',
  standalone: true,
  imports: [CommonModule, CustomPipesModule],
  templateUrl: './shared-diaries.component.html',
  styleUrl: './shared-diaries.component.scss'
})
export class SharedDiariesComponent implements OnInit {
  sharedDiaries? : SharedDiaryMetadata[];

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IUserManager)
    private readonly userManager : IUserManager,
    @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
    private readonly diaryRepository : IDiaryRepository
  ) { }

  async ngOnInit(): Promise<void>
  {
    this.sharedDiaries = await this.diaryRepository.getSharedDiaries(await this.userManager.getCurrentUserId());
  }

}
