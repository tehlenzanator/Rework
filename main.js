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
// main.js

    allyModel.sync();

    spawnModule.exampleFunction();
    var result = spawnModule.exampleFunction2(10);
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    var engineers = _.filter(Game.creeps, (creep) => creep.memory.role == 'engineer');
    console.log('Engineers: ' + engineers.length);
    var long = _.filter(Game.creeps, (creep) => creep.memory.role == 'long');
    console.log('long range: ' + long.length);
    var runner =_.filter(Game.creeps, (creep) => creep.memory.role == 'runner');
    console.log('runner: ' + runner.length);
    var superHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'superHarvester');
    console.log('superHarvester: + superHarvester'.length)
    //auto spawn a harvester, if it is less than 2 
    
    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    
    }
        //auto spawn a upgrader, if less than 2 
        
    else if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'upgrader'}});
    }
    //auto spawn a builder if it is less than 2
    
    else if(builders.length < 2) {
       var newName = 'Builder' + Game.time;
        console.log('Spawning new builder ' + newName);
       Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE], newName,
        {memory: {role: 'builder'}});
    }
    else if(engineers.length < 1) {
        var newName = 'Engineer' + Game.time;
        console.log('Spawning new engineer ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE], newName,
        {memory: {role: 'engineer'}});
    }
    else if(long.length < 4) {
        var newName = 'Range' + Game.time;
        console.log('Spawning new ranger ' + newName);
        Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK,RANGED_ATTACK, MOVE, TOUGH, TOUGH], newName,
        {memory: {role: 'long'}});
    }
    else if(runner.length < 2) {
        var newName = 'runner' + Game.time;
        console.log('Spawning new runner ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'runner'}});
    }
    else if(superHarvester.length < 2) {
        var newName = ('superHarvester' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName,
        {memory: {role: 'superHarvester'}});
    }
    else if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
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
        else if(creep.memory.role == 'superHarvester') {
            rolesuperHarvester.run(creep);
        }

    }
 

}
