import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  categories;
  categorySelected;
  form;
  processing = false;
  message;
  messageClass;
  userName;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private groupService: GroupService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.createForm(); // Create Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // GroupName Input
      groupName: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateGroupName // Custom validation
      ])],
      groupDesc: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(60), // Maximum length is 15 characters
        this.validateGroupName // Custom validation
      ])]
    });
  }


  // Function to validate username is proper format
  validateGroupName(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateGroupName': true } // Return as invalid username
    }
  }


  ngOnInit() {
    this.getAllCategories(); // Get all Categories on component load
  }

  // Function to get all Categories from the database
  getAllCategories() {
    // Function to GET all Categories from database
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.categories; // Assign array to use in HTML
    });
  }


  // Function to save selectedCategory
  selectedCategory(subCategoryID) {
    this.categorySelected = subCategoryID;
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['groupName'].disable();
    this.form.controls['groupDesc'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['groupName'].enable();
    this.form.controls['groupDesc'].enable();
  }

  // Function to submit form
  onRegisterSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form

    if (this.categorySelected == undefined) {
      this.messageClass = 'alert alert-danger'; // Set an error class
      this.message = "Please select category"; // Set an error message
      setTimeout(() => {
        this.messageClass = "";
        this.message = "";
      }, 2000);
      this.processing = false; // Re-enable submit button
      this.enableForm(); // Re-enable form
    }
    else {
      if (this.authService.user != undefined) {
        this.userName = this.authService.user.username;
      }
      else {
        this.userName = JSON.parse(localStorage.getItem('user')).username;
      }


      // Create group object form group's inputs
      const group = {
        groupName: this.form.get('groupName').value, //groupName input field
        groupDesc: this.form.get('groupDesc').value, // groupDesc input field
        subCategory: this.categorySelected,
        userName: this.userName
      }

      // Function from authentication service to register user
      this.groupService.saveGroup(group).subscribe(data => {
        // Resposne from registration attempt
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Set an error class
          this.message = data.message; // Set an error message
          this.processing = false; // Re-enable submit button
          this.enableForm(); // Re-enable form
        } else {
          this.messageClass = 'alert alert-success'; // Set a success class
          this.message = 'Group registered!'; // Set a success message
          // After 2 second timeout, navigate to the login page
          setTimeout(() => {
            this.router.navigate(['/blog/' + data.message]); // Redirect to Dashboard page
          }, 2000);
        }
      });
    }
  }
}
