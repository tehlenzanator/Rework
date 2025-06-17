//WIP
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
module.exports.loop = function () {

spawnModule.exampleFunction();
var result = spawnModule.exampleFunction2(10);

//creep memory 
 var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    console.log('Builders:', builders.length);

var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    console.log('Upgraders:', upgraders.length);

var harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters:', harvester.length);

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


    // Sync ally data
    allyModel.sync();


        
    
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

    

function memory() {
  for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (!creep || !creep.memory) continue;
        
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
memory()



var creep = Game.creeps[name];
  // Cleanup memory for dead creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name)
        }
    }
     for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
     }

function spawning() {
   var creep = Game.creeps[name];
    console.log('here I am');
    //harvester Spawn logic 
    if(harvester.length < 2) {
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
    
        }

    //Builders        
    if(builders.length < 2) {
        let newName = 'Builder' + Game.time; 
        console.log('spawning new builder:', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'builder'}});
        
        }
    //engineers
    if(engineers.length < 2) {
        let newName = 'Engineer' + Game.time;
        console.log('Spawning new engineer', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'engineer'}});
        
        }
    //runners
    if(runners.length < 2) {
        let newName = 'Runner' + Game.time;
        console.log('Spawning new runner', newName)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {Memory: {role: 'Runner'}});
        
    }
    //Long Range creeps 
    if(longRange.length < 1) {
        let newName = 'Range' + Game.time;
        console.log('spawning new ranger', newName)
        Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK, MOVE, TOUGH], newName, {Memory: {role: 'long'}});
        
    }
    //Super harvester
    if(superHarvesters.length < 1) {
        let newName = 'SuperHarvester' + Game.time;
        console.log('Spawning new Super harvester', newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, {Memory: {role: 'Super Harvester'}});
       }
       return;
        }
    spawning()
}



