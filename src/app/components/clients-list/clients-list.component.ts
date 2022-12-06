import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {ClientService} from '../../../services/client/client.service';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {RowClient} from '../../model/mymodels/row-client';
import {PageModel} from '../../model/mymodels/filter/filter-details/page';
import {FilterModel} from '../../model/mymodels/filter/filter';
import {SortModel} from '../../model/mymodels/filter/filter-details/sort';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'charm', 'age', 'totalAccountBalance', 'maximumBalance', 'minimumBalance', 'options'];
  dataSource!: MatTableDataSource<RowClient>;
  totalElements = 0;
  filter = new FilterModel('', new PageModel(5, 0), new SortModel('desc', 'id'));

  constructor(private clientService: ClientService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getDataForTable();
    this.getCountOfRows();
  }

  getCountOfRows() {
    this.clientService.getCountOfRows().toPromise().then((count) => {
      this.totalElements = count;
    });
  }

  getDataForTable() {
    this.clientService.getDataForTable(this.filter).toPromise().then((dataList) => {
      console.log(dataList);
      this.dataSource = new MatTableDataSource<RowClient>(dataList);
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
    this.getCountOfRows();
    this.getDataForTable();
  }

  search(event: Event) {
    this.filter.searchValue = (event.target as HTMLInputElement).value;
    this.getCountOfRows();
    this.getDataForTable();
  }

  nextPage(event: PageEvent) {
    this.filter.pageModel.pageIndex = event.pageIndex;
    this.filter.pageModel.pageSize = event.pageSize;
    this.getCountOfRows();
    this.getDataForTable();
  }

  sortColumn(sort: Sort) {
    console.log(sort.active + ' ' + sort.direction);
    if (!sort.active || sort.direction === '') {
      this.filter.sortModel.direction = 'desc';
      this.filter.sortModel.columnName = 'id';
      console.log('hello from true if in sortColumn');
      this.getCountOfRows();
      this.getDataForTable();
    } else {
      this.filter.sortModel.direction = sort.direction;
      this.filter.sortModel.columnName = sort.active;
      console.log('hello from false if in sortColumn');
      this.getCountOfRows();
      this.getDataForTable();
    }
  }
}
