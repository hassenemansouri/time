import { Injectable } from '@angular/core';
import {Appointment} from '../app/appointment-dialog/appointment-dialog.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StrategicPartenershipCalendarService {


  private readonly STORAGE_KEY = 'calendar_appointments';
  private appointments: Appointment[] = [];

  constructor() {
    this.loadAppointments();
    this.initializeSampleData();
  }

  private loadAppointments(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.appointments = saved ? JSON.parse(saved) : [];

    // Convertir les dates string en objets Date
    this.appointments = this.appointments.map(app => ({
      ...app,
      date: new Date(app.date),
      startTime: app.startTime || '00:00',
      endTime: app.endTime || '01:00'
    }));
  }

  private saveAppointments(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.appointments));
  }

  private initializeSampleData(): void {
    if (this.appointments.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.saveAppointments();
    }
  }


  private generateRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  }


}
