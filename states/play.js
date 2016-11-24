function play(game) {
}

play.prototype.preload = function () {
    this.game.load.image('fixture', 'fixture.png');
    this.game.load.image('ball', 'football.png');
};

play.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.65;

    var ballCollisionGroup = this.game.physics.p2.createCollisionGroup(),
        fixtureCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.game.physics.p2.updateBoundsCollisionGroup();

    var balls = this.game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.P2JS;

    var fixtures = this.game.add.group();
    fixtures.enableBody = true;
    fixtures.physicsBodyType = Phaser.Physics.P2JS;

    // create balls
    // place them randomly on the X-axis
    // scale them down (would not need to do this if sprites were correct size)
    //
    for (var i = 0; i < 15; i++) {
        var ball = balls.create(this.game.world.randomX, 10, 'ball');
        ball.scale.setTo(0.05, 0.05);
        ball.body.setCircle(14);
        ball.body.setCollisionGroup(ballCollisionGroup);

        // What the ball should collide with - in this case, it will collide with other balls and fixtures
        ball.body.collides([ballCollisionGroup, fixtureCollisionGroup]);
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
        fixture.scale.setTo(0.05, 0.05);
        fixture.body.kinematic = true;
        fixture.body.setRectangle(25, 25);
        fixture.body.setCollisionGroup(fixtureCollisionGroup);
        fixture.body.collides([ballCollisionGroup]);
    }

    setTimeout(function () {
        this.game.physics.p2.gravity.y = 500;
    }.bind(this), 0);
};

play.prototype.play = function () {
    this.game.state.start('summary');
};