import Phaser from 'phaser';

export default class Tutorial extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        this.scoreText = this.add.text(750, 350, 'Para empezar el juego dar click', {fontSize: '15px', fill: '#FFFFFF'})
        this.input.on('pointerdown', () => {
            this.scene.stop('Tutorial');
            this.scene.start('Experimento');
        })
    }

}