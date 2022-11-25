import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {Client} from '../../model/mymodels/client';
import {ClientService} from '../../../services/client/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgModel} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {element} from 'protractor';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'charm', 'birth_date', 'total_account_balance', 'maximum_balance', 'minimum_balance', 'Options'];
  dataSource!: MatTableDataSource<Client>;
  // todo: Тут должен быть определенная типизация. Нельзя ставить any
  clientData!: Client[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sub!: Subscription;

  constructor(private clientService: ClientService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAllClients() {
    // todo: Этот метод возвращает тебе список Client,
    //  в котором лежат телефоны, адреса, и другие лишние данные, которые не используется в таблице
    //  Будет лучше создать новый модель для таблицы отдельно, где будет поля, которые в таблице(fullName, age, charmName, balance и тд)
    //  Сервис как раз таки будет возвращать список с новыми модельками
    this.sub = this.clientService.getClients().subscribe((clientList) => {
      this.clientData = clientList;
      this.dataSource = new MatTableDataSource<Client>(this.clientData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.dataSource.paginator = this.paginator;
      console.log('The add client dialog was closed');
    });
  }

  // todo: параметор client должен быть типизирован
  openEditClientDialog(client: any): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%',
      data: client,
    });

    dialogRef.afterClosed().toPromise().then(result => {
      this.dataSource.paginator = this.paginator;
      console.log('The edit client dialog was closed');
    });
  }

  removeClient(id: number) {
    this.clientService.removeClientById(id).toPromise().then((clientList) => {
      this.dataSource.data = clientList;
    });
  }

  calculateAge(birthDate: Date) {

    return Math.floor((Math.abs(Date.now() - new Date(birthDate).getTime())) / (1000 * 3600 * 24) / 365.25);

    // //Used Math.floor instead of Math.ceil
    // //so 26 years and 140 days would be considered as 26, not 27.
    // this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

}
