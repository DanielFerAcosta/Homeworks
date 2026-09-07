import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../models/song';
import { LinkedList } from '../../data-structures/linked-list';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class SongsComponent implements OnInit {

  songs = new LinkedList<Song>();

  currentSong: Song | null = null;

  ngOnInit(): void {

    this.songs.add({
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      duration: '3:20'
    });

    this.songs.add({
      id: 2,
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      duration: '3:35'
    });

    this.songs.add({
      id: 3,
      title: 'As It Was',
      artist: 'Harry Styles',
      duration: '2:47'
    });

    this.songs.add({
      id: 4,
      title: 'Levitating',
      artist: 'Dua Lipa',
      duration: '3:23'
    });

    this.currentSong = this.songs.get(0);
  }

  playSong(index: number): void {
    this.currentSong = this.songs.get(index);
  }

  getSongs(): Song[] {
    return this.songs.toArray();
  }
}