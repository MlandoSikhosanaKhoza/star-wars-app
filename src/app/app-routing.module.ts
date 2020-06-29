import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCmpComponent } from './new-cmp/new-cmp.component';
import {MainComponent} from './main/main.component';
import {MoviesComponent} from './movies/movies.component';
import {CharactersComponent} from './characters/characters.component';
const routes: Routes = [
  {path: "",component: MainComponent},
  {path: "movies",component: MoviesComponent},
  {path: "characters",component: CharactersComponent},
  {path: "newComponent",component: NewCmpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
