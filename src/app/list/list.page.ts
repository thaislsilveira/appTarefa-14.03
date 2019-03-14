import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    this.items.push({ title: 'Tosa', icon: 'cut', note: '' });
    this.items.push({ title: 'Banho', icon: '', note: '' });
    this.items.push({ title: 'Vacinação', icon: '', note: '' });
    this.items.push({ title: 'Vermifugação', icon: '', note: '' });
    this.items.push({ title: 'Internação', icon: 'medkit', note: '' });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
