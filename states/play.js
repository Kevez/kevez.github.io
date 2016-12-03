function play(game) {
}

play.prototype.preload = function () {
    this.game.load.image('platform', 'platform.png');
    this.game.load.image('fixture', 'fixture.png');
    this.game.load.image('player', 'player.png');
    this.game.load.image('box', 'box.png');
};

play.prototype.create = function () {
    console.log(this.game.world);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.65;

    this.ballsCollection = [];

    var ballCollisionGroup = this.game.physics.p2.createCollisionGroup(),
        fixtureCollisionGroup = this.game.physics.p2.createCollisionGroup(),
        platformsCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.game.physics.p2.updateBoundsCollisionGroup();

    var balls = this.game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.P2JS;

    var fixtures = this.game.add.group();
    fixtures.enableBody = true;
    fixtures.physicsBodyType = Phaser.Physics.P2JS;

    var platforms = this.game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.P2JS;

    this.platform = fixtures.create(100, 400, 'platform');
    this.platform.body.kinematic = true;
    this.platform.body.setRectangle(32, 8);
    this.platform.body.setCollisionGroup(platformsCollisionGroup);
    this.platform.body.collides([ballCollisionGroup]);
    this.platform.body.velocity.x = 100;

    this.platform2 = fixtures.create(this.game.world.width - 100, 500, 'platform');
    this.platform2.body.kinematic = true;
    this.platform2.scale.setTo(3, 3);
    this.platform2.body.setRectangle(96, 24);
    this.platform2.body.setCollisionGroup(platformsCollisionGroup);
    this.platform2.body.collides([ballCollisionGroup]);
    this.platform2.body.velocity.x = -100;

    // create balls
    // place them randomly on the X-axis
    // scale them down (would not need to do this if sprites were correct size)
    //
    for (var i = 0; i < 1; i++) {
        var ball = balls.create(this.game.world.randomX, 10, 'player');
        //ball.scale.setTo(0.05, 0.05);
        ball.body.setCircle(16);
        ball.body.setCollisionGroup(ballCollisionGroup);

        // What the ball should collide with - in this case, it will collide with other balls and fixtures
        ball.body.collides([ballCollisionGroup, fixtureCollisionGroup, platformsCollisionGroup]);

        this.ballsCollection.push(ball);
    }

    var fixturePositions = [
        {x: 80, y: 70},
        {x: 160, y: 70},
        {x: 240, y: 70},
        {x: 80, y: 170},
        {x: 160, y: 170},
        {x: 240, y: 170},
        {x: 80, y: 270},
        {x: 160, y: 270},
        {x: 240, y: 270}
    ];

    for (var i = 0; i < fixturePositions.length; i++) {
        var fixture = fixtures.create(fixturePositions[i].x, fixturePositions[i].y, 'fixture');
        //fixture.scale.setTo(0.05, 0.05);
        fixture.body.kinematic = true;
        fixture.body.setCircle(16);
        fixture.body.setCollisionGroup(fixtureCollisionGroup);
        fixture.body.collides([ballCollisionGroup]);
    }

    var boxes = this.game.add.group();
    boxes.enableBody = true;
    boxes.physicsBodyType = Phaser.Physics.P2JS;

    this.box = boxes.create(100, this.game.world.height - 16, 'box');
    this.box.body.kinematic = true;
    this.box.body.setRectangle(32, 32);
    //this.box.body.setCollisionGroup(platformsCollisionGroup);
    //this.box.body.collides([ballCollisionGroup]);
    //this.box.body.velocity.x = 100;

    setTimeout(function () {
        this.game.physics.p2.gravity.y = 300;
    }.bind(this), 0);

    this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.switchDirections, this);
};

play.prototype.switchDirections = function () {
    this.platform.body.velocity.x *= -1;
    this.platform2.body.velocity.x *= -1;

    //this.game.debug.spriteBounds(this.platform);
    //this.game.debug.body(this.ballsCollection[0]);
    //this.game.debug.spriteCorners(this.ballsCollection[0], true, true);
};

play.prototype.update = function () {
    this.platform2.body.angle += 1;

    var boxX = this.box.x;
    var boxY = this.box.y;
    var ballX = this.ballsCollection[0].x;
    var ballY = this.ballsCollection[0].y;

    console.log(boxX, boxY, ballX);

    if (ballX > boxX &&
        ballX < (boxX + 32) &&
        ballY > boxY &&
        ballY < (boxY + 32)) {
        console.log('overlap!');
    }

};

play.prototype.play = function () {
    this.game.state.start('summary');
};

play.prototype.checkOverlap = function (spriteA, spriteB) {

};