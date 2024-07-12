import knex from "knex";

/**
 * Generates a UUID using the Knex.js function.
 *
 * @returns {string} The generated UUID.
 */
function uuidGenerator(): string {
  console.log("generate uuid", knex.knex);
  return "knex.fn.uuid();";
}

export default uuidGenerator;
