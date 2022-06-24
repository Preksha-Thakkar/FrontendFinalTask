import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-invoices' },
  { path: 'create-invoices', component: CreateInvoicesComponent },
  { path: 'invoice-listing', component: InvoiceListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
