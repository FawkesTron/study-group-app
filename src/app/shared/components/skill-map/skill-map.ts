import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { NgStyle } from "@angular/common";

export interface RoadmapNode {
  label: string;
  status: 'done' | 'current' | 'upcoming';
  icon: string;
}

export interface Roadmap {
  title: string;
  tab: string;
  desc: string;
  salary: string;
  color: string;
  colorRgb: string;
  nodes: RoadmapNode[];
}

@Component({
  selector: 'app-skill-map',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './skill-map.html',
  styleUrl: './skill-map.scss',
})
export class SkillMap {
  theme = inject(ThemeService);
  current = 0;

  roadmaps: Roadmap[] = [
    {
      title: 'Core Foundations',
      tab: 'Core Foundations',
      desc: 'Essential knowledge every IT & cybersecurity professional needs, regardless of specialization.',
      salary: 'Starting Point',
      color: '5eead4',
      colorRgb: '94, 234, 212',
      nodes: [
        { label: 'Networking Basics',  status: 'done',     icon: 'network' },
        { label: 'Linux & CLI',        status: 'done',     icon: 'terminal' },
        { label: 'Security Concepts',  status: 'current',  icon: 'shield' },
        { label: 'Python Scripting',   status: 'upcoming', icon: 'code' },
        { label: 'Cryptography',       status: 'upcoming', icon: 'server' },
        { label: 'Risk & Compliance',  status: 'upcoming', icon: 'file' },
        { label: 'CompTIA Security+',  status: 'upcoming', icon: 'award' },
      ]
    },
    {
      title: 'SOC Analyst',
      tab: 'SOC Analyst',
      desc: 'Monitor, detect, and respond to security threats in a Security Operations Center environment.',
      salary: 'Avg. $75K–$105K',
      color: '#60a5fa',
      colorRgb: '96,165,250',
      nodes: [
        { label: 'Core Foundations',   status: 'done',     icon: 'shield' },
        { label: 'SIEM Tools',         status: 'done',     icon: 'monitor' },
        { label: 'Threat Detection',   status: 'current',  icon: 'search' },
        { label: 'Incident Response',  status: 'upcoming', icon: 'zap' },
        { label: 'Log Analysis',       status: 'upcoming', icon: 'list' },
        { label: 'Threat Intelligence',status: 'upcoming', icon: 'target' },
        { label: 'CySA+ Cert',         status: 'upcoming', icon: 'award' },
      ]
    },
    {
      title: 'Penetration Tester',
      tab: 'Pen Tester',
      desc: 'Ethically hack systems, networks, and applications to identify and report vulnerabilities.',
      salary: 'Avg. $95K–$140K',
      color: '#f87171',
      colorRgb: '248,113,113',
      nodes: [
        { label: 'Core Foundations',      status: 'done',     icon: 'shield' },
        { label: 'Kali Linux',            status: 'done',     icon: 'terminal' },
        { label: 'Web App Hacking',       status: 'current',  icon: 'globe' },
        { label: 'Network Exploitation',  status: 'upcoming', icon: 'target' },
        { label: 'CTF Competitions',      status: 'upcoming', icon: 'flag' },
        { label: 'Reverse Engineering',   status: 'upcoming', icon: 'code' },
        { label: 'OSCP Cert',             status: 'upcoming', icon: 'award' },
      ]
    },
    {
      title: 'Cloud Security Engineer',
      tab: 'Cloud Security',
      desc: 'Secure cloud infrastructure, manage identity systems, and enforce compliance in AWS, Azure, or GCP.',
      salary: 'Avg. $115K–$160K',
      color: '#a78bfa',
      colorRgb: '167,139,250',
      nodes: [
        { label: 'Core Foundations',    status: 'done',     icon: 'shield' },
        { label: 'Cloud Fundamentals',  status: 'done',     icon: 'cloud' },
        { label: 'IAM & Zero Trust',    status: 'current',  icon: 'lock' },
        { label: 'DevSecOps',           status: 'upcoming', icon: 'code' },
        { label: 'Container Security',  status: 'upcoming', icon: 'server' },
        { label: 'Cloud Compliance',    status: 'upcoming', icon: 'file' },
        { label: 'AWS/Azure Cert',      status: 'upcoming', icon: 'award' },
      ]
    }
  ];

  get activeRoadmap(): Roadmap {
    return this.roadmaps[this.current];
  }

  goTo(index: number) {
    this.current = (index + this.roadmaps.length) % this.roadmaps.length;
  }

  prev() { this.goTo(this.current - 1); }
  next() { this.goTo(this.current + 1); }

  cardBg(rm: Roadmap)      { return `rgba(${rm.colorRgb}, 0.06)`; }
  labelBg(rm: Roadmap)     { return `rgba(${rm.colorRgb}, 0.12)`; }
  labelBorder(rm: Roadmap) { return `1px solid rgba(${rm.colorRgb}, 0.25)`; }
  salaryBg(rm: Roadmap)    { return `rgba(${rm.colorRgb}, 0.15)`; }

  nodeCircleStyle(node: RoadmapNode, rm: Roadmap): Record<string, string> {
    if (node.status === 'done') {
      return {
        borderColor: `rgba(${rm.colorRgb}, 0.5)`,
        background:  `rgba(${rm.colorRgb}, 0.12)`
      };
    }
    if (node.status === 'current') {
      return {
        background:  rm.color,
        borderColor: rm.color,
        boxShadow: `0 0 0 4px rgba(${rm.colorRgb}, 0.2)`
      };
    }
    return { opacity: '0.4' };
  }

  nodeIconColor(node: RoadmapNode, rm: Roadmap): string {
    if (node.status === 'current') return '#0f1a2e';
    if (node.status === 'done')    return rm.color;
    return `rgba(255, 255, 255, 0.5)`;
  }

  nodeLabelColor(node: RoadmapNode, rm: Roadmap): string {
    if (node.status === 'current') return rm.color;
    if (node.status === 'done')    return `rgba(255, 255, 255, 0.75)`;
    return '';
  }

  nodePillStyle(node: RoadmapNode, rm: Roadmap): Record<string, string> {
    if (node.status === 'done') return { background: `rgba(${rm.colorRgb}, 0.12)`, color: rm.color };
    if (node.status === 'current') return { background: `rgba(${rm.colorRgb}, 0.18)`, color: rm.color };
    return {};
  }

  nodePillText(node: RoadmapNode): string {
    if (node.status === 'done') return 'Completed';
    if (node.status === 'current') return 'In Progress';
    return 'Upcoming';
  }

  connectorStyle(node: RoadmapNode, rm: Roadmap): Record<string, string> {
    if (node.status === 'done') {
      return { background: `linear-gradient(90deg, ${rm.color}, rgba(${rm.colorRgb}, 0.3))` };
    }
    return { background: `rgba{255, 255, 255, 0.08}` };
  }
}
