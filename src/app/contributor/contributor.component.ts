import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Contributor} from "../../models/contributor";

@Component({
  selector: 'app-contributor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contributor.component.html',
  styleUrl: './contributor.component.scss'
})
export class ContributorComponent {
  @Input({required: true}) contributor : Contributor = null!;
  @Output() public contributorPermissionsChanged = new EventEmitter<void>();
  @Output() public contributorRemoved = new EventEmitter<void>();

  isEditing = false;
  disableEdit()
  {
    this.isEditing = false;
  }

  enableEdit()
  {
    this.isEditing = true;
  }

  deleteContributor()
  {
    this.contributorRemoved.emit();
  }

  changeContributorPermissions()
  {
    this.disableEdit();
    this.contributorPermissionsChanged.emit();
  }
}
