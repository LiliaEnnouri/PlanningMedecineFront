import {Component, OnInit} from '@angular/core';
import {Specialite} from "../../shared/models/specialite";
import {SharedService} from "../../shared/services/shared.service";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {SpecialityService} from "../../shared/services/speciality.service";

declare var jQuery: any;

@Component({
  selector: 'app-affect-speciality',
  templateUrl: './affect-speciality.component.html',
  styleUrls: ['./affect-speciality.component.css']
})
export class AffectSpecialityComponent implements OnInit {

  specialities: Specialite[] = [];
  busy: Subscription;

  constructor(private specialityService: SpecialityService) {
  }

  ngOnInit() {
    this.getAllSpecialities();
  }

  getAllSpecialities() {
    this.busy = this.specialityService.getAll()
      .subscribe(
        (data) => {
          const baseContext = this;
          this.specialities = data;
          setTimeout(function () {
            baseContext.initSelectTeachers();
            Utils.initializeDataTables(20, 2);
          }, 20);
        },
        (error) => {
        }
      )
  }

  initSelectTeachers() {
    for (let i = 0; i < this.specialities.length; i++) {
      this.initSelectTeacher(i);
    }
  }

  initSelectTeacher(index: number) {
    const baseContext = this;
    const className = '.select-enseignant-speciality-' + index;
    console.log(className);
    const selectTeacher = jQuery(className);
    selectTeacher.select2();
    selectTeacher.on('change', function () {
      baseContext.busy = baseContext.specialityService.affectTeacher(baseContext.specialities[index].id_Specialite, parseInt(jQuery(this).val()))
        .subscribe(
          (data) => {
          },
          (error) => {
          }
        )
    });
    if (this.specialities[index].responsible) {
      jQuery(className).val(this.specialities[index].responsible.id_Teacher).trigger("change")
    }
  }

}
