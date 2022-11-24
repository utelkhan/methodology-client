import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';
import {Client} from '../../model/mymodels/client';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Full Name', 'Charm', 'Age', 'Total account balance', 'Maximum balance', 'Minimum balance', 'Options'];
  dataSource!: Client[];
  constructor(private clientService: ClientService, private dialog: MatDialog) {}
  ngOnInit() {
    this.clientService.getClients().subscribe((clientList) => {
      this.dataSource = clientList;
    });
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public calculateAge(birthDate: Date) {

    return Math.floor( (   Math.abs(Date.now() - new Date(birthDate).getTime()) ) / (1000 * 3600 * 24) / 365.25      );

      // //Used Math.floor instead of Math.ceil
      // //so 26 years and 140 days would be considered as 26, not 27.
      // this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

}

// export class ClientsListComponent implements OnInit, AfterViewInit {
//   displayedColumns: string[] = ['fullName', 'charm', 'age', 'grandTotalOfBalance', 'maximumBalance', 'minimumBalance', 'options'];
//   clients!: MatTableDataSource<Client>;
//   today: Date;
//   @ViewChild(MatSort) sort: MatSort;
//
//   constructor(private liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private clientService: ClientService) {}
//
//   ngOnInit(): void {
//     this.today = new Date();
//     this.getClients();
//   }
//   ngAfterViewInit() {
//     const dataSourceClients = new MatTableDataSource(this.clients);
//     dataSourceClients.sort = this.sort;
//     this.clients = dataSourceClients.data;
//   }
//   announceSortChange(sortState: Sort) {
//     if (sortState.direction) {
//       this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this.liveAnnouncer.announce('Sorting cleared');
//     }
//   }
//
//   getClients() {
//     this.clientService.getClients().subscribe((clientsList) => {
//       this.clients = new MatTableDataSource(clientsList);
//     });
//   }
//
//   openAddClientDialog(): void {
//     const dialogRef = this.dialog.open(AddClientComponent, {
//       width: '50%'
//     });
//     dialogRef.afterClosed().subscribe((type) => {
//       if (type === 'add') {
//         this.getClients();
//       }
//     });
//   }
//
//   openEditClientDialog(client: Client): void {
//     const dialogRef = this.dialog.open(AddClientComponent, {
//       width: '50%',
//       data: client
//     });
//     dialogRef.afterClosed().subscribe((type) => {
//       if (type === 'update') {
//         this.getClients();
//       }
//     });
//   }
//   deleteClient(id: number) {
//     this.clientService.deleteClient(id);
//     this.getClients();
//   }
// }
