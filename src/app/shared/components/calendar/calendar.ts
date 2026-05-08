// import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

interface CalendarEvent {
  title: string;
  time: string;
}

interface DayCell {
  date: Date;
  day: string;
  dateNumber: number;
  isToday: boolean;
  isWeekend: boolean;
  isPast: boolean;
  hasEvent: CalendarEvent | null;
}


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  theme = inject(ThemeService);

  days: DayCell[] = [];
  selectedIndex: number | null = null;
  openTooltipIndex: number | null = null;
  monthLabel: string = '';

  // hardcoded for now - this will come from the API later
  private events: Record<number, CalendarEvent> = {
    2: { title: 'CTF Night', time: '7:00 PM' },
    4: { title: 'Hackathon', time: 'All Day' },
    15: { title: 'Tech Talk', time: '3:00 PM' },
    22: { title: 'Project Deadline', time: '11:59 PM' },
  };

  private daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  private monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit() {
    const today = new Date();
    this.monthLabel = `${this.monthNames[today.getMonth()]} ${today.getFullYear()}`;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());  

    this.days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        date,
        day: this.daysOfWeek[date.getDay()],
        dateNumber: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        isPast: date < today && date.toDateString() !== today.toDateString(),
        isWeekend: date.getDate() === 0 || date.getDay() === 6,
        hasEvent: this.events[i] ?? null
      };
    });

    this.selectedIndex = today.getDay();
  }

  onDayClick(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.days[index].isPast) return; // Don't allow selection of past days
    this.selectedIndex = index;
    this.openTooltipIndex = this.openTooltipIndex === index ? null : index; // Close tooltip when selecting a day
  }

  closeTooltip() { this.openTooltipIndex = null; }
}
