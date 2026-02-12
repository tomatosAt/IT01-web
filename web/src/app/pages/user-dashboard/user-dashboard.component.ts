import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  users: any[] = [];
  newUser: any = {
  first_name_th: '',
  last_name_th: '',
  birth_date: '',
  addresses: ''
  };
  userByID : any = {
  first_name_th: '',
  last_name_th: '',
  birth_date: '',
  addresses: '',
  age: ''
  };
  currentPage: number = 1;
  pageSize: number = 10;
  total: number = 0;

  isAddModalOpen = false;
  isViewModalOpen = false;
  private loaded = false;
  selectedUserId?: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
   if (!this.loaded) {
    this.loaded = true;
    this.loadUsers();
  }
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data.all_users;
        this.total = res.data.total;
      },
      error: (err) => {
      console.error("Error =", err);
    }
    });
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  openViewModal(id: number) {
    this.selectedUserId = id;
    this.isViewModalOpen = true;
  }

  onUserCreated() {
    this.loadUsers();
    this.isAddModalOpen = false;
  }

  closeModal() {
    this.isAddModalOpen = false;
    this.isViewModalOpen = false;
  }
  cancleAddModal() {
  this.isAddModalOpen = false;
  this.resetNewUser(); 
  }
  resetNewUser() {
  this.newUser = {
    first_name_th: '',
    last_name_th: '',
    birth_date: '',
    addresses: ''
   };
  }


  formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
  }
}
