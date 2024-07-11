const knex = require("knex");

/**
 * Generates a UUID using the Knex.js function.
 *
 * @returns {string} The generated UUID.
 */
function uuidGenerator(): string {
  return knex.fn.uuid();
}

export default uuidGenerator;
