import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { CharacterService } from '../services/character.service';
import {take} from 'rxjs/operators';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  displayedColumns: string[] = ['id', 'name', 'type','image', 'created'];
  dataSource: any = [];
  

  constructor(private characterService: CharacterService, private _liveAnnouncer: LiveAnnouncer) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


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
  
  getCharacters(query = '', paginate = null) {
    this.characterService.getCharacters(query, paginate!)
    .pipe(take(1))
    .subscribe((res: any) => {
        if (res?.results?.length) {
          this.characters = res.results;
          this.dataSource = new MatTableDataSource(this.characters);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(this.characters)
          return this.characters;
        }
        
        return this.characters = []
    });
  }

  searchByName(value: string) {
    if(value && value.length > 3) {
      this.getCharacters(value)
    }
  }

}
