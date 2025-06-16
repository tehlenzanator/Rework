//Get roles from other scripts and import 
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

//creep memory 
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

allyModel.setLocalAllies({
    'player1': true,
    'player2': true,
});

module.exports.loop = function () {
    // Sync ally data
    allyModel.sync();
}

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
    //Spawn notifcation 
if(Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns['Spawn1'].pos.x + 1,
          Game.spawns['Spawn1'].pos.y,
          {align: 'left', opacity: 0.8}

        )
    }

   

 // Spawn and memory for creeps 
function spawning() {
    
    //harvester Spawn logic 
    if(harvesters.length < 2) {
        let newName = 'Harvester' + Game.time;
        console.log('spawning new harvester:', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester' }});
        roleHarvester.run(creep);
        }   
            
    //Upgrader
    if(upgraders.length < 2) {
        let newName = 'Upgrader' + Game.time;
        console.log('spawning new upgrader:', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        roleUpgrader.run(creep);
        }

    //Builders        
    if(builders.length < 2) {
        let newName = 'Builder' + Game.time; 
        console.log('spawning new builder:', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'Builder'}});
        roleBuilder.run(creep);
        }
    //engineers
    if(engineers.length < 2) {
        let newName = 'Engineer' + Game.time;
        console.log('Spawning new engineer', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'Engineer'}});
        roleEngineer.run(creep);
        }
    //runners
    if(runners.length < 2) {
        let newName = 'Runner' + Game.time;
        console.log('Spawning new runner', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'Runner'}});
        roleRunner.run(creep);
    }
    //Long Range creeps 
    if(longRange.length < 4) {
        let newName = 'Range' + Game.time;
        console.log('spawning new ranger', newName)
        Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, TOUGH], newName, {Memory: {role: 'longRange'}});
        roleLong.run(creep);
    }
    //Super harvester
    if(superHarvesters.length > 1) {
        let newName = 'SuperHarvester' + Game.time;
        console.log('Spawning new Super harvester', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, {Memory: {role: 'Super Harvester'}});
        rolesuperHarvester.run(creep);
    }
spawning();
    }

    
    
