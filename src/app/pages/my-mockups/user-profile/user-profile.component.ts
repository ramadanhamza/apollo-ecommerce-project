import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { CheckboxModule } from 'primeng/checkbox';
import { TaskListComponent } from '@/apps/tasklist/task-list';
import { Subscription } from 'rxjs';
import { Task } from '@/types/task';
import { TaskService } from '@/apps/tasklist/service/task.service';
import { CreateTaskComponent } from '@/apps/tasklist/create-task';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, KnobModule, FormsModule,AvatarModule,
    ButtonModule,
    FormsModule,
    CardModule,
    TabViewModule,
    CheckboxModule,
    TagModule,
    TimelineModule, TaskListComponent, CreateTaskComponent, TableModule],
  template: `
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 xl:col-span-4">
      <div class="card">
      <!-- Client Avatar and Name -->
       <div class="flex justify-center">
            <img src="/demo/images/avatar/square/avatar-m-1.jpg" class="w-72 rounded-md">
       </div>
          
          <div class="mt-3 text-center">
              <span class="text-2xl font-bold">Dianne Russell</span>
              <p class="text-gray-500">d.russell&#64;gmail.com</p>
          </div>

      <!-- Client Details Section -->
      <div class="mt-5">
          <div class="flex items-center mb-3">
              <span class="font-semibold">Client details</span>
              <p-button icon="pi pi-pencil" styleClass="p-button-text p-button-rounded"></p-button>
          </div>
          <ul class="list-none p-0 m-0">
              <li class="flex justify-between py-2 border-bottom-1 surface-border">
                  <span class="text-600">Phone number</span>
                  <span class="font-medium">(229) 555-0108</span>
              </li>
              <li class="flex justify-between py-2 border-bottom-1 surface-border">
                  <span class="text-600">Date of birth</span>
                  <span class="font-medium">12/03/1987</span>
              </li>
              <li class="flex justify-between py-2 border-bottom-1 surface-border">
                  <span class="text-600">Home address</span>
                  <span class="font-medium">6391 Elgin St.</span>
              </li>
              <li class="flex justify-between py-2">
                  <span class="text-600">Insurance</span>
                  <span class="font-medium">Yes</span>
              </li>
          </ul>
      </div>

      <!-- Tags Section -->
      <div class="mt-5">
          <div class="flex items-center mb-3">
              <span class="font-semibold">Tags</span>
              <p-button icon="pi pi-pencil" styleClass="p-button-text p-button-rounded"></p-button>
          </div>
          <div class="flex gap-2 mt-3">
              <p-tag value="Personal"></p-tag>
              <p-tag severity="success" value="Company client"></p-tag>
          </div>
      </div>

      <!-- Notes Section -->
      <div class="mt-5">
          <div class="flex items-center mb-3">
              <span class="font-semibold">Notes</span>
              <p-button icon="pi pi-pencil" styleClass="p-button-text p-button-rounded"></p-button>
          </div>
          <div class="mt-3 bg-blue-50 border-round p-3">
              <p class="text-700 m-0">Client may provide additional documents as test results, MRI, x-ray results. Please, attach them to the client’s profile.</p>
              <span class="text-sm text-600 mt-2 block">Leslie Alexander - 15 Apr, 2022</span>
          </div>
      </div>
    </div>
  </div>

  <div class="col-span-12 xl:col-span-8">
      <p-tabView>
            <p-tabPanel header="Overview">
                <div class="grid gap-y-4">
                    <!-- Latest Tasks -->
                    <div class="col-12">
                        <div class="card">
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-lg font-semibold">Latest tasks</span>
                                <a class="text-primary hover:underline">Show all</a>
                            </div>
                            <ul class="list-none p-0 m-0">
                                <li class="flex justify-between items-center p-3 mb-2 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Contact client for outstanding invoices</span>
                                    </div>
                                    <p-tag severity="danger" value="Mon, 16 Aug"></p-tag>
                                </li>
                                <li class="flex justify-between items-center p-3 mb-2 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Share consultation forms</span>
                                    </div>
                                    <p-tag severity="info" value="Tue, 25 Aug"></p-tag>
                                </li>
                                <li class="flex justify-between items-center p-3 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Schedule next personal consultation</span>
                                    </div>
                                    <p-tag severity="success" value="Wed, 26 Aug"></p-tag>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Pinned Documents -->
                    <div class="col-12">
                        <div class="card">
                            <span class="text-lg font-semibold">Pinned documents & files</span>
                            <div class="grid grid-cols-12 mt-4 gap-x-8">
                                <div class="col-span-12 xl:col-span-4">
                                    <div class="p-3 border-1 border-gray-200 border-round flex align-items-center bg-blue-50 rounded-xl h-32 flex-col justify-between">
                                        <div class="ml-1 space-x-2">
                                            <i class="pi pi-file-pdf text-3xl text-blue-500"></i>
                                            <span class="font-semibold">Client intake form</span>
                                        </div>
                                        <p class="ml-1 text-sm text-gray-500 m-0">Submitted on 15 Apr, 2022</p>
                                    </div>
                                </div>
                                <div class="col-span-12 xl:col-span-4">
                                    <div class="p-3 border-1 border-gray-200 border-round flex align-items-center bg-green-50 rounded-xl h-32 flex-col justify-between">
                                        <div class="ml-1 space-x-2">
                                            <i class="pi pi-file-word text-3xl text-green-500"></i>
                                            <span class="font-semibold">Treatment plan</span>
                                        </div>
                                        <p class="ml-1 text-sm text-gray-500 m-0">Submitted on 18 Apr, 2022</p>
                                    </div>
                                </div>
                                <div class="col-span-12 xl:col-span-4">
                                    <div class="p-3 border-1 border-gray-200 border-round flex align-items-center bg-yellow-50 rounded-xl h-32 flex-col justify-between">
                                        <div class="ml-1 space-x-2">
                                            <i class="pi pi-file-word text-3xl text-yellow-500"></i>
                                            <span class="font-semibold">Insurance certificate</span>
                                        </div>
                                        <p class="ml-1 text-sm text-gray-500 m-0">Uploaded on 24 Apr, 2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Latest Activity -->
                    <div class="col-12">
                        <div class="card">
                            <span class="text-lg font-semibold">Latest activity</span>
                            <p-timeline [value]="events" align="right" styleClass="mt-4">
                                <ng-template pTemplate="content" let-event>
                                    {{ event.status }}
                                </ng-template>
                                <ng-template pTemplate="opposite" let-event>
                                    <small class="p-text-secondary">{{ event.date }}</small>
                                </ng-template>
                            </p-timeline>
                        </div>
                    </div>
                </div>
            </p-tabPanel>
            <p-tabPanel header="Tasks">


<!-- 

            <div class="col-12">
                        <div class="card">
                            <div class="flex justify-between align-items-center mb-4">
                                <span class="text-lg font-semibold">Latest tasks</span>
                                <a class="text-primary hover:underline">Show all</a>
                            </div>
                            <ul class="list-none p-0 m-0">
                                <li class="flex justify-between align-items-center p-3 mb-2 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Contact client for outstanding invoices</span>
                                    </div>
                                    <p-tag severity="danger" value="Mon, 16 Aug"></p-tag>
                                </li>
                                <li class="flex justify-between align-items-center p-3 mb-2 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Share consultation forms</span>
                                    </div>
                                    <p-tag severity="info" value="Tue, 25 Aug"></p-tag>
                                </li>
                                <li class="flex justify-between align-items-center p-3 bg-gray-50 border-round">
                                    <div class="flex gap-4">
                                        <p-checkbox [binary]="true"></p-checkbox>
                                        <span>Schedule next personal consultation</span>
                                    </div>
                                    <p-tag severity="success" value="Wed, 26 Aug"></p-tag>
                                </li>
                            </ul>
                        </div>
                    </div> -->

                <div class="col-12">
                    <div class="card">
                        <div class="flex justify-between items-center mb-8">
                            <span class="text-surface-900 dark:text-surface-0 text-xl font-semibold">Task List</span>
                            <button pButton pRipple class="font-semibold" outlined icon="pi pi-plus" label="Create Task" (click)="showDialog()"></button>
                        </div>
                        <app-task-list [taskList]="todo" title="Remaining tasks"></app-task-list>
                        <app-task-list [taskList]="completed" title="Completed"></app-task-list>
                    </div>
                </div>
                <app-create-task></app-create-task>
            </p-tabPanel>
            <p-tabPanel header="Appointments">
    <div class="card">
        <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-semibold">Upcoming Appointments</span>
            <p-button label="Book New" outlined icon="pi pi-plus"></p-button>
        </div>

        <p-table [value]="appointments" [rows]="5" [paginator]="true" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="date">Date <p-sortIcon field="date"></p-sortIcon></th>
                    <th>Time</th>
                    <th>Service</th>
                    <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                    <th>Actions</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-appt>
                <tr>
                    <td>{{ appt.date }}</td>
                    <td>{{ appt.time }}</td>
                    <td>{{ appt.service }}</td>
                    <td>
                        <p-tag [value]="appt.status"></p-tag>
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" styleClass="p-button-text p-button-rounded"></p-button>
                        <p-button icon="pi pi-trash" styleClass="p-button-text p-button-rounded p-button-danger"></p-button>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="5">No appointments found.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</p-tabPanel>


<!-- ========================================= -->
<!-- === NEW CODE FOR THE BILLING TAB === -->
<!-- ========================================= -->
<p-tabPanel header="Billing">
    <div class="card">
        <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-semibold">Invoices</span>
            <p-button label="Create Invoice" outlined icon="pi pi-plus"></p-button>
        </div>

        <p-table [value]="invoices" [rows]="5" [paginator]="true" responsiveLayout="scroll">
            <ng-template pTemplate="header">
                <tr>
                    <th>Invoice #</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th pSortableColumn="total">Total <p-sortIcon field="total"></p-sortIcon></th>
                    <th pSortableColumn="status">Status <p-sortIcon field="status"></p-sortIcon></th>
                    <th>Actions</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-invoice>
                <tr>
                    <td>#{{ invoice.invoiceId }}</td>
                    <td>{{ invoice.issueDate }}</td>
                    <td>{{ invoice.dueDate }}</td>
                    <td>{{ invoice.total | currency:'USD' }}</td>
                    <td>
                        <p-tag [value]="invoice.status"></p-tag>
                    </td>
                    <td>
                        <p-button icon="pi pi-download" styleClass="p-button-text p-button-rounded"></p-button>
                        <p-button icon="pi pi-eye" styleClass="p-button-text p-button-rounded"></p-button>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="6">No invoices found.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
</p-tabPanel>
        </p-tabView>
    </div>
  `,
  providers: [TaskService],
  host: {
        '[style.display]': '"contents"'
  }
})
export class UserProfileComponent {
  events: any[] = [];
  appointments: any[] = [];
  invoices: any[] = [];

