import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiaryMetadata} from "../../models/dto/diary-metadata";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {CustomDirectivesModule} from "../../modules/custom-directives.module";
import {DiaryUpsertComponent} from "../diary-upsert/diary-upsert.component";
import {DiaryUpsertDto} from "../../models/dto/diary-upsert-dto";
import {DiaryArchivationDto} from "../../models/dto/diary-archivation-dto";
import {FormsModule} from "@angular/forms";
import {DateHelper} from "../../utils/date-helper";
import {UpsertMode} from "../../models/enums/upsert-mode";
import {RouterLink} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-my-diaries',
  standalone: true,
  imports: [CommonModule, CustomPipesModule, CustomDirectivesModule, DiaryUpsertComponent, FormsModule, RouterLink],
  templateUrl: './my-diaries.component.html'
})
export class MyDiariesComponent implements OnInit {
  _diaries? : DiaryMetadata[];
  get diaries(): DiaryMetadata[] | undefined {
    return this._diaries;
  }

  set diaries(diaries: DiaryMetadata[] | undefined) {
    if (diaries)
    {
      this._diaries = diaries;
      this.filteredDiaries = [...diaries];
    }
    else {
      this._diaries = undefined;
      this.filteredDiaries = undefined;
    }
  }

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IUserManager)
    private readonly userManager : IUserManager,
    @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
    private readonly diaryRepository : IDiaryRepository
  ) { }

  async ngOnInit(): Promise<void>
  {
    this.diaries = await this.diaryRepository.getUserDiaries(await this.userManager.getCurrentUserId());
  }

  // -- Search --
  get distinctColors() {
    if (this.diaries)
    {
      const colors = this.diaries.map(diary => diary.color);
      return [...new Set(colors)];
    }

    return [];
  }

  filteredDiaries? : DiaryMetadata[];
  filterByColor(color : string) : void
  {
    if (this.diaries)
    {

      this.filteredDiaries = this.diaries.filter(diary => diary.color === color);
    }
  }

  filterByTitle(event : any) : void
  {
    if (this.diaries)
    {
      const title = event.target.value;
      if (!title || title === '')
      {
        this.filteredDiaries = [...this.diaries];
      }
      else
      {
        this.filteredDiaries = this.diaries.filter(diary => diary.title.toLowerCase().includes(event.target.value.toLowerCase()));
      }
    }
  }

  resetFilter()
  {
    this.filteredDiaries = this.diaries?.slice();
  }

  // -- DiaryContent deletion --
  selectedDiaryToDelete? : DiaryMetadata;

  selectDiaryToDelete(diary : DiaryMetadata) : void
  {
    this.selectedDiaryToDelete = diary;
  }

  deleteDiary(diary : DiaryMetadata) : void
  {
    this.diaryRepository.deleteDiary(diary.id).then(() => {
      this.diaries = this.diaries?.filter(d => d.id !== diary.id);
      this.selectedDiaryToDelete = undefined;
    });
  }
  // -- DiaryContent deletion --

  // -- DiaryContent creation --

  createDiary(model : DiaryUpsertDto)
  {
    this.diaryRepository.createDiary(model).then(diary => {
      if (!this.diaries)
        this.diaries = [];

      this.diaries = [...this.diaries, (diary)];
    });
  }

  // -- DiaryContent creation --

  // -- DiaryContent edition --
  selectedDiaryToEdit : BehaviorSubject<DiaryUpsertDto | undefined> = new BehaviorSubject<DiaryUpsertDto | undefined>(undefined);

  selectDiaryToEdit(diary : DiaryMetadata) : void {
    this.selectedDiaryToEdit.next(diary ? new DiaryUpsertDto(diary.id, diary.title, diary.color, diary.tags, []) : undefined);
  }

  editDiary(model : DiaryUpsertDto)
  {
    this.diaryRepository.editDiary(model).then(diary => {
      this.diaries = this.diaries?.map(d => d.id === diary.id ? diary : d);
    });
  }
  // -- DiaryContent edition --

  // -- DiaryContent archivation --
  selectedDiaryToArchive? : DiaryMetadata;
  private readonly currentDate = new Date();
  _archivationDate : Date | undefined = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));

  get archivationDate(): string | undefined {
    return this._archivationDate?.toISOString().split('T')[0];
  }

  set archivationDate(value: string | undefined) {
    this._archivationDate = value ? new Date(value) : undefined;
  }

  selectDiaryToArchive(diary : DiaryMetadata) : void
  {
    this.selectedDiaryToArchive = diary;
  }

  archiveDiary(diary : DiaryMetadata)
  {
    this.diaryRepository.archivateDiary(new DiaryArchivationDto(diary.id, this._archivationDate!)).then(() => {
      this.diaries = this.diaries?.filter(d => d.id !== diary.id);
      this.selectedDiaryToArchive = undefined;
    });
  }
  // -- DiaryContent archivation --


  protected readonly UpsertMode = UpsertMode;
  protected readonly DateHelper = DateHelper;
}
