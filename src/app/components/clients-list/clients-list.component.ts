import { Component, OnInit } from '@angular/core';
import {Client} from '../../model/client';
import {ClientService} from '../../../services/client/client.service';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grandTotalOfBalance', 'maximumBalance', 'minimumBalance', 'options'];
  clientsObs: Observable<Client[]>;
  constructor(private dialog: MatDialog, private clientService: ClientService) {}
  ngOnInit(): void {
    this.clientsObs = this.clientService.getClients();
  }
  openAddClientDialog() {
    this.dialog.open(AddClientComponent, {
      width: '50%'
    });
  }
}
