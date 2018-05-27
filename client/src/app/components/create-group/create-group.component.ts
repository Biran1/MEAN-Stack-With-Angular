import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  categories;
  categorySelected;
  test;

  constructor(
    private categoryService: CategoryService
  ) {
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
   // Function to save the group
   saveGroup() {
     this.test=this.categorySelected;
  }

     // Function to save selectedCategory
     selectedCategory(subCategoryID) {
      this.categorySelected=subCategoryID;
       }
  

}
