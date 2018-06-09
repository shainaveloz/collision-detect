let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  audio: {
    disableWebAudio: true
  }
}
let game = new Phaser.Game(config);
let cube = new Phaser.Geom.Rectangle(100, 100, 100, 100);

function preload(){

  this.load.image('green', '/images/greenMushroom.png');
  this.load.image('red', '/images/redMushroom4.png');
  this.load.audioSprite('bump', '/sounds/smb_bump.wav');
}

function create(){

  let mushrooms = this.physics.add.staticGroup();

  mushrooms.create(100, 350, 'green').setScale(.5).refreshBody();
  mushrooms.create(1000, 350, 'green').setScale(.5).refreshBody();

  cube = this.physics.add.sprite(550,50).setInteractive();

  fill = this.add.graphics({fillStyle: {color: 0x0000ff}})

  player = this.physics.add.sprite(550, 350, 'red').setScale(.13);

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, mushrooms, collisionHandler);

  //sound = this.sound.addAudioSprite('bump');
  //let spritemap = this.cache.json.get(sound).spritemap;


  this.input.setDraggable(cube);

  let cubes = this.add.group(cube);
  cubes.create(550, 700);

  this.physics.add.overlap(player, cubes, overlapDetector);

  this.input.on('drag',(pointer, cubes, dragX, dragY) =>{
    cubes.x = dragX;
    cubes.y = dragY;
  })

};

function update(){
  fill.fillRectShape(cube);

  if(cursors.left.isDown){
    player.setVelocityX(-160)
  }else if(cursors.right.isDown){
    player.setVelocityX(160);
  }else if(cursors.up.isDown){
    player.setVelocityY(-160);
    // if(Phaser.Geom.Rectangle.Overlaps(player)){
    //   overlapDetector();
    // }
  }else if(cursors.down.isDown){
    player.setVelocityY(160);
  }else{
    player.setVelocityY(0);
    player.setVelocityX(0);
  }

  // if(cursors.up.isDown && player.body.touching.down){
  //   player.setVelocityY(-330);
  // }
};

function collisionHandler(){
  console.log('hit')
}

function overlapDetector(){
  console.log('overlap')
}
