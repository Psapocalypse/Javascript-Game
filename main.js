import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

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
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = "black";
            this.time = 0;
            this.maxTime = 20000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion == true) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            })
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }
            // handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            })
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            })
            // handle collision sprites
            this.collisions.forEach(collision => {
                collision.draw(context);
            })
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
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
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})