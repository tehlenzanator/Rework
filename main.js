//working code
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnModule = require('spawnModule');
var roleEngineer = require('role.engineer');
var structureTower = require('structure.tower');
var roleLong = require('role.long');
var roleRunner = require('role.runner');
var rolesuperHarvester = require('role.superHarvester');
const allyModel = require('./allyModel');

allyModel.setLocalAllies({
    'player1': true,
    'player2': true,
});

module.exports.loop = function () {
    // Sync ally data
    allyModel.sync();

    // Example function calls from spawnModule
    spawnModule.exampleFunction();
    var result = spawnModule.exampleFunction2(10);

    // Cleanup memory for dead creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // Manage towers safely
    let room = 'E27S58';
    if(Structure) {
        if(structureTower) { 
            structureTower.run(room);
        }
    }
    // Display spawning notification
    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }
    //Transfer energy between Links 
  links = function (links) {
        const transferEnergy = (source, target) => {
            if (source.cooldown === 0 && source.energy > 600) {
                const openCapacity = target.energyCapacity - target.energy
                const energyAvailable = source.energy;
                const amounttoTransfer = Math.min(energyAvailable, openCapacity, 300);
                source.transferEnergy(target, amounttoTransfer);
                transferEnergy(links[0], links[2]);
            }

        }
    };
    

    

    // Count creeps by role safely
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders:', builders.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders:', upgraders.length);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters:', harvesters.length);

    var engineers = _.filter(Game.creeps, (creep) => creep.memory.role === 'engineer');
    console.log('Engineers:', engineers.length);

    var longRange = _.filter(Game.creeps, (creep) => creep.memory.role === 'long');
    console.log('Long range:', longRange.length);

    var runners = _.filter(Game.creeps, (creep) => creep.memory.role === 'runner');
    console.log('Runners:', runners.length);

    var superHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'superHarvester');
    console.log('Super Harvesters:', superHarvesters.length);



    // Auto-spawning logic for maintaining workforce balance
    if (harvesters.length < 2) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
    } else if (upgraders.length < 2) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader'}});
    } else if (builders.length < 2) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
    } else if (engineers.length < 2) {
        let newName = 'Engineer' + Game.time;
        console.log('Spawning new engineer:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'engineer'}});
    } else if (longRange.length < 4) {
        let newName = 'Ranger' + Game.time;
        console.log('Spawning new ranger:', newName);
        Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, TOUGH], newName, {memory: {role: 'long'}});
    } else if (runners.length < 2) {
        let newName = 'Runner' + Game.time;
        console.log('Spawning new runner:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'runner'}});
    } else if (superHarvesters.length < 1) {
        let newName = 'SuperHarvester' + Game.time;
        console.log('Spawning new superHarvester:', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'superHarvester'}});
    } 
    

    
    // Execute roles with added safety checks
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (!creep || !creep.memory) continue; // Ensures creep exists before running role functions

        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'engineer':
                roleEngineer.run(creep);
                break;
            case 'long':
                roleLong.run(creep);
                break;
            case 'runner':
                roleRunner.run(creep);
                break;
            case 'superHarvester':
                rolesuperHarvester.run(creep);
                break;
          
            }
        }
    }
