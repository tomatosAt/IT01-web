import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss']
})
export class UserAddModalComponent {

  @Output() userCreated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  newUser: User = {
    first_name_th: '',
    last_name_th: '',
    birth_date: '',
    addresses: ''
  };

  constructor(private userService: UserService) {}

  submit() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.userCreated.emit();   // บอก parent ว่าสร้างเสร็จแล้ว
        this.reset();
      }
    });
  }

  cancel() {
    this.reset();
    this.close.emit();   // บอก parent ให้ปิด modal
  }

  reset() {
    this.newUser = {
      first_name_th: '',
      last_name_th: '',
      birth_date: '',
      addresses: ''
    };
  }

  get calculateAge(): number | null {
    if (!this.newUser.birth_date) return null;

    const todayYear = new Date().getFullYear();
    const birthYear = new Date(this.newUser.birth_date).getFullYear();

    const age = todayYear - birthYear;
    return age <= 0 ? null : age;
  }
}