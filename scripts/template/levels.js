const LEVEL = [];

LEVEL[0] = {
    // Background
    alpha: 127,
    bg: 0,
    color: 255,
    // Boss
    boss: null,
    // Enemies
    enemy: ['basic', 'splitter', 'bomber', 'shotgunner','turret'],
    enemyWeight: [0.5, 0.15, 0.15,0.1,0.1],
    spawnCount: 100,
    spawnTimeMax: 90,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'tripleFire','rapidFire', 'health'],
    itemWeight: [0.4, 0.3, 0.04, 0.02, 0.1, 0.14]
};