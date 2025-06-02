spawnModule.exports.loop = function() {
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnModule = require('spawnModule');
var roleEngineer = require('role.engineer');
var structureTower = require('structure.tower');
var roleLong = require('role.long');
var roleRunner = require('role.runner');
const allyModel = require('./allyModel');
   
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
var runners =_.filter(Game.creeps, (creep) => creep.memory.role == 'runner');
    console.log('runner: ' + runner.length);
var superHarvester=_.filter(Game.creeps, (creep) => creep.memory.role == 'superHarvester');
    console.log('superHarvesters: ' + superHarvester.length);
}
creeps();

function creeps(creep, role) {
    switch(role) {
        case "harvester":
        if(harvesters.length < 4) {
               Game.spawns['spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester' + '_' + Game.time, {
              memory: { role: 'harvester' }
            });
        }
        break;
        case "superHarvester":
            if(superHarvester.length < 2) {
                Game.spawns['spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], 'superHarvester' + '_' + Game.time, {
                memory: { role: 'superHarvester' }
            });
            
                
            }
        break;
        case "engineer":
            if(engineers.length < 2) {
                Game.spawns['spawn1'].spawnCreep([WORK, CARRY, MOVE], 'engineer' + '_' + Game.time, {
                    memory: {role: 'engineer'}
                });

        }
        break;
        case "upgraders":
            if(upgraders.length < 2) {
                Game.spawns['spawn1'].spawnCreep([WORK, CARRY, MOVE], 'upgraders' + '_' + Game.time, {
            memory: {role: 'upgraders'}
                });
                
        }
        break;
        case "runner":
            if(runners.length < 2) {
                Game.spawns['spawn1'].spawnCreep([WORK, CARRY, MOVE], 'runner' + '_' + Game.time, {
                    memory: {role: 'runner'}
                
                });
            }
            break;
        default:
    console.log(`Unknown role: ${role}. Check your creep assignment logic.`);
            }

        

        }



function setHarvesters (creep, deposits) {
	for (var deposit in deposits) {
    if (deposit.availableEnergy > 0) {
      if (creep.pos.getRangeTo(deposit) <= 1) {
            creep.harvest(deposit);
      } else {
				creep.moveTo(deposit);
			}
    }
  }  
}
function setEngineer(creep, repairs) {
    for(var repair in repairs) {
        
    }

}


function setCreeps (creeps, role) {

    for (var creep in creeps) {

    	let role = creep.memory.role; //Set at spawn
      
      switch (role) {
        case "harvester":
				setHarvester(creep, deposits);
                break;
        case "engineer":
                setEngineer(creep, repair)
                break;
        case "builder":
                setBuilder(creep, storage)
                break;
        case "runner":
                setRunner(creep, storage)
                break;
        case "upgrader":
                setUpgrader(creep, storage)
                break;
        case "Long":
                setLong(creep, defense)
                break;
        case "superHarvester":
                setSuperHarvester(creep,deposits)
                break;
        default: false
				

      }
    }
}
function GetCreeps (spawn,creeps) {


}
function setCreeps(creeps, deposits) {

}

Main() = {

//Function to get creeps, NEEDS TO BE WRITTEN
//var creeps = getCreeps();
//Function to get deposits, NEEDS TO BE WRITTEN
//var deposits = getDeposits();

}
