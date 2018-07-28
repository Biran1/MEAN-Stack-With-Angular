import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GroupService {
  options;
  domain = this.authService.domain;
  test;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }


  // Function to get all Groups By Sub Category from the database

  getAllGroupsBySubCategory(subCategory) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'groups/getAllGroupsBySubCategory/' + subCategory, this.options).map(res => res.json());
  }

  // Function to get group by groupID from the database
  getGroupByGroupID(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'groups/getGroupByGroupID/' + id, this.options).map(res => res.json());
  }

  // Function to Save the group    
  saveGroup(group) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'groups/saveGroup/', group, this.options).map(res => res.json());
  }
}
