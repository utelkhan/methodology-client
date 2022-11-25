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
  availableAdditionalPhones = 2;

  action = 'add';

  // todo: в конструкторах могут подключать очень много. Через enter если проставить, будет удобнее читать
  constructor(@Inject(MAT_DIALOG_DATA) public editingClient: any,
              private formBuilder: FormBuilder,
              private clientService: ClientService,
              private dialogRef: MatDialogRef<AddClientComponent>) {
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

  // todo: Название методе не соответсвует.
  //  Ты назвал создание форму для добавления, но эта форма так же будет использоваться, если будет Редактирование
  //  Поэтому лучше будет назвать, что этот метод делает, а не для чего он будет использоваться. Например createClientForm
  private createAddingForm() {
    // client details
    return this.clientForm = this.formBuilder.group({
      // client data
      id: [],
      // todo: Эти запятые можно и не ставить
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
        flat: [, Validators.required],
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
          // todo: Тут непонятно какое значения enum используется. Лучше будет, если напишешь так: Phone_type.MOBILE
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

  // todo: Название методе не соответсвует.
  //  Так как тут ты не создаешь, а присваеваешь значение будет более уместно назвать что то наподобии fillClientForm()
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

    if (this.editingClient.phones.length === 1) {
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
    } else if (this.editingClient.phones.length === 2) {
      this.phones.push(
        this.formBuilder.group({
          client: [this.editingClient.id],
          number: [],
          type: [Phone_type.WORK],
        })
      );
    }
    this.availableAdditionalPhones = 5 - this.phones.length;
  }

  // todo: На практике используется стараются избегать таких названии: что то or что то
  //  Это означает, что такой метод можно разделить на два разных метода, либо нужно придумать более обобщенный вариант названии
  //  К примеру тут можно назвать saveClient() - в проектах обычно так и называют, когда нужно либо создать или редактировать
  addOrEditClient() {
    if (!this.editingClient) {
      if (this.clientForm.valid) {
        console.log('adding client', this.clientForm.value);
        this.clientService.addClient(this.clientForm.value);
        this.clientForm.reset();
        this.dialogRef.close('add');
      }
    } else {
      // todo: тут проверки нет на влидность формы
      //  Если при редактировании убрать Имя и Фамилия к примеру, можно будет сохранить без них
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
    if (this.availableAdditionalPhones > 0) {
      this.availableAdditionalPhones--;
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
    if (this.availableAdditionalPhones < 3) {
      this.phones = this.clientForm.get('phones') as FormArray;
      this.availableAdditionalPhones++;
      this.phones.removeAt(this.phones.length - 1);
    }
  }


}

// todo: Лишние комментарии убрать
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
