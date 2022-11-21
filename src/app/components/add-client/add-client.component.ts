import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  action = 'add';
  clientForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public editClient: any, private clientService: ClientService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddClientComponent>) { }
  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      id: ['', Validators.required],
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      grandTotalOfBalance: ['', Validators.required],
      maximumBalance: ['', Validators.required],
      minimumBalance: ['', Validators.required],
    });
    if (this.editClient) {
      this.action = 'update';
      this.clientForm.controls.id.setValue(this.editClient.id);
      this.clientForm.controls.fullName.setValue(this.editClient.fullName);
      this.clientForm.controls.age.setValue(this.editClient.age);
      this.clientForm.controls.grandTotalOfBalance.setValue(this.editClient.grandTotalOfBalance);
      this.clientForm.controls.maximumBalance.setValue(this.editClient.maximumBalance);
      this.clientForm.controls.minimumBalance.setValue(this.editClient.minimumBalance);
    }
  }
  onClickCancel() {
    this.dialogRef.close();
  }
  addClient() {
    if (!this.editClient) {
      if (this.clientForm.valid) {
        this.clientService.addClient(this.clientForm.value).subscribe({
          next: (response) => {
            alert('Client successfully added');
            this.clientForm.reset();
            this.dialogRef.close('add');
          },
          error: () => {
            alert('Error while adding client');
          }
        });
      }
    } else {
      this.clientService.updateClient(this.clientForm.value).subscribe({
        next: (response) => {
          alert('Client successfully updated');
          this.clientForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Error while updating client');
        }
      });
    }
  }
}
