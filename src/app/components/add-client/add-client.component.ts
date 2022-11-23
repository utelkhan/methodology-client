import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {Addr_type} from '../../model/mymodels/enums/addr_type';
import {Charm} from '../../model/mymodels/charm';
import {Phone_type} from '../../model/mymodels/enums/phone_type';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  regAddressForm!: FormGroup;
  factAddressForm!: FormGroup;

  homePhoneForm!: FormGroup;
  workPhoneForm!: FormGroup;
  mobile1PhoneForm!: FormGroup;
  mobile2PhoneForm!: FormGroup;
  mobile3PhoneForm!: FormGroup;

  charms!: Charm[];

  factAddresses = false;
  homePhone = false;
  workPhone = false;
  mobile2Phone = false;
  mobile3Phone = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    // charms
    this.clientService.getCharms().toPromise().then((c) => {
      this.charms = c;
    });

    // client details
    this.clientForm = this.formBuilder.group({
      // client data
      id: [this.clientService.getLastId() + 1],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      charm: ['', Validators.required],
    });

    // client addresses
    this.regAddressForm = this.formBuilder.group({
      // client reg address
      client: [],
      type: [Addr_type.REG, Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      flat: [''],
    });
    this.factAddressForm = this.formBuilder.group({
      // client fact address
      client: [],
      type: [Addr_type.FACT],
      street: ['', Validators.required],
      house: ['', Validators.required],
      flat: [''],
    });

    // client phones
    this.mobile1PhoneForm = this.formBuilder.group({
      // client mobile1PhoneForm
      client: [],
      number: ['', Validators.required],
      type: [Phone_type.MOBILE, Validators.required],
    });
    this.homePhoneForm = this.formBuilder.group({
      // client mobile1PhoneForm
      client: [],
      number: [''],
      type: [Phone_type.HOME, Validators.required],
    });
    this.workPhoneForm = this.formBuilder.group({
      // client mobile1PhoneForm
      client: [],
      number: ['', Validators.required],
      type: [Phone_type.WORK, Validators.required],
    });
    this.mobile2PhoneForm = this.formBuilder.group({
      // client mobile2PhoneForm
      client: [],
      number: [''],
      type: [Phone_type.MOBILE, Validators.required],
    });
    this.mobile3PhoneForm = this.formBuilder.group({
      // client mobile3PhoneForm
      client: [],
      number: [''],
      type: [Phone_type.MOBILE, Validators.required],
    });
  }

  changeAddingFactAddress() {
    this.factAddresses = !this.factAddresses;
    if (this.factAddresses === false) {
      this.factAddressForm.reset();
    }
  }
  changeAddingHomePhone() {
    this.homePhone = !this.homePhone;
    if (this.homePhone === false) {
      this.homePhoneForm.reset();
    }
  }
  changeAddingWorkPhone() {
    this.workPhone = !this.workPhone;
    if (this.workPhone === false) {
      this.workPhoneForm.reset();
    }
  }
  changeAddingMobile2Phone() {
    this.mobile2Phone = !this.mobile2Phone;
    if (this.mobile2Phone === false) {
      this.mobile2PhoneForm.reset();
    }
  }
  changeAddingMobile3Phone() {
    this.mobile3Phone = !this.mobile3Phone;
    if (this.mobile3Phone === false) {
      this.mobile3PhoneForm.reset();
    }
  }

  addClient() {
    if (this.clientForm.valid && this.regAddressForm.valid && this.mobile1PhoneForm.valid) {

      this.clientService.addClient(this.clientForm.value).toPromise().then((c) => {
        // добавление адрессов
        this.clientService.addAddresses(this.clientForm.value.id, this.regAddressForm.value).toPromise().then((a) => {
          this.regAddressForm.reset();
        });

        if (this.factAddresses) {
          this.clientService.addAddresses(this.clientForm.value.id, this.factAddressForm.value).toPromise().then((a) => {
            this.factAddressForm.reset();
          });
        }
        // конец добавления адрессов

        // добавление телефонов
        this.clientService.addPhones(this.clientForm.value.id, this.mobile1PhoneForm.value).toPromise().then((p) => {
          this.mobile1PhoneForm.reset();
        });
        if (this.homePhone && this.homePhoneForm.valid && this.homePhoneForm.value.number !== '') {
          this.clientService.addPhones(this.clientForm.value.id, this.homePhoneForm.value).toPromise().then((p) => {
            this.homePhoneForm.reset();
          });
        }
        if (this.workPhone && this.workPhoneForm.valid && this.workPhoneForm.value.number !== '') {
          this.clientService.addPhones(this.clientForm.value.id, this.workPhoneForm.value).toPromise().then((p) => {
            this.workPhoneForm.reset();
          });
        }
        if (this.mobile2Phone && this.mobile2PhoneForm.valid && this.mobile2PhoneForm.value.number !== '') {
          this.clientService.addPhones(this.clientForm.value.id, this.mobile2PhoneForm.value).toPromise().then((p) => {
            this.mobile2PhoneForm.reset();
          });
        }
        if (this.mobile3Phone && this.mobile3PhoneForm.valid && this.mobile3PhoneForm.value.number !== '') {
          this.clientService.addPhones(this.clientForm.value.id, this.mobile3PhoneForm.value).toPromise().then((p) => {
            this.mobile3PhoneForm.reset();
          });
        }
        // конец добавления телефонов
        this.clientForm.reset();
        this.dialogRef.close();
      });
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
