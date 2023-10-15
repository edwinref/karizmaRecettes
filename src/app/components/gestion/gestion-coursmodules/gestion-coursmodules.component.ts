import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Module } from "../../../models/modules.models";
import { ModuleService } from "../../../services/module-service.service";
import {ProfServiceService} from "../../../services/prof-service.service";
import {Prof} from "../../../models/prof.models";

@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-coursmodules.component.html',
  styleUrls: ['./gestion-coursmodules.component.css']
})
export class GestionModuleComponent implements OnInit {
  modules: Module[] = []; // Initialiser le tableau modules

  modulles :Module[] = [];

  module: Module | undefined;

  profs:Prof[]=[];

  errorMessage: string = '';
  searchFormGroup!: FormGroup;

  constructor(
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private router: Router,
    private profService:ProfServiceService,private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });

    // Appel de la fonction pour récupérer les modules depuis l'API
    this.loadModules();
    this.loadModulles();
    this.getAllProf();
  }

  getAllProf(){
    this.profService.getProfss().subscribe(data =>{
      this.profs = data;
      console.log(this.profs);
    })
  }



  // Fonction pour récupérer les modules depuis l'API
  loadModules() {
    this.moduleService.getModules().subscribe(
      (data: Module[]) => {
        this.modules = data; //
        console.log(" data0   "+data[0].libelle)// Mettre les données récupérées dans le tableau modules
        console.log(" data1   "+data[1].libelle)// Mettre les données récupérées dans le tableau modules
        console.log(" data2   "+data[2].libelle)// Mettre les données récupérées dans le tableau modules
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des modules.';
        console.error(error);
      }
    );
  }

  loadModulles() {
    this.moduleService.getModulles().subscribe(
      (data: Module[]) => {
        this.modulles = data; //
        console.log(this.modulles)
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des modules.';
        console.error(error);
      }
    );
  }

  handleEditModule(module: Module) {
    // Redirect to the module edit page
    this.router.navigateByUrl('/coursmodules/edit', { state: module });
  }

  handleDeleteModule(module: Module) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.moduleService.deleteModule(module.id).subscribe(() => {
          // Remove the deleted module from the list
          this.modules = this.modules.filter((m) => m.id !== module.id);
        });
      }
    });
  }
  affect(form: NgForm) {
    // You can also access the form object if needed
console.log(form.value)
    let module:Module = form.value.module;
    module.enseignant = form.value.prof;
    console.log(module)
    this.moduleService.createModule(module, module.classe.id).subscribe(data =>{
      console.log(data)
      Swal.fire('Success', 'Module Affected avec succès', 'success');
      this.hideModal();

    },
      err => {
      console.error(err);
      if (err.error && err.error.message) {
        Swal.fire('Error', err.error.message, 'error');
      } else {
        Swal.fire('Error', 'erreuur', 'error');
      }
        this.hideModal();
    }
    )
  }
  hideModal() {
    const modal = this.renderer.selectRootElement('#exampleModal');
    this.renderer.setProperty(modal, 'hidden', true);
  }
}
