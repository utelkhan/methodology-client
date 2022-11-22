import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {Addr_type} from '../../model/mymodels/enums/addr_type';
import {Charm} from '../../model/mymodels/charm';
import {Client_addr} from '../../model/mymodels/client_addr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  regAddressForm!: FormGroup;
  factAddressForm!: FormGroup;
  phoneForm!: FormGroup;

  charms!: Charm[];

  factAddresses = false;
  mobile2 = false;
  mobile3 = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getCharms().toPromise().then((c) => {
      this.charms = c;
    });
    this.clientForm = this.formBuilder.group ({
      // client data
      id: [this.clientService.getLastId() + 1],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: ['', ],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      charm: ['', Validators.required],
    });
    this.regAddressForm = this.formBuilder.group ({
      // client address
      client: [],
      type: [Addr_type.REG, Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      flat: [''],
    });
    this.factAddressForm = this.formBuilder.group ({
      // client address
      client: [],
      type: [Addr_type.FACT],
      street: ['', Validators.required],
      house: ['', Validators.required],
      flat: [''],
    });
    this.phoneForm = this.formBuilder.group ({
      // client phone
      client: [],
      number: ['', Validators.required],
      type: [],
    });
  }

  changeAddingFactAddress() {
    if (this.factAddresses) {
    } else {
    }
    this.factAddresses = !this.factAddresses;
  }


  addClient() {
    if (this.clientForm.valid && this.regAddressForm.valid && this.phoneForm.valid) {
      console.log('ADD_CLIENT_COMPONENT.addClient: addingForm is valid!!!');
      console.log('ADD_CLIENT_COMPONENT.addClient: addressForm is valid!!!');
      console.log('ADD_CLIENT_COMPONENT.addClient: phoneForm is valid!!!');

      this.clientService.addClient(this.clientForm.value).toPromise().then((c) => {
        console.log('ADD_CLIENT_COMPONENT.addClient: clients after adding new client', c);
        // если клиент успешно добавиться то выполняеться запрос на добавление адреса клиентов
        this.clientService.addAddresses(this.clientForm.value.id, this.regAddressForm.value).toPromise().then((a) => {
          console.log('ADD_CLIENT_COMPONENT.addClient: addresses after adding new address', a);
        });

        // если клиент успешно добавиться то выполняеться запрос на добавление телефона клиентов
        this.clientService.addPhones(this.clientForm.value.id, this.phoneForm.value).toPromise().then((p) => {
          console.log('ADD_CLIENT_COMPONENT.addClient: phones after adding new address', p);
        });

        if (this.factAddresses) {
          this.clientService.addAddresses(this.clientForm.value.id, this.factAddressForm.value).toPromise().then((a) => {
            console.log('ADD_CLIENT_COMPONENT.addClient: addresses after adding new address', a);
          });
        }
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
