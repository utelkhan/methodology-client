import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {AddrType} from '../../model/mymodels/enums/addr-type';
import {Charm} from '../../model/mymodels/charm';
import {PhoneType} from '../../model/mymodels/enums/phone-type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientGender} from '../../model/mymodels/enums/client-gender';

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

  constructor(@Inject(MAT_DIALOG_DATA) public editingClientId: string,
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

    if (this.editingClientId) {
      this.action = 'Update';
      this.fillClientForm(this.editingClientId);
    }
  }

  private createClientForm() {
    // client details
    return this.clientForm = this.formBuilder.group({
      // client data
      id: [''],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      charm: ['', Validators.required],

      // client reg address
      regAddress: this.formBuilder.group({
        client: [''],
        type: [AddrType.REG, Validators.required],
        street: ['', Validators.required],
        house: ['', Validators.required],
        flat: ['', Validators.required],
      }),
      factAddress: this.formBuilder.group({
        client: [''],
        type: [AddrType.FACT],
        street: [''],
        house: [''],
        flat: [''],
      }),

      // client phones
      phones: this.formBuilder.array([
        this.formBuilder.group({
          client: [''],
          number: ['', Validators.required],
          type: [PhoneType.MOBILE],
        }),
        this.formBuilder.group({
          client: [''],
          number: [''],
          type: [PhoneType.HOME],
        }),
        this.formBuilder.group({
          client: [''],
          number: [''],
          type: [PhoneType.WORK],
        }),
      ], [Validators.maxLength(5), Validators.minLength(3)])
    });
  }

  private fillClientForm(id: string) {
    this.clientService.getClientByID(id).toPromise().then((client) => {

      this.clientForm.controls.id.setValue(client.id);
      this.clientForm.controls.surname.setValue(client.surname);
      this.clientForm.controls.name.setValue(client.name);
      this.clientForm.controls.patronymic.setValue(client.patronymic);
      this.clientForm.controls.gender.setValue(client.gender);
      this.clientForm.controls.birthDate.setValue(client.birthDate);
      this.clientForm.controls.charm.setValue(client.charm);
      this.clientForm.controls.regAddress.setValue(client.regAddress);
      this.clientForm.controls.factAddress.setValue(client.factAddress);

      this.phones = this.clientForm.get('phones') as FormArray;
      this.phones.clear();

      client.phones.forEach((phone) => {
        this.phones.push(
          this.formBuilder.group({
            client: [phone.client],
            number: [phone.number],
            type: [phone.type],
          })
        );
      });
      this.availableAdditionalPhones = 5 - client.phones.length;
    });
  }

  saveClient() {
    if (!this.editingClientId) {
      if (this.clientForm.valid) {
        this.clientService.createClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('create');
      }
    } else {
      if (this.clientForm.valid) {
        this.clientService.updateClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('update');
      }
    }
  }

  get phonesArrayControl(): FormArray {
    return this.clientForm.get('phones') as FormArray;
  }

  addAdditionalMobilePhone() {
    if (this.availableAdditionalPhones > 0) {
      this.availableAdditionalPhones--;
      this.phones = this.clientForm.get('phones') as FormArray;
      this.phones.push(
        this.formBuilder.group({
            client: [''],
            number: [''],
            type: [PhoneType.MOBILE],
          }
        )
      );
    }
  }

  removeAdditionalMobilePhone(index: number) {
    if (this.availableAdditionalPhones < 3) {
      this.phones = this.clientForm.get('phones') as FormArray;
      this.availableAdditionalPhones++;
      this.phones.removeAt(index);
    }
  }


}
