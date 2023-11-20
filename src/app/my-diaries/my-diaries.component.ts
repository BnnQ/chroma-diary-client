import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiaryMetadata} from "../../models/dto/diary-metadata";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {IDiaryRepository} from "../../services/abstractions/i-diary-repository";
import {IUserManager} from "../../services/abstractions/i-user-manager";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {CustomDirectivesModule} from "../../modules/custom-directives.module";
import {ColorPickerDirective, ColorPickerModule} from "ngx-color-picker";
import {NgxDropdownConfig, SelectDropDownModule} from "ngx-select-dropdown";
import {TagCreateDto} from "../../models/dto/tag-create-dto";
import {Tag} from "../../models/tag";
import {FormsModule} from "@angular/forms";
import {ITagRepository} from "../../services/abstractions/i-tag-repository";

@Component({
  selector: 'app-my-diaries',
  standalone: true,
  imports: [CommonModule, CustomPipesModule, CustomDirectivesModule, ColorPickerModule, SelectDropDownModule, FormsModule],
  templateUrl: './my-diaries.component.html'
})
export class MyDiariesComponent implements OnInit {
  diaries? : DiaryMetadata[];
  selectedDiaryToDelete? : DiaryMetadata;

  @ViewChild(ColorPickerDirective) public directive? : ColorPickerDirective;
  dropdownConfig: NgxDropdownConfig = {
    clearOnSelection: false,
    customComparator(): number {
      return 0;
    },
    displayKey: 'name',
    height: 'auto',
    inputDirection: 'left-to-right',
    limitTo: 40,
    moreText: 'More',
    noResultsFound: 'No results found',
    placeholder: 'Choose...',
    search: true,
    searchOnKey: 'name',
    searchPlaceholder: 'Search',
  };
  tags: TagCreateDto[] = [];
  selectedTags: Tag[] = [];
  additionalTags: TagCreateDto[] = [];
  tagInput: string = '';
  diaryColor: string = '#000000';

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IUserManager)
    private readonly userManager : IUserManager,
    @Inject(SERVICE_IDENTIFIERS.IDiaryRepository)
    private readonly diaryRepository : IDiaryRepository,
    @Inject(SERVICE_IDENTIFIERS.ITagRepository)
    private readonly tagRepository : ITagRepository
  ) { }

  async ngOnInit(): Promise<void>
  {
    this.diaries = await this.diaryRepository.getUserDiaries(await this.userManager.getCurrentUserId());
  }

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

  async onSearch(event: string)
  {
    if (event)
    {
      this.tags = await this.tagRepository.getTags(event, 40);
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === ',') this.addAdditionalTag();
  }

  removeTag(tag: TagCreateDto) {
    this.additionalTags = this.additionalTags.filter(
      (t) => t !== tag
    );
  }

  async onFocusOut() {
    if (this.tagInput) this.addAdditionalTag();
  }

  addAdditionalTag() {
    this.additionalTags.push(
      new TagCreateDto(this.tagInput.replace(',', '').trim(), this.diaryColor)
    );
    this.tagInput = '';
  }

  openColorPicker(tag: TagCreateDto) {
    if (this.directive)
    {
      this.directive.colorSelected(tag.color);
      this.directive.openDialog();
      this.directive.colorPickerChange.subscribe((color: string) => {
        tag.color = color;
      });
    }

  }

}
