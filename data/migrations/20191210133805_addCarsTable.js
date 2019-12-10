exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl
      .integer("VIN")
      .notNullable()
      .unique()
      .index();

    tbl.string("make", 20).notNullable();

    tbl.string("model", 20).notNullable();

    tbl.integer("mileage").notNullable();

    tbl.string("transmission_type", 20);

    tbl.string("title_status", 10);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
