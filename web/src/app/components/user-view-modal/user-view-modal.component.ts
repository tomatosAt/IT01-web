import { Component, Input, OnChanges ,EventEmitter,Output,SimpleChanges} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-view-modal',
  templateUrl: './user-view-modal.component.html',
  styleUrls: ['./user-view-modal.component.scss']
})

export class UserViewModalComponent implements OnChanges {

  @Input() userId?: number;
  @Output() close = new EventEmitter<void>();

  userByID?: User;

  constructor(private userService: UserService) {}
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId'] && this.userId) {
    this.userService.getUserById(this.userId).subscribe({
        next: (res: any) => {
          this.userByID = res.data;
        }
      });
  }
}

  cancel() {
    this.close.emit();
  }
}

