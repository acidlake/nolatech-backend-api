/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.string("firstName").notNullable();
    table.string("lastName").nullable();
    table.string("username").notNullable().unique();
    table.string("passwordHash").notNullable();
    table.enu("column", ["ACTIVE", "DELETED"], {
      useNative: true,
      enumName: "status",
    });
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
