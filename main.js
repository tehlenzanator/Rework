module.exports.run = function(spawn) {
    const registry = { 
        harvester: require('role.harvester'),
        upgrader: require('role.upgrader'),
        builder: require('role.builder'),
        engineer: require('role.engineer'),
        long: require('role.long'),
        runner: require('role.runner')
    }
    module.exports = registry;
    const roles = require('roleRegistry');
    for(let name in Game.creeps) { 
        const creep = Game.creeps[name];
        roles[creep.memory.role].run(creep)

    }
    const roleConfig = { 
        'harvester': { 
            min: 2,
            role: 'harvester',
            body: [WORK, CARRY, MOVE]
        },
        'upgrader': { 
            min: 2,
            role: 'upgrader',
            body: [WORK, CARRY, MOVE]
        },
        'builder': { 
            min: 2,
            role: 'builder',
            body: [WORK, CARRY, MOVE]

        },
        'engineer': { 
            min: 2,
            role: 'engineer',
            body: [WORK, CARRY, MOVE]

        },
        'long': {
            min: 1,
            role: 'long',
            body: [RANGED_ATTACK, RANGED_ATTACK, MOVE, TOUGH, TOUGH]
        },
        'runner': {
            min: 2,
            role: 'runner',
            body: [WORK, CARRY, MOVE]

        }
    }
    function population(spawn) {
        for(let roleName in roleConfig) {
            const config = roleConfig[roleName];
        }
        const currentCreeps =_.filter(Game.creeps, (creep) => 
        creep.memory.role === config.role)

        if(currentCreeps.length < config.min) {
            spawn.spawncreep(conig.body, '${config.role_${Game.time}', {
                memory: {role: config.role }
            });
        }
    }
    population(spawn)
}
