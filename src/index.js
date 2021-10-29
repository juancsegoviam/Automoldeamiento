import Phaser from 'phaser';
import Tutorial from './scenes/Tutorial';
//import Experimento from './scenes/Experimento'
import * as SceneKeys from './consts/SceneKeys'

const config = {
    width: 1505,
    height: 705,
    type: Phaser.Auto,
    //backgroundColor: '#616161',
    physics: {
        default: 'arcade',
        arcade:{
            gravity:{ y: 0},
            enableBody: true,
            debug: true
        }
    } 
}

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.Tutorial, Tutorial);
//game.scene.add(SceneKeys.Experimento, Experimento);
//game.scene.start(SceneKeys.Tutorial)