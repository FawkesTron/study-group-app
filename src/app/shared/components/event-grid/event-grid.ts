import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';

export interface MeetupEvent {
  id: number;
  title: string;
  dateTime: string;
  location: string;
  memberCount: number;
  imageUrl: string;
  type: 'in-person' | 'virtual';
  isJoined: boolean;
}

@Component({
  selector: 'app-event-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-grid.html',
  styleUrl: './event-grid.scss',
})
export class EventGrid implements OnInit {
  theme = inject(ThemeService);

  inPersonEvents: MeetupEvent[] = [];
  virtualEvents: MeetupEvent[] = [];

  // hardcoded events for demonstration
  private allEvents: MeetupEvent[] = [
    { id: 1, title: 'CTF Night', dateTime: 'Fri, Apr 4 · 7:00 PM', location: 'Room 204, Tech Building', memberCount: 8, imageUrl: 'assets/images/event1.jpg', type: 'in-person', isJoined: false },
    { id: 2, title: 'OWASP Top 10 Workshop', dateTime: 'Tue, Apr 8 · 6:30 PM', location: 'Main Library, Floor 3', memberCount: 14, imageUrl: 'assets/images/event2.jpg', type: 'in-person', isJoined: false },
    { id: 3, title: 'Networking Fundamentals', dateTime: 'Sat, Apr 12 · 2:00 PM', location: 'Innovation Hub', memberCount: 6, imageUrl: 'assets/images/event3.jpg', type: 'in-person', isJoined: false },
    { id: 4, title: 'Intro to Penetration Testing', dateTime: 'Wed, Apr 9 · 5:00 PM', location: 'Zoom · Link in email', memberCount: 22, imageUrl: 'assets/images/event4.jpg', type: 'virtual', isJoined: false },
    { id: 5, title: 'Cloud Security Basics', dateTime: 'Thu, Apr 10 · 7:30 PM', location: 'Google Meet', memberCount: 11, imageUrl: 'assets/images/event5.jpg', type: 'virtual', isJoined: false },
    { id: 6, title: 'Reverse Engineering 101', dateTime: 'Mon, Apr 14 · 6:00 PM', location: 'Discord Stage', memberCount: 17, imageUrl: 'assets/images/event6.jpg', type: 'virtual', isJoined: false },
  ];

  ngOnInit() {
    this.inPersonEvents = this.allEvents.filter(event => event.type === 'in-person');
    this.virtualEvents = this.allEvents.filter(event => event.type === 'virtual');
  }

  toggleJoin(event: MeetupEvent) {
    event.isJoined = !event.isJoined;
    event.memberCount += event.isJoined ? 1 : -1;
  }
}
