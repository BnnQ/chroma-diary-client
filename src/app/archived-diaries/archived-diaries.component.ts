import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArchivedDiaryMetadata} from "../../models/dto/archived-diary-metadata";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";

@Component({
  selector: 'app-archived-diaries',
  standalone: true,
  imports: [CommonModule, CustomPipesModule],
  templateUrl: './archived-diaries.component.html',
  styleUrl: './archived-diaries.component.scss'
})
export class ArchivedDiariesComponent implements OnInit {
  archivedDiaries? : ArchivedDiaryMetadata[];

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IUserManager)
    private readonly userManager : IUserManager,
    @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
    private readonly diaryRepository : IDiaryRepository
  ) { }

  async ngOnInit(): Promise<void> {
    this.archivedDiaries = await this.diaryRepository.getArchivedDiaries(await this.userManager.getCurrentUserId());
  }
}
