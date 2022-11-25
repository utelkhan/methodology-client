import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {Addr_type} from '../../model/mymodels/enums/addr_type';
import {Charm} from '../../model/mymodels/charm';
import {Phone_type} from '../../model/mymodels/enums/phone_type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client_gender} from '../../model/mymodels/enums/client_gender';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  charms!: Charm[];
  gender = Client_gender;
  phones = new FormArray([]);

  maxDate!: Date;
  additionalPhones = 0;

  action = 'add';

  constructor(@Inject(MAT_DIALOG_DATA) public editingClient: any, private formBuilder: FormBuilder, private clientService: ClientService, private dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();

    this.clientForm = this.createAddingForm();

    // getting charms
    this.clientService.getCharms().toPromise().then((charms) => {
      this.charms = charms;
    });

    if (this.editingClient) {
      this.action = 'edit';
      this.createEditingForm();
    }
  }

  private createAddingForm() {
    // client details
    return this.clientForm = this.formBuilder.group({
      // client data
      id: [],
      surname: [, Validators.required],
      name: [, Validators.required],
      patronymic: [],
      gender: [, Validators.required],
      birth_date: [, [Validators.required]],
      charm: [, Validators.required],

      // client reg address
      regAddress: this.formBuilder.group({
        client: [],
        type: [Addr_type[1], Validators.required],
        street: [, Validators.required],
        house: [, Validators.required],
        flat: [],
      }),
      factAddress: this.formBuilder.group({
        client: [],
        type: [Addr_type[0]],
        street: [],
        house: [],
        flat: [],
      }),

      // client phones
      phones: this.formBuilder.array([
        this.formBuilder.group({
          client: [],
          number: [, Validators.required],
          type: [Phone_type[2]],
        }),
        this.formBuilder.group({
          client: [],
          number: [],
          type: [Phone_type[0]],
        }),
        this.formBuilder.group({
          client: [],
          number: [],
          type: [Phone_type[1]],
        }),
      ], [Validators.maxLength(5), Validators.minLength(1)])
    });
  }

  private createEditingForm() {
    // this.action = 'update';
    this.clientForm.controls.id.setValue(this.editingClient.id);
    this.clientForm.controls.surname.setValue(this.editingClient.age);
    this.clientForm.controls.surname.setValue(this.editingClient.surname);
    this.clientForm.controls.name.setValue(this.editingClient.name);
    this.clientForm.controls.patronymic.setValue(this.editingClient.patronymic);
    this.clientForm.controls.gender.setValue(this.editingClient.gender);
    this.clientForm.controls.birth_date.setValue(this.editingClient.birth_date);
    this.clientForm.controls.charm.setValue(this.editingClient.charm);
    this.clientForm.controls.regAddress.setValue(this.editingClient.regAddress);
    this.clientForm.controls.factAddress.setValue(this.editingClient.factAddress);

    this.phones = this.clientForm.get('phones') as FormArray;
    this.phones.clear();

    this.editingClient.phones.forEach((phone) => {
      this.phones.push(
        this.formBuilder.group({
          client: [phone.client],
          number: [phone.number],
          type: [phone.type],
        })
      );
    });
    if (this.editingClient.phones.length < 2) {
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [Phone_type.HOME],
        })
      );
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [Phone_type.WORK],
        })
      );
    }
    if (this.editingClient.phones.length < 3) {
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [Phone_type.WORK],
        })
      );
    }
    this.additionalPhones = this.editingClient.phones.length - 2;
  }

  addOrEditClient() {
    if (!this.editingClient) {
      if (this.clientForm.valid) {
        console.log('adding client', this.clientForm.value);
        this.clientService.addClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('add');
      }
    } else {
      console.log('editing client', this.editingClient);
      this.clientService.editClient(this.clientForm.value);
      this.clientForm.reset();
      this.dialogRef.close('edit');
    }
  }

  get phonesArrayControl(): FormArray {
    return this.clientForm.get('phones') as FormArray;
  }

  addAdditionalMobilePhone() {
    console.log(this.clientForm.get('birth_date'));
    if (this.additionalPhones <= 2) {
      this.additionalPhones++;
      this.phones = this.clientForm.get('phones') as FormArray;
      this.phones.push(
        this.formBuilder.group({
            client: [],
            number: [],
            type: [Phone_type[2]],
          }
        )
      );
    }
  }

  removeAdditionalMobilePhone() {
    if (this.additionalPhones > -1) {
      this.phones = this.clientForm.get('phones') as FormArray;
      this.additionalPhones--;
      this.phones.removeAt(this.phones.length - 1);
    }
  }


}

// export class AddClientComponent implements OnInit {
//   action = 'add';
//   clientForm!: FormGroup;
//
//   constructor(@Inject(MAT_DIALOG_DATA) public editClient: any, private clientService: ClientService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddClientComponent>) {}
//
//   ngOnInit(): void {
//     this.clientForm = this.formBuilder.group({
//       surname: ['', Validators.required],
//       name: ['', Validators.required],
//       patronymic: ['', ],
//       gender: ['', Validators.required],
//       birth_date: ['', Validators.required],
//       charm: ['', Validators.required],
//     });
//     if (this.editClient) {
//       this.action = 'update';
//       this.clientForm.controls.fullName.setValue(this.editClient.fullName);
//       this.clientForm.controls.age.setValue(this.editClient.age);
//       this.clientForm.controls.grandTotalOfBalance.setValue(this.editClient.grandTotalOfBalance);
//       this.clientForm.controls.maximumBalance.setValue(this.editClient.maximumBalance);
//       this.clientForm.controls.minimumBalance.setValue(this.editClient.minimumBalance);
//     }
//   }
//   onClickCancel() {
//     this.dialogRef.close();
//   }
//   addClient() {
//     if (!this.editClient) {
//       if (this.clientForm.valid) {
//         this.clientService.addClient(this.clientForm.value).toPromise().then((response) => {
//             this.clientForm.reset();
//             this.dialogRef.close('add');
//           }).catch((exc) => {
//             console.log('Something went wrong when adding client: ', this.clientForm);
//             console.log('Exception is ', exc);
//         });
//       }
//     } else {
//       this.clientService.updateClient(this.clientForm.value).toPromise().then((response) => {
//         this.clientForm.reset();
//         this.dialogRef.close('update');
//       }).catch((exc) => {
//         console.log('Something went wrong when updating client: ', this.editClient);
//         console.log('Exception is ', exc);
//       });
//     }
//   }
// }
