import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  message;
  messageClass;
  currentUrl
  groups;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) { }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.groupService.getAllGroupsBySubCategory(this.currentUrl.subCategory).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        if (data.groups != []) {
          this.groups = data.groups; // Save blog object for use in HTML
        }
        else {
          this.messageClass = 'alert alert-danger'; // Set bootstrap error class
          this.message = 'groups not found.'; // Set error message
        }
      }
    });
  }

}