  subscription: Subscription;

    ngOnInit() {
        this.events = [
            { status: 'Leslie Alexander added new file Primary questionnaire', date: '1 day ago' },
            { status: 'Devon Lane updated personal client information', date: '3 days ago' },
            { status: 'Marvin McKinney requested an appointment for Personal consultation service', date: '3 days ago' }
        ];
        this.appointments = [
            { date: '2024-09-15', time: '10:00 AM', service: 'Initial Consultation', status: 'Completed' },
            { date: '2024-10-22', time: '02:30 PM', service: 'Follow-up Session', status: 'Completed' },
            { date: '2024-11-18', time: '11:00 AM', service: 'X-Ray Review', status: 'Upcoming' },
            { date: '2024-12-05', time: '09:00 AM', service: 'Treatment Plan Discussion', status: 'Upcoming' }
        ];

        // --- MOCK DATA FOR INVOICES TABLE ---
        this.invoices = [
            { invoiceId: 'INV-0012', issueDate: '2024-09-15', dueDate: '2024-09-30', total: 250.00, status: 'Paid' },
            { invoiceId: 'INV-0018', issueDate: '2024-10-22', dueDate: '2024-11-06', total: 150.00, status: 'Paid' },
            { invoiceId: 'INV-0025', issueDate: '2024-11-01', dueDate: '2024-11-15', total: 450.00, status: 'Pending' },
            { invoiceId: 'INV-0009', issueDate: '2024-08-10', dueDate: '2024-08-25', total: 75.00, status: 'Overdue' }
        ];
    }

    todo: Task[] = [];

    completed: Task[] = [];

    constructor(private taskService: TaskService) {
        this.subscription = this.taskService.taskSource$.subscribe((data) => this.categorize(data));
    }

    categorize(tasks: Task[]) {
        this.todo = tasks.filter((t) => t.completed !== true);
        this.completed = tasks.filter((t) => t.completed);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showDialog() {
        this.taskService.showDialog('Create Task', true);
    }

    getAppointmentStatusSeverity(status: string): string {
        switch (status) {
            case 'Completed': return 'success';
            case 'Upcoming': return 'info';
            case 'Cancelled': return 'danger';
            default: return 'secondary';
        }
    }

    // --- HELPER FUNCTION FOR INVOICE STATUS COLORS ---
    getInvoiceStatusSeverity(status: string): string {
        switch (status) {
            case 'Paid': return 'success';
            case 'Pending': return 'warning';
            case 'Overdue': return 'danger';
            default: return 'secondary';
        }
    }
}
