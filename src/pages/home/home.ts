import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ElementRef } from '@angular/core';
import { SongsService } from '../../app/songs.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

  songinfos:any;
  songTrack:any;
  isPlaying=false;
  pageLoaded = false;
  audiocurrenttime:string = "";
  audioduration:string="";
  currentPlayingTrackName= "";
  constructor(public navCtrl: NavController,private songService:SongsService ,private eleref:ElementRef) {
  }

  ionViewDidLoad(){
    var that = this;
    this.songService.getSongs().subscribe((data)=>{
    console.log(data);
    this.songinfos = data.aTracks;
    this.songTrack = "https://freemusicarchive.org/file/"+this.songinfos[0].track_file;
    this.pageLoaded=true;
    // console.log("loaded");
    this.isPlaying = true;
    this.currentPlayingTrackName = this.songinfos[0].track_title.substring(0,18);
    
        let audio = that.eleref.nativeElement.getElementsByClassName("song")[0]
        audio.addEventListener("timeupdate",function(e){

          var date = new Date(null);
          date.setSeconds(audio.currentTime); // specify value for SECONDS here
          that.audiocurrenttime = date.toISOString().substr(11, 8);
          


                  
      })

      this.audioduration = this.songinfos[0].track_duration;
  })

}


play(songinfo){
  this.songTrack = "https://freemusicarchive.org/file/"+songinfo.track_file;
  this.currentPlayingTrackName = songinfo.track_title.substring(0,18);
  this.isPlaying = true;
}

playNext(){
let currentsongplaying = this.songTrack;
let index =0;
  for(var i=0;i<this.songinfos.length;i++){
    if("https://freemusicarchive.org/file/"+this.songinfos[i].track_file == currentsongplaying){
      index = i;
      index = index+1;
      this.songTrack = "https://freemusicarchive.org/file/"+this.songinfos[index].track_file;
      this.currentPlayingTrackName = this.songinfos[index].track_title.substring(0,18);
      this.isPlaying = true;
    }
  }
  

}

playPrev(){
let currentsongplaying = this.songTrack;
let index =0;
  for(var i=0;i<this.songinfos.length;i++){
    if("https://freemusicarchive.org/file/"+this.songinfos[i].track_file == currentsongplaying){
      index = i;
      index = index-1;
      this.songTrack = "https://freemusicarchive.org/file/"+this.songinfos[index].track_file;
      this.currentPlayingTrackName = this.songinfos[index].track_title.substring(0,18);
      this.isPlaying = true;
    }
  }
}

onPlay(){
this.isPlaying = true;
this.eleref.nativeElement.getElementsByClassName("song")[0].play();
}

onPause(){
this.isPlaying = false;
this.eleref.nativeElement.getElementsByClassName("song")[0].pause();
}

downloadSong(songinfo){

}

search(){

}



}
