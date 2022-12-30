import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientController} from '../../../controller/client.controller';
import {AddrType} from '../../model/enums/addr-type';
import {Charm} from '../../model/charm';
import {PhoneType} from '../../model/enums/phone-type';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientGender} from '../../model/enums/client-gender';
import {CharmController} from '../../../controller/charm.controller';

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
  countOfMobilePhones = 1;
  action = 'Add';

  constructor(@Inject(MAT_DIALOG_DATA) public editingClientId: string,
              private formBuilder: FormBuilder,
              private clientController: ClientController,
              private charmController: CharmController,
              private dialogRef: MatDialogRef<AddClientComponent>) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();

    this.clientForm = this.createClientForm();

    // getting charms
    this.charmController.getCharms().toPromise().then((charms) => {
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
      id: [null],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      charmId: ['', Validators.required],

      // client reg address
      regAddress: this.formBuilder.group({
        clientId: [null],
        type: [AddrType.REG, Validators.required],
        street: ['', Validators.required],
        house: ['', Validators.required],
        flat: ['', Validators.required],
      }),
      factAddress: this.formBuilder.group({
        clientId: [null],
        type: [AddrType.FACT],
        street: [''],
        house: [''],
        flat: [''],
      }),

      // client phones
      phones: this.formBuilder.array([
        this.formBuilder.group({
          clientId: [null],
          number: ['', Validators.required],
          type: [PhoneType.MOBILE],
          required: [true],

        }),
        this.formBuilder.group({
          clientId: [null],
          number: [''],
          type: [PhoneType.HOME],
          required: [false],
        }),
        this.formBuilder.group({
          clientId: [null],
          number: [''],
          type: [PhoneType.WORK],
          required: [false],
        }),
      ], [Validators.minLength(3)])
    });
  }

  private fillClientForm(id: string) {
    let phoneOrder = 0;
    this.clientController.getClientByID(id).toPromise().then((client) => {
      this.clientForm.controls.id.setValue(client.id);
      this.clientForm.controls.surname.setValue(client.surname);
      this.clientForm.controls.name.setValue(client.name);
      this.clientForm.controls.patronymic.setValue(client.patronymic);
      this.clientForm.controls.gender.setValue(client.gender);
      this.clientForm.controls.birthDate.setValue(new Date(client.birthDate));
      this.charms.forEach((c) => {
        if (c.id === client.charmId) {
          this.clientForm.controls.charmId.setValue(c.name);
        }
      });
      this.clientForm.controls.regAddress.setValue(client.regAddress);
      this.clientForm.controls.factAddress.setValue(client.factAddress);

      this.phones = this.clientForm.get('phones') as FormArray;
      client.phones.forEach(item => {
        if (item.required === true) {
          phoneOrder = 0;
        } else if (item.type.toString() === PhoneType.HOME.toString()) {
          phoneOrder = 1;
        } else if (item.type.toString() === PhoneType.WORK.toString()) {
          phoneOrder = 2;
        }
        if (item.required === false && item.type.toString() === PhoneType.MOBILE.toString()) {
          this.phones.push(this.formBuilder.group({
              clientId: [item.clientId],
              number: [item.number],
              type: [item.type],
              required: [item.required],
            })
          );
        } else {
          this.phones.setControl(phoneOrder, this.formBuilder.group({
              clientId: [item.clientId],
              number: [item.number],
              type: [item.type],
              required: [item.required],
            })
          );
        }
      });
    });
    console.log(this.phones);
  }

  saveClient() {
    if (this.clientForm.valid) {
      this.charms.forEach((c) => {
        if (c.name === this.clientForm.controls.charmId.value) {
          this.clientForm.controls.charmId.setValue(c.id);
        }
      });

      if (!this.editingClientId) {
        this.clientController.createClient(this.clientForm.value).toPromise().then(result => {
          this.clientForm.reset();
          this.dialogRef.close('create');
        });
      } else {
        this.clientController.updateClient(this.clientForm.value).toPromise().then(result => {
          this.clientForm.reset();
          this.dialogRef.close('update');
        });
      }
    }
  }

  get phonesArrayControl(): FormArray {
    return this.clientForm.get('phones') as FormArray;
  }

  addAdditionalMobilePhone() {
    this.countOfMobilePhones++;
    this.phones = this.clientForm.get('phones') as FormArray;
    this.phones.push(
      this.formBuilder.group({
          clientId: [this.editingClientId],
          number: [null],
          type: [PhoneType.MOBILE],
          required: [false],
        }
      )
    );
  }

  removeAdditionalMobilePhone(index: number) {
    if (this.countOfMobilePhones > 1) {
      this.phones = this.clientForm.get('phones') as FormArray;
      this.phones.removeAt(index);
    }
  }


}
