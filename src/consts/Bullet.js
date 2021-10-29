import Phaser, { Scene } from "phaser";
import {gameState, world} from "../consts/Const"

export default class Bullet extends Phaser.GameObjects.Image
{

  preload()
  {
     this.load.image('bullet', './assets/bullet.png');
  }

  bullet(scene)
    {
        Phaser.GameObjects.Image.call(this, scene, gameState.player.x, gameState.player.y, 'bullet');
        scene.setScale(0.2)
        scene.incX = 0;
        scene.incY = 0;
        scene.lifespan = 0;
    
        scene.speed = Phaser.Math.GetSpeed(600, 1);

    }

    fire(x,y)
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
    }

    update(delta)
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
}