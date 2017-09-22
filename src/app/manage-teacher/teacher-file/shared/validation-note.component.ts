import {Component, Input, OnInit} from "@angular/core";
import {SectionValidation} from "../../../shared/models/section-validation";
import {Utils} from "../../../shared/utils";
import {Teacher} from "../../../shared/models/Teacher";
declare let jQuery: any;
declare let swal: any;
@Component({
  selector: 'validation-note',
  templateUrl: 'validation-note.component.html',
  styleUrls: [],
})
export class ValidationNoteComponent implements OnInit {


  @Input()
  sectionId: number;
  @Input()
  teacher: Teacher;


  statusSection: SectionValidation;


  ngOnInit() {
    this.statusSection = Utils.getStatusSection(this.teacher.validations, this.sectionId);
  }

}


