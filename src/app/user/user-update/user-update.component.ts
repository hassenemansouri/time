import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, User, Role } from '../user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class UserUpdateComponent implements OnInit {
  userForm: FormGroup;
  user: User | null = null;
  isLoading = true;
  error: string | null = null;
  roles = Object.values(Role);
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      workspaceId: [''],
      collaborationId: [''],
      goalId: [''],
      projectId: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.user = user;
          this.userForm.patchValue(user);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load user details';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'No user ID provided';
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid || !this.user) return;

    this.isLoading = true;
    this.userService.updateUser(this.user.id, this.userForm.value)
    .pipe(
      catchError(err => {
        this.error = 'Failed to update user';
        this.isLoading = false;
        console.error(err);
        return of(null);
      })
    )
    .subscribe(updatedUser => {
      if (updatedUser) {
        this.router.navigate(['/users', updatedUser.id]);
      }
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  uploadPhoto(): void {
    if (!this.selectedFile || !this.user) return;

    this.isLoading = true;
    this.userService.uploadUserPhoto(this.user.id, this.selectedFile).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to upload photo';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deletePhoto(): void {
    if (!this.user) return;

    this.isLoading = true;
    this.userService.deleteUserPhoto(this.user.id).subscribe({
      next: () => {
        if (this.user) {
          this.user.photoBase64 = undefined;
          this.user.photoContentType = undefined;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete photo';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getPhotoUrl(): string | null {
    if (!this.user?.photoBase64 || !this.user.photoContentType) return null;
    return `data:${this.user.photoContentType};base64,${this.user.photoBase64}`;
  }
}
