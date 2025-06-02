var rolesuperHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Check if the creep is carrying energy
        if (creep.store.getFreeCapacity() > 0) {
            // Find all energy sources
            const sources = creep.room.find(FIND_SOURCES);
            // Sort sources by distance to the creep
            const availableSources = sources.filter(source => {
                return !source.pos.findInRange(FIND_CREEPS, 1, {
                    filter: (otherCreep) => otherCreep.id !== creep.id && otherCreep.memory.role === 'harvester'}).length; // Check if the source is not being mined by another harvester
            });

            if (availableSources.length > 0) {
                const closestSource = creep.pos.findClosestByPath(availableSources);
                if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else {
            // If the creep is carrying energy, find the closest container to the last harvested source
            const lastSource = creep.memory.lastSource; // Store the last harvested source in memory
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_STORAGE &&
                                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if (lastSource && containers.length > 0) {
                const closestContainer = creep.pos.findClosestByPath(containers);
                if (creep.transfer(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // Fallback to spawner or extensions if no containers are available
                const spawner = creep.room.find(FIND_MY_SPAWNS)[0];
                if (spawner && spawner.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if (creep.transfer(spawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawner, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    const extension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: structure => structure.structureType === STRUCTURE_EXTENSION &&
                                             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    });

                    if (extension) {
                        if (creep.transfer(extension, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(extension, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
        }

        // Update the last harvested source in memory
                  const closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (closestSource) {
                          creep.memory.lastSource = closestSource.id;
        } else {
  // Handle the case where no valid source was found
              console.log('No valid source found for creep:', creep.name);
            }

    }
};

module.exports = roleSuperharvester;
