function menu(game) {

}

menu.prototype.preload = function () {
};

menu.prototype.create = function () {
    var text = this.game.add.text(0, 0, 'PLINKO!', {
        fill: '#FFF',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
    });

    text.setTextBounds(0, 100, 320, 100);

    this.game.add.button(100, 100, 'Test', this.play, this)
};

menu.prototype.play = function () {
    this.game.state.start('play');
};