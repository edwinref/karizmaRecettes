import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {ModuleService} from "../../../services/module-service.service";
import {Module} from "../../../models/modules.models";
import {Classe} from "../../../models/classes.models";
import {Filiere} from "../../../models/filieres.models";
import {ClasseService} from "../../../services/classe.service";

@Component({
  selector: 'app-add-new-coursmodel',
  templateUrl: './add-new-coursmodel.component.html',
  styleUrls: ['./add-new-coursmodel.component.css']
})
export class AddNewModuleComponent implements OnInit {
  newModuleFormGroup!: FormGroup;
  classe: Classe[] = [];

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private router: Router,
    private classeService: ClasseService,

  ) {}

  ngOnInit(): void {
    this.newModuleFormGroup = this.fb.group({
      volumeHoraireOnsite: this.fb.control(null, [Validators.required]),
      volumeHoraireOnRemote: this.fb.control(null, [Validators.required]),
      nbrTD: this.fb.control(null, [Validators.required]),
      nbrTP: this.fb.control(null, [Validators.required]),
      nbrEvaluation: this.fb.control(null, [Validators.required]),
      libelle: this.fb.control(null, [Validators.required]),
      isSeperated: this.fb.control(null, [Validators.required]),
      isMetuale: this.fb.control(null, [Validators.required]),
      classe: this.fb.control(null, [Validators.required]) // Assuming you have a form control for selecting a classe
    });
    this.fetchClasse();
  }
  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.classe = filieres;
          this.classe.forEach(classeItem => {
            console.log("claaas " + classeItem.id);
          });
          if (this.classe.length > 0) {
            this.newModuleFormGroup.patchValue({ filiere: this.classe[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
          // Handle the unexpected response here, such as displaying an error message.
        }
      },
      (error) => {
        console.log(error);
        // Handle the error here, such as displaying an error message.
      }
    );
  }
  handleAddModule() {
    if (this.newModuleFormGroup.valid) {
      const newModule: Module = this.newModuleFormGroup.value;
      const selectedClasseId: number = +newModule.classe; // Use a type assertion if necessary

      const classeId = this.classe.find(classe => classe.id === selectedClasseId);
      if (classeId) {
        newModule.classe = classeId; // Create a Classe object with the selected ID
        console.log("class"+classeId.id);
        this.moduleService.createModule(newModule, classeId.id).subscribe({
          next: data => {
            Swal.fire('Success', 'Module added successfully', 'success');
            this.router.navigateByUrl('/coursmodules');
          },
          error: err => {
            console.error(err);
            if (err.error && err.error.message) {
              Swal.fire('Error', err.error.message, 'error');
            } else {
              Swal.fire('Error', 'An error occurred while adding the module', 'error');
            }
          }
        });
      } else {
        Swal.fire('Error', 'Please select a class before adding the module', 'error');
      }
    } else {
      Swal.fire('Error', 'Please fill in all the fields correctly', 'error');
    }
  }

// This function should be defined to get the selected class ID based on your application logic.
  getSelectedClasseId(): number | null {
    // Replace this with your logic to get the selected class ID, e.g., from a form control or other user input.
    const selectedClasseId: number | null = this.newModuleFormGroup.value.classeId;
    return selectedClasseId;
  }
}
