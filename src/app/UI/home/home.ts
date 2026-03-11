import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Folder {
  name: string;
  items: number;
  size: string;
  description?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private router = inject(Router);

  folders = signal<Folder[]>(this.generateFakeFolders(30));
  currentPage = signal(1);
  itemsPerPage = 10;

  showNewFolderModal = signal(false);
  newFolderName = '';
  newFolderDescription = '';

  get totalPages(): number {
    return Math.ceil(this.folders().length / this.itemsPerPage);
  }

  get paginatedFolders(): Folder[] {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.folders().slice(start, end);
  }

  generateFakeFolders(count: number): Folder[] {
    const prefixes = ['Project', 'Data', 'Archive', 'Backup', 'Shared', 'Personal', 'Work', 'Client', 'System', 'Media'];
    const suffixes = ['Files', 'Documents', 'Images', 'Videos', 'Reports', 'Assets', 'Resources', 'Backups', 'Exports', 'Imports'];
    const folders: Folder[] = [];

    for (let i = 0; i < count; i++) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const name = `${prefix}${suffix} ${2024 + Math.floor(Math.random() * 3)}`;
      const items = Math.floor(Math.random() * 500) + 10;
      const size = `${(Math.random() * 10 + 0.1).toFixed(2)} GB`;

      folders.push({ name, items, size });
    }

    return folders;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    console.log(`Navigating to: ${route}`);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage() - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  openNewFolderModal() {
    this.showNewFolderModal.set(true);
  }

  closeNewFolderModal() {
    this.showNewFolderModal.set(false);
    this.newFolderName = '';
    this.newFolderDescription = '';
  }

  addNewFolder() {
    if (this.newFolderName.trim()) {
      const newFolder: Folder = {
        name: this.newFolderName,
        items: 0,
        size: '0.00 GB',
        description: this.newFolderDescription || undefined
      };

      this.folders.update(folders => [newFolder, ...folders]);
      this.closeNewFolderModal();
      this.currentPage.set(1);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}