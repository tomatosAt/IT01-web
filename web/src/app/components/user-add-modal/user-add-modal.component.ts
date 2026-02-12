import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

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

  submit(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.userCreated.emit();   // บอก feature แม่ ว่าสร้างเสร็จแล้ว
        this.reset();
      },
      error: (err) => {
        const errMsg = this.extractErrorMessage(err);
        const message = this.mapValidationMessage(errMsg) ?? 'ไม่สามารถสร้างผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง';
        this.showError(message);
      }
    });
  }

  private extractErrorMessage(err: any): string | null {
    if (err.error?.message) return err.error.message;
    if (err.message) return err.message;
    return null;
  }

  private mapValidationMessage(errMsg: string | null): string | null {
    if (!errMsg) return null;
    const text = errMsg.toLowerCase();

    if (text.includes('invalid date') || text.includes('invalid date format')) {
      return 'รูปแบบวันที่ไม่ถูกต้อง กรุณาระบุวันเกิดเป็นรูปแบบที่ถูกต้อง';
    }

    if (text.includes('birth year cannot be in the future') || text.includes('birth year in the future')) {
      return 'ปีเกิดไม่สามารถเป็นปีในอนาคตได้ กรุณาตรวจสอบอีกครั้ง';
    }

    return errMsg;
  }

  private showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: message,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#0275d8'
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