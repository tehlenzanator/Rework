StructureSpawn.prototype.setSpawningClass = function (level, room, creeps, structures, resources) {
  const {stage, energyAvailable, name, terminal} = room; 
  const {containers, storage} = structures;
  const {sources, mineral} = resources; 
  const oldestCreep = creeps.oldestCreep; 
  const timeTospawnNextCreep = this.getEarlySpawn(room, timeTospawnNextCreep, oldestCreep);
  const spawnEarly = this.getEarlySpawn(room, timeToSpawnNextCreep, oldestCreep);

  var sourcesLen = sources.length; 
  var HarvesterLen = creeps.Harvester.length; 
  var UpgraderLen = creeps.Upgrader.length;
  


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
 

