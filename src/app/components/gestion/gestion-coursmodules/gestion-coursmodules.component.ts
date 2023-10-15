import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Module } from "../../../models/modules.models";
import { ModuleService } from "../../../services/module-service.service";

@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-coursmodules.component.html',
  styleUrls: ['./gestion-coursmodules.component.css']
})
export class GestionModuleComponent implements OnInit {
  modules: Module[] = []; // Initialiser le tableau modules

  errorMessage: string = '';
  searchFormGroup!: FormGroup;

  constructor(
    private moduleService: ModuleService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });

    // Appel de la fonction pour récupérer les modules depuis l'API
    this.loadModules();
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
}
