import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  text="";
  movies=[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    document.title="Movies";
    this.http.get("https://swapi.dev/api/films/").subscribe((data)=>this.displayMovies(data));
  }
  displayMovies(data){
    this.movies=data.results;
  }
  search(){
    this.http.get("https://swapi.dev/api/films/?search="+escape(this.text)).subscribe((data)=>this.displayMovies(data));
  }
}
