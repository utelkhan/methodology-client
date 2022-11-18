import { Component, OnInit } from '@angular/core';
import {Client} from '../../model/client';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'age', 'grandTotalOfBalance', 'maximumBalance', 'minimumBalance'];
  data: Client[];
  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.data = this.clientService.getClients();
  }
}
