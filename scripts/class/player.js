class Player extends Ship {
    constructor(x, y) {
        super(x, y);

        // Cooldowns
        this.invulnTime = 0;
        this.weaponTimeout;

        // Display
        this.color = '#19B5FE';

        // Misc
        this.type = 'player';

        // Physics
        this.r = PLAYER_RADIUS;
        this.d = 'c';

        // Stats
        this.fireRate = PLAYER_FIRE_RATE;
        this.hp = PLAYER_HP;
        this.speed = PLAYER_SPEED;
        this.weapon = 'basic';
    }

    setWeapon(fireRate, weapon, ms = 10000) {
        clearTimeout(weaponTimeout);
        pl.fireRate = fireRate;
        pl.weapon = weapon;
        weaponTimeout = setTimeout(() => {
            this.fireRate = PLAYER_FIRE_RATE;
            this.weapon = 'basic';
        }, ms)
    }

    // All operations to do per tick
    act() {
        if (!paused) this.controls();
        super.act();
    }

    // The attack being used when firing
    attack() {
        WEAPON[this.weapon](this);
    }

    // Check for keypresses
    controls() {
        this.d = 'c';
        // Fire weapon (space key)
        if (keyIsDown(32)) this.fire();

        // Movement (arrow keys, wasd)
        let diag = this.speed / sqrt(2);
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.d = 'r';
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.vel = createVector(diag, -diag);
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.vel = createVector(diag, diag);
            } else {
                this.vel = createVector(this.speed, 0);
            }
        } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.d = 'l';
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.vel = createVector(-diag, -diag);
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.vel = createVector(-diag, diag);
            } else {
                this.vel = createVector(-this.speed, 0);
            }
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.vel = createVector(0, this.speed);
        } else if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.vel = createVector(0, -this.speed);
        } else {
            this.vel.mult(0);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.invulnTime > 0) this.invulnTime -= dt();
        if (this.invulnTime < 0) this.invulnTime = 0;
    }

    // Deal damage
    damage() {
        if (this.invulnTime > 0) return;
        this.invulnTime = INVULN_TIME;
        super.damage();
    }

    // Display on the canvas
    display() {
        this.model(this.d, true);

        // Display hitbox
        if (showHitboxes) {
            fill(255, 63);
            stroke(255);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }
    }

    // Heal HP up to max
    heal(amt) {
        if (typeof amt === 'undefined') amt = 1;
        if (this.hp < this.maxHp) this.hp += amt;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    // Events
    onDeath() {
        reloadLevel();
    }
    onHitBottom() {
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
    }
    onHitTop() {
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
    }
}
