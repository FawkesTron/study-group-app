import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-posting',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './posting.html',
  styleUrl: './posting.scss',
})
export class Posting {
  private fb     = inject(FormBuilder);
  private events = inject(EventService);
  private router = inject(Router);

  loading = false;
  error = '';

  form: FormGroup = this.fb.group({
    title:       ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    subject:     ['', Validators.required],
    location:    ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.events.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = err.error?.error ?? 'Failed to create posting. Please try again.';
        this.loading = false;
      }
    });
  }

  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get subject() { return this.form.get('subject'); }
  get location() { return this.form.get('location'); }
  get meetingTime() { return this.form.get('meetingTime'); }
}
