import {Component, OnDestroy, OnInit} from "@angular/core";
import {AdminService} from "./shared/services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.adminService.finishReviewingStudents().subscribe(data => {
      console.log('finishReviewingStudents');
    });
  }
}
