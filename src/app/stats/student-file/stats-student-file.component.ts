/**
 * Created by Abbes on 15/09/2017.
 */
/**
 * Created by Abbes on 21/08/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {StatsService} from "../../shared/services/stats.service";
import {Subscription} from "rxjs/Subscription";

declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-stats-student-file',
  templateUrl: './stats-student-file.component.html',
  styleUrls: [],
})
export class StatsStudentFileComponent implements OnInit {


  generalStatsStudentFile: GeneralStatsStudentFile = new GeneralStatsStudentFile();

  busy: Subscription;

  constructor(private statsService: StatsService) {

  }

  ngOnInit() {
    this.busy = this.statsService.getGeneralStatsStudentFile()
      .subscribe(
        (data) => {
          this.generalStatsStudentFile = data;
        },
        (error) => {

        }
      )
  }

}
export class GeneralStatsStudentFile {
  nbStudentsAccounts: number;
  nbStudentsFiles: number;
  nbStudentsFilesValid: number;
  nbStudentsFilesWaiting: number;
  nbStudentsRevised: number;
}


