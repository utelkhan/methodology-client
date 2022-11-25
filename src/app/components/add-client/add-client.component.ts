import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {AddrType} from '../../model/mymodels/enums/addr_type';
import {Charm} from '../../model/mymodels/charm';
import {PhoneType} from '../../model/mymodels/enums/phone_type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientGender} from '../../model/mymodels/enums/client_gender';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;
  charms!: Charm[];
  gender = ClientGender;
  phones = new FormArray([]);

  maxDate!: Date;
  availableAdditionalPhones = 2;

  action = 'Add';

  constructor(@Inject(MAT_DIALOG_DATA) public editingClient: any,
              private formBuilder: FormBuilder,
              private clientService: ClientService,
              private dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();

    this.clientForm = this.createClientForm();

    // getting charms
    this.clientService.getCharms().toPromise().then((charms) => {
      this.charms = charms;
    });

    if (this.editingClient) {
      this.action = 'Update';
      this.fillClientForm();
    }
  }

  private createClientForm() {
    // client details
    return this.clientForm = this.formBuilder.group({
      // client data
      id: [],
      surname: [Validators.required],
      name: [Validators.required],
      patronymic: [],
      gender: [Validators.required],
      birthDate: [Validators.required],
      charm: [Validators.required],

      // client reg address
      regAddress: this.formBuilder.group({
        client: [],
        type: [AddrType.REG, Validators.required],
        street: [Validators.required],
        house: [Validators.required],
        flat: [Validators.required],
      }),
      factAddress: this.formBuilder.group({
        client: [],
        type: [AddrType.FACT],
        street: [],
        house: [],
        flat: [],
      }),

      // client phones
      phones: this.formBuilder.array([
        this.formBuilder.group({
          client: [],
          number: [Validators.required],
          type: [PhoneType.MOBILE],
        }),
        this.formBuilder.group({
          client: [],
          number: [],
          type: [PhoneType.HOME],
        }),
        this.formBuilder.group({
          client: [],
          number: [],
          type: [PhoneType.WORK],
        }),
      ], [Validators.maxLength(5), Validators.minLength(1)])
    });
  }

  private fillClientForm() {
    this.action = 'Update';
    this.clientForm.controls.id.setValue(this.editingClient.id);
    this.clientForm.controls.surname.setValue(this.editingClient.age);
    this.clientForm.controls.surname.setValue(this.editingClient.surname);
    this.clientForm.controls.name.setValue(this.editingClient.name);
    this.clientForm.controls.patronymic.setValue(this.editingClient.patronymic);
    this.clientForm.controls.gender.setValue(this.editingClient.gender);
    this.clientForm.controls.birthDate.setValue(this.editingClient.birthDate);
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

    if (this.editingClient.phones.length === 1) {
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [PhoneType.HOME],
        })
      );
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [PhoneType.WORK],
        })
      );
    } else if (this.editingClient.phones.length === 2) {
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [PhoneType.WORK],
        })
      );
    }
    this.availableAdditionalPhones = 5 - this.phones.length;
  }

  saveClient() {
    if (!this.editingClient) {
      if (this.clientForm.valid) {
        console.log('adding client', this.clientForm.value);
        this.clientService.addClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('add');
      }
    } else {
      if (this.clientForm.valid) {
        console.log('editing client', this.editingClient);
        this.clientService.editClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('edit');
      }
    }
  }

  get phonesArrayControl(): FormArray {
    return this.clientForm.get('phones') as FormArray;
  }

  addAdditionalMobilePhone() {
    console.log(this.clientForm.get('birthDate'));
    if (this.availableAdditionalPhones > 0) {
      this.availableAdditionalPhones--;
      this.phones = this.clientForm.get('phones') as FormArray;
      this.phones.push(
        this.formBuilder.group({
            client: [],
            number: [],
            type: [PhoneType.MOBILE],
          }
        )
      );
    }
  }

  removeAdditionalMobilePhone() {
    if (this.availableAdditionalPhones < 3) {
      this.phones = this.clientForm.get('phones') as FormArray;
      this.availableAdditionalPhones++;
      this.phones.removeAt(this.phones.length - 1);
    }
  }


}
