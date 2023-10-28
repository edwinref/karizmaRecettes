import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import {Module} from "../../../models/modules.models";
import {ModuleService} from "../../../services/module-service.service";
import {Classe} from "../../../models/classes.models";
import {ClasseService} from "../../../services/classe.service";

@Component({
  selector: 'app-edit-coursmodules',
  templateUrl: './edit-coursmodules.component.html', // Update the HTML template file name
  styleUrls: ['./edit-coursmodules.component.css'] // Update the CSS file name
})
export class EditModuleComponent implements OnInit {
  editModuleFormGroup!: FormGroup;
  module!: Module;
  classe: Classe[] = [];

  constructor(private moduleService: ModuleService,
              private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,    private classeService: ClasseService,
  ) {
    this.module = this.router.getCurrentNavigation()?.extras.state as Module;
  }

  ngOnInit(): void {
    this.editModuleFormGroup = this.fb.group({
      volumeHoraireOnsite: [''],
      volumeHoraireOnRemote: [''],
      nbrTD: [''],
      nbrTP: [''],
      nbrEvaluation: [''],
      libelle: [''],
      isSeperated: [''],
      isMetuale: [''],
      classe: [''],
    });
    this.fetchClasse();
    this.setFormValues();
  }

  setFormValues() {
    if (this.module) {
      this.editModuleFormGroup.patchValue({
        volumeHoraireOnsite: this.module.volumeHoraireOnsite,
        volumeHoraireOnRemote: this.module.volumeHoraireOnRemote,
        nbrTD: this.module.nbrTD,
        nbrTP: this.module.nbrTP,
        nbrEvaluation: this.module.nbrEvaluation,
        libelle: this.module.libelle,
        isSeperated: this.module.isSeperated,
        isMetuale: this.module.isMetuale,
        classe: this.module.classe?.id,
      });
    }
  }
  fetchClasse() {
    this.classeService.getClasses1().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          const filieres: Classe[] = response.content;
          this.classe = filieres;

          if (this.classe.length > 0) {
            this.editModuleFormGroup.patchValue({ filiere: this.classe[0] });
          }
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleUpdateModule() {
    if (this.editModuleFormGroup.valid && this.module) {
      const updatedModule: Module = {
        ...this.module,
        ...this.editModuleFormGroup.value
      };

      const selectedClasseId: number = +updatedModule.classe; // Utilisez une assertion de type si nécessaire

      const classeId = this.classe.find(classe => classe.id === selectedClasseId);
      if (classeId) {
        updatedModule.classe = classeId; // Créez un objet Classe avec l'ID sélectionné

        this.moduleService.updateModule(updatedModule.id, updatedModule, classeId.id).subscribe((data) => {
          Swal.fire('Success', 'Module updated successfully', 'success');
          this.router.navigateByUrl('/coursmodules');
        });
      } else {
        Swal.fire('Error', 'Please select a class before updating the module', 'error');
      }
    } else {
      Swal.fire('Error', 'Please fill in all the fields correctly', 'error');
    }
  }


}
