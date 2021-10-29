import player from "../public/player.png"
import Phaser, { Time } from "phaser";


import {gameState, world} from "../consts/Const"

let bullets;
let lastFired;
let initTime;
let a = 0;
let elapsedTime;
let time
let elapsedTrial;
let intervol;

let trialTime;
var index;
var iti;
var startS;
var startR;
var endS;
var endR;
var t = 0;
var par = 0;
var limit1 = 0;
var limit2 = 0;
var end = 0;

let pass = 0;

var dataMatrix = {
  tiempo:[],
  evento:[],
};





const listIti = [10000];
const stiDur = 5000; 
const reiDur = 15000;
//anterogrado = 1, retrogrado = 2
const arreglo = 1;
const dem = 1000;
const ensayos = listIti.length






export default class Experimento extends Phaser.Scene
{
    preload()
    {
        //this.load.image('bullet', 'C:/Users/Juan Carlos/Desktop/Automoldeamiento/assets/bullet.png');
        this.load.image('player', player);
        //this.load.spritesheet('cent', 'C:/Users/Juan Carlos/Desktop/Automoldeamiento/assets/cent.png', { frameWidth: 50 , frameHeight: 50 });
        //this.load.spritesheet('stimulus', sti, { frameWidth: 50 , frameHeight: 50 });
    }

    create()
    {
      gameState.player = this.physics.add.image(752,353, 'player').setScale(0.4);
    };

  

    update(time,delta)
    {
    }


    
  

   
    


}