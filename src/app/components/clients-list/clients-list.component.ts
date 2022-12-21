import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {ClientController} from '../../../controller/client.controller';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {RowClient} from '../../model/row-client';
import {PageModel} from '../../model/filter/filter-details/page';
import {FilterModel} from '../../model/filter/filter';
import {SortModel} from '../../model/filter/filter-details/sort';
import {saveAs} from 'file-saver';
import {CharmController} from '../../../controller/charm.controller';
import {ReportController} from '../../../controller/report.controller';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'charm', 'age', 'totalAccountBalance', 'maximumBalance', 'minimumBalance', 'options'];
  dataSource!: MatTableDataSource<RowClient>;
  totalElements = 0;
  filter = new FilterModel('', new PageModel(5, 0), new SortModel('', ''));
  reportType = 'xlsx';

  constructor(private clientController: ClientController,
              private charmController: CharmController,
              private reportController: ReportController,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getDataForTable();
    this.getCountOfRows();
  }

  getCountOfRows() {
    this.clientController.getCountOfRows(this.filter.searchValue).toPromise().then((count) => {
      this.totalElements = count;
    });
  }

  getDataForTable() {
    this.clientController.getDataForTable(this.filter).toPromise().then((dataList) => {
      this.dataSource = new MatTableDataSource<RowClient>(dataList);
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.totalElements++;
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
    this.clientController.deleteClientById(id).toPromise().then(result => {
      this.totalElements--;
      this.getDataForTable();
    });
  }

  search(event: Event) {
    this.filter.searchValue = (event.target as HTMLInputElement).value;
    this.getCountOfRows();
    this.getDataForTable();
  }

  nextPage(event: PageEvent) {
    this.filter.pageModel.pageIndex = event.pageIndex;
    this.filter.pageModel.pageSize = event.pageSize;
    this.getDataForTable();
  }

  sortColumn(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.filter.sortModel.direction = '';
      this.filter.sortModel.columnName = '';
      this.getDataForTable();
    } else {
      this.filter.sortModel.direction = sort.direction;
      this.filter.sortModel.columnName = sort.active;
      this.getDataForTable();
    }
  }

  generateReport() {
    const date = new Date();
    const fileName = 'report_' + date;
    this.reportController.generateReport(this.filter, this.reportType).toPromise().then(blob => {
      saveAs(blob, fileName);
      this.getDataForTable();
    });
  }
}
