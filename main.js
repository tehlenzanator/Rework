//rewrite 
//Runners are the only thing moving and spawning 
var spawnModule = require('spawnModule')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnModule = require('spawnModule');
var roleEngineer = require('role.engineer');
var structureTower = require('structure.tower');
var roleLong = require('role.long');
var roleRunner = require('role.runner');
var roleSuperHarvester = require('role.superHarvester');
var structureTower = require('structure.tower')
const allyModel = require('./allyModel');

module.exports.loop = function () {
var harvester = _.filter(Game.creeps, (creep) => creep.memory.role === 'Harvester');
console.log('Harvester:', harvester.length)
var runners = _.filter(Game.creeps, (creep) => creep.memory.role === 'Runner');
console.log('Runners:', runners.length);
var superHarvester = _.filter(Game.creep, (creep) => creep.memory.role === 'superHarvester');
console.log('Super Harvesters:', superHarvester.length);
var Upgrader =_.filter(Game.creep, (creep) => creep.memory.role ==='Upgrader');
console.log('Upgraders:', Upgrader.length);
var Builder = _.filter(Game.creep, (creep) => creep.memory.role === 'Builder');
console.log('Builder:', Builder.length);
var Engineer = _.filter(Game.creep, (creep) => creep.memory.role === 'Engineer');
console.log('Engineer',Engineer.length);
var Long = _.filter(Game.creep, (creep) => creep.memory.role === 'Long');

for (var creep of Object.values(Game.creeps)) {
 var memory = creep.memory;
  if(memory.role == "Harvester") {roleHarvester.run(creep);}
  else if(memory.role == 'Upgrader') {roleUpgrader.run(creep);}
  else if(memory.role == 'Builder') {roleBuilder.run(creep);}
  else if(memory.role == 'Engineer') {roleEngineer.run(creep);}
  else if(memory.role == 'Long') {roleLong.run(creep);}
  else if(memory.role == "Runner") {roleRunner.run(creep);} //Do this for all the roles
  else if(memory.role == 'superHarvester') {roleSuperHarvester.run(creep);}
  }
}
  spawning(Runner, superHarvester, harvester, Upgrader, Builder, Engineer, Long)

function spawning(runners , superHarvester, harvester, Upgrader, Builder, Engineer, Long) {
    const spawn = Game.spawns['Spawn1'];
    let totalRunners = runners.length; 
    let totalSuperHarvesters = superHarvester.length;
    let totalHarvesters = harvester.length; 
    let totalUpgraders = Upgrader.length;
    let totalbuilders = Builder.length; 
    let totalEngineers = Engineer.length;
    let totalLongs = Long.length;

    if (!spawn.spawning) {
        if (totalRunners < 2) {
            let newName = 'Runner' + Game.time;
            console.log('Spawning new runner:', newName);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'Runner' } });
            return;
        } 
        else if (totalSuperHarvesters < 1) {
            let newName = 'SuperHarvester' + Game.time;
            console.log('Spawning new superHarvester:', newName);
            spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'superHarvester' } });
            return;
        }
        else if (totalHarvesters < 4) {
            let newName = 'Harvester' + Game.time;
            console.log('Spawning new Harvester:', newName);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'Harvester' } });
            return;
        }
        else if (totalUpgraders < 2) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader:', newName);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'Upgrader' } });
            return;
        }
        else if (totalbuilders < 2) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new Builder:', newName);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'Builder' } });
            return;
        }
        else if (totalEngineers < 2) {
            let newName = 'Engineer' + Game.time;
            console.log('Spawning new Engineer:', newName);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'Engineer' } });
            return;
        }
        else if (totalLongs < 4) {
            let newName = 'Long' + Game.time;
            console.log('Spawning new Long:', newName);
            spawn.spawnCreep([RANGED_ATTACK, MOVE], newName, { memory: { role: 'Long' } });
            return;
        }
     }
   }
