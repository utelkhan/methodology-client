import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {ClientService} from '../../../services/client/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {DataForTable} from '../../model/mymodels/data-for-table';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'charm', 'age', 'totalAccountBalance', 'maximumBalance', 'minimumBalance', 'options'];
  dataSource!: MatTableDataSource<DataForTable>;
  dataForTable!: DataForTable[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getDataForTable();
  }

  ngAfterViewInit() {
    this.getDataForTable();
  }

  getDataForTable() {
    this.clientService.getDataForTable().toPromise().then((dataList) => {
      this.dataForTable = dataList;
      this.dataSource = new MatTableDataSource<DataForTable>(this.dataForTable);
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.getDataForTable();
    });
  }

  openEditClientDialog(id: number): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%',
      data: id,
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.getDataForTable();
    });
  }

  deleteClient(id: number) {
    this.clientService.deleteClientById(id);
    this.getDataForTable();
  }



}
