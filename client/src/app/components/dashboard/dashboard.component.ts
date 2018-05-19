import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories;
  

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) { }


   // Function to get all Categories from the database
   getAllCategories() {
    // Function to GET all Categories from database
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.categories; // Assign array to use in HTML
    });
  }

  ngOnInit() {

    this.getAllCategories(); // Get all Categories on component load
    
  }

}
