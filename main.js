//rewrite 
var spawnModule = require('spawnModule')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnModule = require('spawnModule');
var roleEngineer = require('role.engineer');
var structureTower = require('structure.tower');
var roleLong = require('role.long');
var roleRunner = require('role.runner');
var rolesuperHarvester = require('role.superHarvester');
var structureTower = require('structure.tower')
const allyModel = require('./allyModel');

var runners = _.filter(Game.creeps, (creep) => creep.memory.role === 'Runner');
console.log('Runners:', runners.length);
var superHarvester = _.filter(Game.creep, (creep) => creep.memory.role === 'superHarvester');
console.log('Super Harvesters:', superHarvester.length);
var Upgrader =_.filter(Game.creep, (creep) => creep.memory.role ==='Upgraders');
console.log('Upgraders:', Upgrader.length);
var Builder = _.filter(Game.creep, (creep) => creep.memory.role === 'Builder');
console.log('Builder:', Builder.length);
var Engineer = _.filter(Game.creep, (creep) => creep.memory.role === 'Engineer');
console.log('Engineer',Engineer.length);
var Long = _.filter(Game.creep, (creep) => creep.memory.role === 'Engineer');

const creeps =  Game.creeps; //Now you only need to get the creeps ONCE

for (var creep of creeps) {

  const memory = creep.memory;
  if(memory.role == "Harvester") {roleHarvester.run(creep);}
  if(memory.role == 'Upgrader') {roleUpgrader.run(creep);}
  if(memory.role == 'Builder') {roleBuilder.run(creep);}
  if(memory.role == 'Engineer') {roleEngineer.run(creep);}
  if(memory.role == 'Long') {roleLong.run(creep);}
  if(memory.role == "Runner") {roleRunner.run(creep);} //Do this for all the roles
  if(memory.role == 'superHarvester') {rolesuperHarvester.run(creep);}

  
}
function spawning(Harvester, Upgrader, Builder, Engineer, Long, Runner, superHarvesters) { //Only pass what you need until you need it

    const spawn = Game.spawns['Spawn1']; //Localize
    if (!spawn.spawning) {
      if (runners.length < 2) {
          let newName = 'Runners' + Game.time;
          console.log('Spawning new runner:', newName);
          spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'runner'}});
          return; //Only spawn one thing at a time
      } else if (superHarvesters.length < 1) {
          let newName = 'SuperHarvesters' + Game.time;
          console.log('Spawning new superHarvester:', newName);
          spawn.spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'superHarvester'}});
          return; //Only spawn one thing at a time
      } else if(Harvester.length < 2) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new Harvester:', newName);
        spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'Harvester'}});
        return;
      }else if(Upgrader.length < 2) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader:', newName);
        spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'Upgrader'}});
        return;
      }else if(Builder.length < 2) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new Upgrader:', newName);
        spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'Builder'}});
        return;
      }else if(Engineer.length < 2) {
        let newName = 'Engineer' + Game.time;
        console.log('Spawning new Engineer:', newName);
        spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'Engineer'}})
        return;
      }else if(Long.length < 4) {
        let newName = 'Long' + Game.time;
        console.log('Spawning new Ranger:' + newName);
        spawn.spawnCreep([RANGED_ATTACK, MOVE,], newName, {memory: {role: 'Long'}});
        return;
          }
      }
  }
  
spawning();
