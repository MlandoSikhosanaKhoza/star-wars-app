import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  text="";
  characters;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    document.title="Characters";
    this.http.get("https://swapi.dev/api/people/").subscribe((data)=>this.displayCharacters(data));
  }

  displayCharacters(data){
    this.characters=data;
  }

  search(){
    this.http.get("https://swapi.dev/api/people/?search="+escape(this.text))
    .subscribe((data)=>this.displayCharacters(data));
  }

  next(){
    if(this.characters!=null && this.characters.next!=null){
      this.http.get(this.characters.next).subscribe((data)=>this.displayCharacters(data));
    }
  }

  prev(){
    if(this.characters!=null && this.characters.previous!=null){
      this.http.get(this.characters.previous).subscribe((data)=>this.displayCharacters(data));
    }
  }
}
