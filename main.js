var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleEngineer = require('role.engineer');
var structureTower = require('structure.tower');
var roleLong = require('role.long');
var roleRunner = require('role.runner');
const allyModel = require('./allyModel');

allyModel.setLocalAllies({
    'player1': true,
    'player2': true,
});
StructureSpawn.prototype.setSpawning = function (room, creeps, structures, resources) {
    var spawnlvl = room.controller.level;
    this.setSpawningLevel(spawnlvl, room, creeps, structures, resources);
}
StructureSpawn.prototype.setSpawningLevel = function(spawnlvl, room, creeps, structures, resources) {
    for(var name in Memory.creeos) if (!Game.creeps[name]) {delete Memory.creeps[name]}}

    const {energyAvailable, energyCapacityAvailable} = room;
// main.js
    allyModel.sync();
    const energyRequirements = [
    {stage: 1, capacity: 300, available: 300},
    {stage: 2,  capacity: 600, available: 600}, 
    {stage: 3,  capacity: 900, available: 900},
    {stage: 4,  capacity: 1200, available: 1200}, 
    {stage: 5,  capacity: 1700, available: 1700},
    {stage: 6,  capacity: 2300, available:2300},
    {stage: 7,  capacity: 5300, available: 2300},
    {stage: 8, capacity: 12300, available: 2600}
    ];
     //Check if the current spawn level is valid
     if(spawnlvl >= 1 && spawnlvl <=8) {
        const{capacity, available} = energyRequirements[spawnlvl - 1];

        if(energyCapacityAvailable >= capacity) {
            if(energyAvailable >= available) {
                this.setSpawningClass(spawnlvl, room, creeps, structureTower, resources);
            }
        } else {
            spawnlvl =- 1; //Decrease spawn level
            this.setSpawningLevel(spawnlvl, room, creep, structure, resources);
        }
     } else {
        spawnlvl =- 1; //Decrease spawn level
            this.setSpawningLevel(spawnlvl, room, creep, structure, resources);
     }
    switch (stage) {
        case 1: //Stage 1 spawns, containers, extenstions, tower, ramparts, walls 
        if(harvesters.length < 2) {
            console.log('Spawning new harvester')
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            {memory: {role: Harvester}});    
            
        }
        if(builders.length < 2) {
            console.log('Spawning new Builder')
            Game.Spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],
            {memory: {role: builders}});
        }
        if(engineers.length < 2) {
            console.log('Spawning new Engineer')
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            {memory: {role: engineers}})
        }
        if(long.length < 2) {
            console.log('Spawning Ranged creep')
            Game.Spawns['spawn1'].spawnCreep([RANGED_ATTACK, TOUGH,MOVE,])
        }
        break;
        case 2: //Stage 2 extenstions Towers, ramparts, walls, storage, terminal, labs, links 
        if(harvesters.length < 3) {
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY, MOVE],
        {memory: {role: Long}});
            }
         if(builders.length < 3) {
            console.log('Spawning new Builder')
            Game.Spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],
            {memory: {role: builders}});
        }
        if(engineers.length < 2) {
            console.log('Spawning new Engineer')
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            {memory: {role: engineers}})
        }
        break;

        case 3: //Stage 3 Observer, factory, powerspawn, nuker, defense creeps 
        if(harvesters.length < 2) {
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY, MOVE],
        {memory: {role: Harvester}});
            }
         if(builders.length < 3) {
            console.log('Spawning new Builder')
            Game.Spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],
            {memory: {role: builders}});
        }
        if(engineers.length < 3) {
            console.log('Spawning new Engineer')
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE],
            {memory: {role: engineers}})
        }

        break;
        case 4: //Stage 4 Stronger creeps miner, upgraders, engineer
        if(harvesters.length < 4) {
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
            {memory: {role: Harvester}})


        }

        break;
        case 5: //Stage 5 

        break;
        case 6: //Stage 6 

        break;
        case 7: //Stage 7 

        break;
        case 8: //Stage 8

        default: 
        break;
    }

    
    
    
    for (let rooms in Game.room) {
        let room = Game.rooms[rooms];
        structureTower.run(room);
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
             roleUpgrader.run(creep);
        }
       else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
       else if(creep.memory.role == 'engineer') {
           roleEngineer.run(creep);
        }
        else if(creep.memory.role == 'long') {
            roleLong.run(creep);
        }
        else if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }

    }
 

