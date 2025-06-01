const { prisma } = require("./utils/prismaExport");
async function main() {
  /*
add the following employees to the database
all with role = admin 
keep this scema in mind model Employee {
  id           Int               @id @default(autoincrement()) 
  firstName    String
  lastName     String
  role         String
  names 
  1.Marwan Zahran
  2.Omar Hussain
  3.Sara Ahmed
  4.Yassmin Mohamed
  5.Alaa Fawzy
  6.Sara Ahmed
  7.Jana Sameh
8.Yasmina Hamdy

  */
  const employees = await prisma.employee.createMany({
    data: [
      {
        firstName: "Marwan",
        lastName: "Zahran",
        role: "admin",
      },
      {
        firstName: "Omar",
        lastName: "Hussain",
        role: "admin",
      },
      {
        firstName: "Sara",
        lastName: "Ahmed",
        role: "admin",
      },
      {
        firstName: "Yassmin",
        lastName: "Mohamed",
        role: "admin",
      },
      {
        firstName: "Alaa",
        lastName: "Fawzy",
        role: "admin",
      },
      {
        firstName: "Jana",
        lastName: "Sameh",
        role: "admin",
      },
      {
        firstName: "Yasmina",
        lastName: "Hamdy",
        role: "admin",
      },
    ],
  });
  console.table(employees);
  //await prisma.employee.deleteMany({});
}

main();
