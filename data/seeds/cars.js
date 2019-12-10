exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          Vin: "12345678912345678",
          Make: "Honda",
          Model: "Civic",
          Mileage: 10000,
          transmission_type: "Manual",
          Title_status: "clean"
        },
        {
          Vin: "11111111111111111",
          Make: "Nissan",
          Model: "Sentra",
          Mileage: 5000,
          transmission_type: "Automatic",
          Title_status: "salvaged"
        },
        {
          Vin: "22222222222222222",
          Make: "Toyota",
          Model: "Camry",
          Mileage: 103,
          transmission_type: "Automatic",
          Title_status: "clean"
        }
      ]);
    });
};
