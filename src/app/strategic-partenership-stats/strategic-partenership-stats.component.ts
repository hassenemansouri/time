import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import {PartnershipService} from '../strategicparternship/strategicparternship.service';

@Component({
  selector: 'app-strategic-partenership-stats',
  templateUrl: './strategic-partenership-stats.component.html',
  styleUrl: './strategic-partenership-stats.component.scss',
  standalone: true,
  imports: []
})
export class StrategicPartenershipStatsComponent {

  stats: any;

  constructor(private partnershipService : PartnershipService) {}

  ngOnInit(): void {
    this.partnershipService.getDashboardStats().subscribe((data) => {
      this.stats = data;
      this.initCharts();
    });
  }

  initCharts() {
    this.createBarChart(
      'partnershipsPerMonthChart',
      'Partenariats par Mois',
      Object.keys(this.stats.PartnertshipsPerMonth || {}),
      Object.values(this.stats.PartnertshipsPerMonth || {})
    );

    this.createLineChart(
      'participantsPerMonthChart',
      'Participants par Mois',
      Object.keys(this.stats.NBParticipantsPerMonth || {}),
      Object.values(this.stats.NBParticipantsPerMonth || {})
    );

    this.createPieChart(
      'participantsBySizeChart',
      'Répartition des Participants par Taille',
      Object.keys(this.stats.ParticipantsBySize || {}),
      Object.values(this.stats.ParticipantsBySize || {})
    );
  }


  createBarChart(id: string, label: string, labels: string[], data: any[]) {
    new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: '#42A5F5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createLineChart(id: string, label: string, labels: string[], data: any[]) {
    new Chart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: '#66BB6A',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createPieChart(id: string, label: string, labels: string[], data: any[]) {
    new Chart(id, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: ['#FFA726', '#AB47BC', '#29B6F6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
