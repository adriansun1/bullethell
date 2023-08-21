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
    spawnCount: 90,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'tripleFire','rapidFire', 'health'],
    itemWeight: [0.1, 0.1, 0.02, 0.01, 0.89, 0.01]
};