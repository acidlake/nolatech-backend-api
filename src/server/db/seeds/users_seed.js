const bcrypt = require("bcryptjs");

const password = "thepassword123#$";
const hash = bcrypt.hashSync(password, 10);
const today = new Date();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: knex.fn.uuid(),
      firstName: "Juan",
      lastName: "Perez Santana",
      username: "juanperez",
      email: "juanperez@nolatech.com",
      passwordHash: hash,
      status: "ACTIVE",
      created_at: today,
      updated_at: today,
    },
    {
      id: knex.fn.uuid(),
      firstName: "Jhon",
      lastName: "doe",
      username: "doejhon",
      passwordHash: hash,
      email: "jhondoe@nolatech.com",
      status: "DELETED",
      created_at: today,
      updated_at: today,
    },
    {
      id: knex.fn.uuid(),
      firstName: "Demo",
      lastName: "User",
      username: "demouser",
      email: "demouser@nolatech.com",
      passwordHash: hash,
      status: "INACTIVE",
      created_at: today,
      updated_at: today,
    },
  ]);
};
