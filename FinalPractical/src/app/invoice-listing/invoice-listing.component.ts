import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent implements OnInit {

  tabs: any[] = []
  checked = false;
  indeterminate = false;
  listOfCurrentPageData:any[] = []
  setOfCheckedId = new Set<number>();
  constructor() { }

  ngOnInit(): void {
    this.tabs = [
      {
        name: 'All',
        data: [
          {id:1, number: 1, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:2, number: 2, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:3, number: 3, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:4, number: 4, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
        ]
      },
      {
        name: 'Draft',
        data: [
          {id:1, number: 5, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:2, number: 6, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:3, number: 7, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:4, number: 8, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
        ]
      },
      {
        name: 'Awaiting Payment',
        data: [
          {id:1, number: 9, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:2, number: 10, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:3, number: 11, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:4, number: 12, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
        ]
      },
      {
        name: 'Paid',
        data: [
          {id:1, number: 13, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:2, number: 14, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:3, number: 15, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
          {id:4, number: 16, ref: 1, to: 'jeshal@kalena.com', date: '9 jun 2022', dueDate: '', due: 12},
        ]
      }
    ]
  }
  //for check checkboxes, multi select
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  

}
