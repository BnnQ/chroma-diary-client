import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomDirectivesModule} from "../../modules/custom-directives.module";
import {FormsModule} from "@angular/forms";
import {NgxDropdownConfig, SelectDropDownModule} from "ngx-select-dropdown";
import {Tag} from "../../models/tag";
import {TagCreateDto} from "../../models/dto/tag-create-dto";
import {SERVICE_IDENTIFIERS} from "../app.config";
import {ITagRepository} from "../../services/abstractions/i-tag-repository";
import {CustomPipesModule} from "../../modules/custom-pipes.module";
import {DiaryUpsertDto} from "../../models/dto/diary-upsert-dto";
import {UpsertMode} from "../../models/enums/upsert-mode";
import {IPermissionManager} from "../../services/abstractions/i-permission-manager";
import {Contributor} from "../../models/contributor";
import {Dictionary} from "../../models/dictionary";
import {ContributorComponent} from "../contributor/contributor.component";

@Component({
  selector: 'app-diary-upsert',
  standalone: true,
  imports: [CommonModule, CustomDirectivesModule, FormsModule, SelectDropDownModule, CustomPipesModule, ContributorComponent],
  templateUrl: './diary-upsert.component.html',
  styleUrl: './diary-upsert.component.scss'
})
export class DiaryUpsertComponent implements OnInit, OnChanges
{
  @Input({ required: false }) public model : DiaryUpsertDto | undefined | null;
  @Input({ required: true }) public mode : UpsertMode = null!;
  @Output() public submittedModelEvent = new EventEmitter<DiaryUpsertDto>();
  isNoticeVisible = true;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.ITagRepository)
    private readonly tagRepository : ITagRepository,
    @Inject(SERVICE_IDENTIFIERS.IPermissionManager)
    private readonly permissionManager : IPermissionManager
  )
  {
    this.isNoticeVisible = sessionStorage.getItem('diary-upsert.isNoticeVisible') !== 'false';
  }

  contributors? : Contributor[];
  editionStateDictionary : Dictionary<number, boolean> = new Dictionary<number, boolean>();
  async initialize()
  {
    if (this.mode === UpsertMode.Create)
    {
      this.model = new DiaryUpsertDto(0, '', '#45979a', [], []);
    }

    if (this.mode === UpsertMode.Edit && this.model)
    {
      this.contributors = await this.permissionManager.getDiaryContributors(this.model.id);
      this.contributors.forEach(c => this.editionStateDictionary.set(c.id, false));
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      await this.initialize();
    }
  }

  async ngOnInit()
  {
    await this.initialize();
  }

  contributorName : string = '';
  addContributor(contributorName : string)
  {
    this.permissionManager.addDiaryContributor(this.model!.id, contributorName).then(contributor => {
      this.contributors?.push(contributor);
      console.log(contributor);
      this.editionStateDictionary.set(contributor.id, false);
    });
  }

  async changeContributorPermissions(contributor : Contributor)
  {
    console.log(contributor);
    await this.permissionManager.changeDiaryPermissions(contributor);
  }

  deleteContributor(contributorId : number)
  {
    this.permissionManager.removeDiaryContributor( contributorId).then(() => {
      this.contributors = this.contributors!.filter(c => c.id !== contributorId);
    });
  }

  hideNotice()
  {
    this.isNoticeVisible = false;
    sessionStorage.setItem('diary-upsert.isNoticeVisible', 'false');
  }

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
  tags: Tag[] = [];
  tagInput: string = '';

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
    this.model!.additionalTags = this.model!.additionalTags!.filter(
      (t) => t !== tag
    );
  }

  async onFocusOut() {
    if (this.tagInput) this.addAdditionalTag();
  }

  addAdditionalTag() {
    this.model!.additionalTags!.push(
      new TagCreateDto(this.tagInput.replace(',', '').trim(), this.model!.color)
    );

    this.tagInput = '';
  }

  sendSubmit(model : DiaryUpsertDto)
  {
    this.submittedModelEvent.emit(model);
  }

  protected readonly UpsertMode = UpsertMode;
}
