import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {ClientService} from '../../../services/client/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DataForTable} from '../../model/mymodels/data-for-table';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'charm', 'age', 'totalAccountBalance', 'maximumBalance', 'minimumBalance', 'options'];
  dataSource!: MatTableDataSource<DataForTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getDataForTable();
  }

  getDataForTable() {
    this.clientService.getDataForTable().toPromise().then((dataList) => {
      this.dataSource = new MatTableDataSource<DataForTable>(dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  openEditClientDialog(id: string): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%',
      data: id,
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.getDataForTable();
    });
  }

  deleteClient(id: string) {
    this.clientService.deleteClientById(id);
    this.getDataForTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
