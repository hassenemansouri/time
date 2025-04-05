import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { Goal } from './goal.model';
import { NgForOf } from '@angular/common';
import { GoalService } from './goal.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-goals',
  templateUrl: './list-goals.component.html',
  styleUrls: ['./list-goals.component.css'],
  standalone: true,
  imports: [NgForOf, RouterLink, RouterLinkActive, FormsModule]
})
export class ListGoalsComponent implements OnInit {
  goals: Goal[] = [];
  searchText: string = '';

  constructor(private goalService: GoalService, private router: Router) {}

  ngOnInit(): void {
    this.loadGoals();
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
      goal.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);
    doc.text('TimeForge - Goals', 14, 10);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text('Liste des objectifs enregistrés', 14, 20);

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 22, 200, 22);

    const columns = ['Titre', 'Description'];
    const data = this.filteredGoals().map(goal => [goal.title, goal.description]);

    const startY = 30;
    const columnWidth = [70, 120];
    const rowHeight = 8;
    const pageHeight = 280;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(41, 128, 185);

    doc.rect(10, startY - 5, columnWidth[0], rowHeight, 'F');
    doc.rect(columnWidth[0] + 10, startY - 5, columnWidth[1], rowHeight, 'F');
    doc.text(columns[0], 14, startY);
    doc.text(columns[1], columnWidth[0] + 14, startY);

    let y = startY + rowHeight;
    let rowIndex = 0;

    data.forEach(row => {
      doc.setFillColor(rowIndex % 2 === 0 ? 245 : 245, 245, 245);
      doc.rect(10, y, columnWidth[0], rowHeight, 'F');
      doc.rect(columnWidth[0] + 10, y, columnWidth[1], rowHeight, 'F');

      doc.setTextColor(0);
      doc.setFont('helvetica', 'normal');
      doc.text(row[0], 14, y + 5);
      doc.text(row[1], columnWidth[0] + 14, y + 5);

      y += rowHeight;
      rowIndex++;

      if (y > pageHeight) {
        doc.addPage();
        y = 20;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Titre', 14, y);
        doc.text('Description', columnWidth[0] + 14, y);
        y += rowHeight;
      }
    });

    const totalPages = doc.internal.pages.length;
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredGoals().map(goal => ({
        'Titre': goal.title,
        'Description': goal.description
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Goals');
    XLSX.writeFile(wb, 'goals.xlsx');
  }
}
