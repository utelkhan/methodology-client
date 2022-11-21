import { Component, OnInit } from '@angular/core';
import {Client} from '../../model/client';
import {ClientService} from '../../../services/client/client.service';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {of} from 'rxjs';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grandTotalOfBalance', 'maximumBalance', 'minimumBalance', 'options'];
  clients: Client[];
  constructor(private dialog: MatDialog, private clientService: ClientService) {}
  ngOnInit(): void {
    this.getClients();
  }
  getClients() {
    this.clientService.getClients().subscribe((clientsList) => {
      this.clients = clientsList;
    });
  }
  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe((type) => {
      if (type === 'add') {
        this.clientService.getClients().subscribe((clientsList) => {
          console.log('hello from after closed dialog');
          of(clientsList).subscribe((c) => {
            console.log('its after closed dialog clients ', c);
          });
          this.clients = clientsList;
        });
      }
    });
  }
  openEditClientDialog(client: Client): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '50%',
      data: client
    });
    dialogRef.afterClosed().subscribe((type) => {
      if (type === 'update') {
        this.clientService.getClients().subscribe((clientsList) => {
          this.clients = clientsList;
        });
      }
    });
  }
  deleteClient(id: number) {
    this.clientService.deleteClient(id);
    this.clientService.getClients().subscribe((clientsList) => {
      this.clients = clientsList;
    });
  }
}
