import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { CharacterService } from '../services/character.service';
import {take} from 'rxjs/operators';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  
  rickSub: Subscription = Subscription.EMPTY;
  characters: Character[] = [];
  displayedColumns: string[] = ['id', 'name', 'type','image', 'created'];
  dataSource: any = [];
  
  constructor(private characterService: CharacterService, private _liveAnnouncer: LiveAnnouncer) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('inputSearch') inputSearch: any;
  @ViewChild('inputDate') inputDate: any;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getCharacters()
  }

  ngOnChange() {
    console.log("rerenderiza")
  }
  
  getCharacters(query = '', paginate = null) {
    
    this.rickSub = this.characterService.getCharacters(query, paginate!)
      .pipe(take(1))
      .subscribe((res: any) => {
          if (res?.results?.length) {
            this.characters = res.results;
            this.dataSource = new MatTableDataSource(this.characters);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            return this.characters;
          }
          return this.characters = []
      });
    
  }

  searchByName(value: string) {
    if(value && value.length > 3) {
      this.getCharacters(value, null)
    }
  }

  handleClear() {
    if (this.inputSearch.nativeElement.value != '' || this.inputDate.nativeElement.value != '') {
      this.inputSearch.nativeElement.value = '';
      this.inputDate.nativeElement.value = '';
      this.getCharacters(this.inputSearch.nativeElement.value, null)
    }
  }

  ngOnDestroy() {
    this.rickSub.unsubscribe()
  }

}
