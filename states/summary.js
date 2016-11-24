function summary(game) {
}

summary.prototype.preload = function () {
};

summary.prototype.create = function () {
    this.game.add.button(100, 100, 'restart', this.restart, this);

    var text = this.game.add.text(0, 0, 'KEV MAKES\rTHE ROUND!', {
        fill: '#FFF',
        boundsAlignH: 'center',
        boundsAlignV: 'middle',
        align: 'center'
    });

    text.setTextBounds(0, 100, 320, 100);
};

summary.prototype.restart = function () {
    this.game.state.start('menu');
};