
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
        this.load.image('bullet', '../public/assets/bullet.png');
        this.load.image('player', '../public/assets/player.png');
        this.load.spritesheet('cent', '../public/assets/cent.png', { frameWidth: 50 , frameHeight: 50 });
        this.load.spritesheet('stimulus', '../public/assets/sti.png', { frameWidth: 50 , frameHeight: 50 });
    }

    create()
    {
      initTime = new Date().getTime();
      trialTime = new Date().getTime();
      gameState.player = this.physics.add.image(752,353, 'player').setScale(0.4);
      gameState.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);
      world.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
      world.circle1 = new Phaser.Geom.Circle(752,353, 100);
      world.circle2 = new Phaser.Geom.Circle(752,353, 300);
      gameState.cursors = this.input.keyboard.createCursorKeys();
      
      
      
      var Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        
        initialize:
        //aquí las funciones declaran en que lugar va estar y que velocidad va ser disparada 
        function Bullet (scene)
        {
          Phaser.GameObjects.Image.call(this, scene, gameState.player.x, gameState.player.y, 'bullet');
          this.setScale(0.2)
          this.incX = 0;
          this.incY = 0;
          this.lifespan = 0;
          this.speed = Phaser.Math.GetSpeed(600, 1);
        },
        // aquí declara si está visible el disparo y sí está activo
        fire: function (x, y)
        {
          this.setActive(true);
          this.setVisible(true);
          this.rotation = gameState.player.rotation;
          
          //  los disparos estarán en función de la posición del jugador 
          this.setPosition(gameState.player.x, gameState.player.y);
          
          // El angulo de disparo será entre x y la x del jugador (trayectora)
          var angle = Phaser.Math.Angle.Between(x, y, gameState.player.x, gameState.player.y);
          this.incX = Math.cos(angle);
          this.incY = Math.sin(angle);
          
          //Esta parte del codigo es solo cuando se quiera que el disparo sea contino (contante con el input) y no discreto
          this.lifespan = 500;
          },
          
        update: function (time, delta)
        {
          this.lifespan -= delta;
          this.x -= this.incX * (this.speed * delta);
          this.y -= this.incY * (this.speed * delta);
          
          if (this.lifespan <=  0)
          {
            this.setActive(false);
            this.setVisible(false);
          }
        }
        });
      bullets = this.physics.add.group(
        {
          classType: Bullet,
          maxSize: 50,
          runChildUpdate: true 
        }
        );
      
      gameState.stimulus = this.physics.add.sprite(752,100,'stimulus');
      gameState.stimulus.anims.create(
        {
          key: 'hit',
          frames: this.anims.generateFrameNumbers('stimulus', { start: 1, end: 1 }),
          frameRate: 1,
          repeat: -1
        });
      gameState.stimulus.anims.create(
        {
          key: 'normal',
          frames: this.anims.generateFrameNumbers('stimulus', { start: 0, end: 0 }),
          frameRate: 1,
          repeat: -1
      });
      gameState.stimulus.play('hit', true);




      gameState.reinforcer = this.physics.add.sprite(752,600,'cent');
      gameState.reinforcer.anims.create(
        {
          key: 'hit',
          frames: this.anims.generateFrameNumbers('cent', { start: 0, end: 0 }),
          frameRate: 1,
          repeat: -1
        });
      gameState.reinforcer.anims.create(
        {
          key: 'normal',
          frames: this.anims.generateFrameNumbers('cent', { start: 1, end: 1 }),
          frameRate: 1,
          repeat: -1
      });
      gameState.reinforcer.play('hit', true);




   
      gameState.ecActivation = this.physics.add.collider(gameState.stimulus, bullets, (stimuli,bullet) => 
       {
         bullet.destroy();
         stimuli.play('hit', true);
         setTimeout(function(){ stimuli.play('normal', true) }, 100);
         dataMatrix.tiempo.push(elapsedTime);
         dataMatrix.evento.push('rCon');
         console.log('respo Co')
         console.log(dataMatrix)  

         
        });

      gameState.ecActivation.active = false;

      gameState.ecDeactivation = this.physics.add.collider(gameState.stimulus, bullets, (stimuli,bullet) => 
       {
        stimuli.play('hit', true);
         bullet.destroy();
         console.log(elapsedTime);
         dataMatrix.tiempo.push(elapsedTime);
         dataMatrix.evento.push('rOr');
         console.log('respo Or')
         console.log(dataMatrix)  
         
        });





        gameState.reinActivation = this.physics.add.collider(gameState.reinforcer, bullets, (reinforcer,bullet) => 
       {
         bullet.destroy();
         reinforcer.play('hit', true);
         setTimeout(function(){ reinforcer.play('normal', true) }, 100);
         console.log(elapsedTime);
         dataMatrix.tiempo.push(elapsedTime);
         dataMatrix.evento.push('rIn');
         
        });

      gameState.reinActivation.active = false;

      gameState.reinDeactivation = this.physics.add.collider(gameState.reinforcer, bullets, (reinforcer,bullet) => 
       {
         reinforcer.play('hit', true);
         bullet.destroy();
         console.log(elapsedTime);
         dataMatrix.tiempo.push(elapsedTime);
         dataMatrix.evento.push('rSM');
         
        });

        this.timer();
        
      
       
      
      
      
    };

  

    update(time,delta)
    {
      
      world.graphics.clear();
      world.graphics.lineStyle(2,0x48A9A6);
      world.graphics.strokeCircleShape(world.circle1);
      world.graphics.lineStyle(2,0xC1666B);
      world.graphics.strokeCircleShape(world.circle2);
      world.graphics.fillStyle(0xff00ff);
      world.graphics.fillRect(gameState.point.x - 8, gameState.point.y - 8, gameState.point.width, gameState.point.height);
      Phaser.Geom.Circle.CircumferencePoint(world.circle1, a, gameState.player);
      Phaser.Geom.Circle.CircumferencePoint(world.circle2, a, gameState.point);
      
      //Declara a donde estará apuntanto el sujeto 
      
      gameState.player.setRotation(Phaser.Math.Angle.Between(gameState.point.x, gameState.point.y, gameState.player.x, gameState.player.y) - Math.PI / 2);
      
      if(gameState.cursors.left.isDown)
      {
        a += 0.1;
        gameState.player.angle += 0.03;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2
        };
      };
      
      if(gameState.cursors.right.isDown)
      {
        a -= 0.1;
        gameState.player.angle += 0.03;
        if(a >= Phaser.Math.PI2)
        {
          a -= Phaser.Math.PI2;
        };
      };
      
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) 
      {
        var bullet = bullets.get();
        if (bullet)
        {
          bullet.fire(gameState.point.x, gameState.point.y);
          lastFired = 50;
        };
      };
    }

    ecStart()
    {
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('ECstart');
      console.log(dataMatrix)
         
      gameState.ecDeactivation.active = false;
      gameState.stimulus.play('normal', true);
      gameState.ecActivation.active = true;
    }

    ecEnd()
    {
      gameState.ecActivation.active = false;
      gameState.ecDeactivation.active = true;
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('ECend');
       
      console.log(Date.now() -initTime);
      gameState.stimulus.play('hit', true);
      

    }

    reinStart()
    {
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('RStart');
        
      console.log(Date.now() - initTime)
      gameState.reinDeactivation.active = false;
      gameState.reinforcer.play('normal', true);
      gameState.reinActivation.active = true;
    }

    reinEnd()
    {
      dataMatrix.tiempo.push(elapsedTime);
      dataMatrix.evento.push('rEnd');
      console.log(Date.now() -initTime);
      gameState.reinforcer.play('hit', true);
      gameState.reinActivation.active = false;
      gameState.reinDeactivation.active = true;

    }




    timer() 
    {
      initTime = new Date().getTime();
      console.log(initTime)
        var that = this
        

        intervol = setInterval(function () {
          for (var i = 0; i < 10000; i++) 
          {
            // YOUR CODE
            elapsedTime = new Date().getTime() -initTime;
  
          
            if(par == 0)
            {
              
              index = Math.floor(Math.random() * listIti.length);
              iti = listIti[index];
              if(arreglo == 1) 
              {
                startS = iti ;
                endS = startS + stiDur;
                startR = iti + dem;
                endR = startR + reiDur;
                end = endR
                
              }
              else if(arreglo == 2)
              {
                startS = iti + dem;
                endS = startS + stiDur;
                startR = iti ;
                endR = startR + reiDur;
                end = endS
              }
              par = 1;
              
            }
            if(elapsedTime <iti)
            {
              gameState.stimulus.play('hit', true);
              gameState.reinforcer.play('hit', true);
            }
            if(elapsedTime > startS-1 && limit1 == 0)
            {
              that.ecStart()
              limit1 = 1;
            }
            else if(elapsedTime > endS-1 && limit1 == 1)
            {
              that.ecEnd()
             
              limit1 = 2;
              
            }
            else if(elapsedTime > startR-1 && limit2 == 0)
            {
              that.reinStart()
              limit2 = 1;

            }
            else if(elapsedTime > endR-1 && limit2 == 1)
            {
              that.reinEnd();
              limit2 = 2;
            }
            else if(elapsedTime >= end)
            {
              limit1 = 0;
              limit2 = 0;
              initTime = new Date().getTime();
              pass++;
              par = 0
              if(pass == ensayos)
              {
                console.log('ya estuvo');
                clearInterval(intervol);
                that.saveData(dataMatrix);
                that.scene.stop('Experimento');
              }
            }

            
    
          }
      }, 1/1000);
       
    }


   

    
  

   
    


}