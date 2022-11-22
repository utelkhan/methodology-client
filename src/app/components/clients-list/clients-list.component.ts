import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddClientComponent} from '../add-client/add-client.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {
  constructor(private dialog: MatDialog) {}
  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
