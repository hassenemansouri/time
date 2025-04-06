import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { GoalService } from './goal.service';
import { Goal } from './goal.model';
import { Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf,DatePipe  } from '@angular/common';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css'],
  standalone: true,
  imports: [NgForOf, RouterLink, NgIf, FormsModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListGoalsComponent implements OnInit {
  goals: Goal[] = [];
  searchText = '';
  showAnimation = true;

  constructor(private goalService: GoalService, private router: Router) {}

  ngOnInit(): void {
    this.loadGoals();
    setTimeout(() => this.showAnimation = false, 6000);
  }

  loadGoals(): void {
    this.goalService.getAllGoals().subscribe(data => {
      this.goals = data;
    });
  }

  deleteGoal(id: string | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer ce goal ?')) {
      this.goalService.deleteGoal(id).subscribe(() => {
        this.goals = this.goals.filter(g => g.goal_id !== id);
      });
    }
  }

  filteredGoals(): Goal[] {
    if (!this.searchText) return this.goals;
    return this.goals.filter(goal =>
        goal.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        goal.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Liste des Goals - TimeForge', 14, 15);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(14);
    doc.text('Aperçu des objectifs créés', 14, 25);

    const columns = ['Titre', 'Description', 'Début', 'Fin'];
    const data = this.filteredGoals().map(g => [
      g.title,
      g.description,
      g.startDate ? new Date(g.startDate).toLocaleDateString() : '',
      g.endDate ? new Date(g.endDate).toLocaleDateString() : ''
    ]);

    const startY = 35;
    const columnWidth = [50, 60, 40, 40];
    const rowHeight = 8;
    const pageHeight = 280;
    let y = startY;
    let rowIndex = 0;

    doc.setFontSize(10);
    doc.setTextColor(255);
    doc.setFillColor(0, 123, 255);
    doc.rect(10, y, columnWidth[0], rowHeight, 'F');
    doc.rect(10 + columnWidth[0], y, columnWidth[1], rowHeight, 'F');
    doc.rect(10 + columnWidth[0] + columnWidth[1], y, columnWidth[2], rowHeight, 'F');
    doc.rect(10 + columnWidth[0] + columnWidth[1] + columnWidth[2], y, columnWidth[3], rowHeight, 'F');

    doc.text(columns[0], 12, y + 6);
    doc.text(columns[1], 12 + columnWidth[0], y + 6);
    doc.text(columns[2], 12 + columnWidth[0] + columnWidth[1], y + 6);
    doc.text(columns[3], 12 + columnWidth[0] + columnWidth[1] + columnWidth[2], y + 6);
    y += rowHeight;

    data.forEach(row => {
      doc.setFillColor(rowIndex % 2 === 0 ? 245 : 240, 245, 245);
      doc.rect(10, y, columnWidth[0], rowHeight, 'F');
      doc.rect(10 + columnWidth[0], y, columnWidth[1], rowHeight, 'F');
      doc.rect(10 + columnWidth[0] + columnWidth[1], y, columnWidth[2], rowHeight, 'F');
      doc.rect(10 + columnWidth[0] + columnWidth[1] + columnWidth[2], y, columnWidth[3], rowHeight, 'F');

      doc.setTextColor(0);
      doc.setFont('helvetica', 'normal');
      doc.text(row[0], 12, y + 6);
      doc.text(row[1], 12 + columnWidth[0], y + 6);
      doc.text(row[2], 12 + columnWidth[0] + columnWidth[1], y + 6);
      doc.text(row[3], 12 + columnWidth[0] + columnWidth[1] + columnWidth[2], y + 6);

      y += rowHeight;
      rowIndex++;

      if (y > pageHeight) {
        doc.addPage();
        y = 20;
      }
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text("TimeForge App", 90, 290);
      doc.text(`Page ${i} of ${totalPages}`, 180, 290);
    }

    doc.save('goals.pdf');
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredGoals().map(g => ({
      'Titre': g.title,
      'Description': g.description,
      'Date Debut': g.startDate ? new Date(g.startDate).toLocaleDateString() : '',
      'Date Fin': g.endDate ? new Date(g.endDate).toLocaleDateString() : ''
    })));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Goals');
    XLSX.writeFile(wb, 'goals.xlsx');
  }
}
