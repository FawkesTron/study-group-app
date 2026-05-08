import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Calendar } from "../../shared/components/calendar/calendar";
import { EventGrid } from "../../shared/components/event-grid/event-grid";
import { SkillMap } from "../../shared/components/skill-map/skill-map";
import { Footer } from "../../shared/components/footer/footer";
import { ThreatFeed } from "../../shared/components/threat-feed/threat-feed";
import { ResourceLibrary } from "../../shared/components/resource-library/resource-library";

@Component({
  selector: 'app-home',
  imports: [Header, Calendar, EventGrid, SkillMap, Footer, ThreatFeed, ResourceLibrary],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
