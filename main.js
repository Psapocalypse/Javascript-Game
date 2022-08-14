import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";

window.addEventListener("load", () => {    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    // const CANVAS_WIDTH = canvas.width = 600;
    // const CANVAS_HEIGHT = canvas.height = 600;

    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
        }
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    
    // const playerImage = new Image();
    // playerImage.src = './player/shadow_dog.png';
    
    // const spriteWidth = 575;
    // const spriteHeight = 523;
    
    // let gameFrame = 0;
    // const staggerFrames = 5;
    
    // const spriteAnimations = [];
    // const animationStates = [
    //     {
    //         name: 'idle',
    //         frames: 7
    //     },
    //     {
    //         name: 'jump',
    //         frames: 7
    //     },
    //     {
    //         name: 'fall',
    //         frames: 7
    //     },
    //     {
    //         name: 'run',
    //         frames: 9
    //     },
    //     {
    //         name: 'dizzy',
    //         frames: 11
    //     },
    //     {
    //         name: 'sit',
    //         frames: 5
    //     },
    //     {
    //         name: 'roll',
    //         frames: 7
    //     },
    //     {
    //         name: 'bite',
    //         frames: 7
    //     },
    //     {
    //         name: 'ko',
    //         frames: 12
    //     },
    //     {
    //         name: 'getHit',
    //         frames: 4
    //     }
    // ];
    // animationStates.forEach((state, idx) => {
    //     let frames = {
    //         loc: []
    //     }
    //     for (let i = 0; i < state.frames; i++) {
    //         let positionX = i * spriteWidth;
    //         let positionY = idx * spriteHeight;
    //         frames.loc.push({x: positionX, y: positionY})
    //     }
    //     spriteAnimations[state.name] = frames;
    // });
    
    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
})