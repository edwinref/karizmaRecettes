import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { HomeComponent } from './components/home/home.component';
import { GestionFiliereComponent } from './components/gestion/gestion-filiere/gestion-filiere.component';
import { AddNewFiliereComponent } from './components/add/add-new-filiere/add-new-filiere.component';
import { AddNewDepartementComponent } from './components/add/add-new-departement/add-new-departement.component';
import { GestionClasseComponent } from './components/gestion/gestion-classe/gestion-classe.component';
import { AddNewClasseComponent } from './components/add/add-new-classe/add-new-classe.component';
import { GestionSallesComponent } from './components/gestion/gestion-salles/gestion-salles.component';
import { AddNewSalleComponent } from './components/add/add-new-salle/add-new-salle.component';
import {TimetableComponent} from "./components/timetable/timetable.component";
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { GestionDepartmentComponent } from './components/gestion/gestion-departement/gestion-departement.component';
import { EditDepartementComponent } from './components/edit/edit-departement/edit-departement.component';
import { EditSalleComponent } from './components/edit/edit-salle/edit-salle.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import {EditFiliereComponent} from "./components/edit/edit-filiere/edit-filiere.component";
import {EditClasseComponent} from "./components/edit/edit-classe/edit-classe.component";
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { NonDisponibleComponent } from './components/gestion/non-disponible/non-disponible.component';
import {AddNewModuleComponent} from "./components/add/add-new-coursmodel/add-new-coursmodel.component";
import {GestionModuleComponent} from "./components/gestion/gestion-coursmodules/gestion-coursmodules.component";
import {EditModuleComponent} from "./components/edit/edit-coursmodule/edit-coursmodules.component";
import {GestionEtudiantComponent} from "./components/gestion/gestion-etudiant/gestion-etudiant.component";
import {AddNewEtudiantComponent} from "./components/add/add-new-etudiant/add-new-etudiant.component";
import {EditEtudComponent} from "./components/edit/edit-etud/edit-etud.component";

const routes: Routes = [
  { path :'' , component: HomeComponent},
  { path :'index' , component: IndexPageComponent},
    { path :'home' , component: HomeComponent},
    { path :'profs' , component: GestionProfComponent},
    { path :'profs/add' , component: AddNewProfComponent},
    { path :'filieres' , component: GestionFiliereComponent},
    { path :'filieres/add' , component: AddNewFiliereComponent},
    { path :'departements' , component: GestionDepartmentComponent},
    { path :'departements/add' , component: AddNewDepartementComponent},
    { path :'classes' , component: GestionClasseComponent},
    { path :'classes/add' , component: AddNewClasseComponent},
    { path :'salles' , component: GestionSallesComponent},
    { path :'salles/add' , component: AddNewSalleComponent},
    { path :'emploitemps' , component: TimetableComponent},
    {path:'profs/edit',component:EditProfComponent},
  {path:'etud/edit',component:EditEtudComponent},
    { path :'departements/edit' , component: EditDepartementComponent},
    { path :'salles/edit' , component: EditSalleComponent},
    { path :'filieres/edit' , component: EditFiliereComponent},
    { path :'classes/edit' , component: EditClasseComponent},
    { path :'profile/edit' , component: EditProfileComponent},
    { path :'nonDesponibles' , component: NonDisponibleComponent},
    { path :'coursmodules' , component: GestionModuleComponent},
  { path :'coursmodules/add' , component: AddNewModuleComponent},
  { path :'coursmodules/edit' , component: EditModuleComponent},
  { path :'etudiant' , component: GestionEtudiantComponent},
  { path :'etudiant/add' , component: AddNewEtudiantComponent},


  // not-found
    { path :'**' , component: NotFoundComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
