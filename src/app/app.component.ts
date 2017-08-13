import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import {AdminService} from "./shared/services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.ngOnDestroy();
  }

  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.adminService.startReviewingStudents().subscribe(data => {
      console.log('startReviewingStudents');
    });
  }

  ngOnDestroy(): void {
    this.adminService.finishReviewingStudents().subscribe(data => {
      console.log('finishReviewingStudents');
    });
  }
}
