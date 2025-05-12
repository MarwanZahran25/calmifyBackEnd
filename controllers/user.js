const { prisma } = require("../utils/prismaExport");
const verify = require("../utils/auth");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,

        employee: {
          connect: {
            id: req.body.employeeId,
          },
        },
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    const login = await prisma.login.create({
      data: {
        employee: {
          connect: {
            id: user.employeeId,
          },
        },
      },
    });

    res.json({ token, time: login.time });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
}
async function logOut(req, res) {
  const lastLogIn = await prisma.login.findFirst({
    where: { employeeId: req.user.employeeId },
    orderBy: {
      time: "desc",
    },
  });
  const loginTime = new Date(lastLogIn.time);
  const logoutTime = new Date();
  const durationMs = logoutTime.getTime() - loginTime.getTime();

  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const productivity = await prisma.productivity.create({
    data: {
      durationHrs: durationHours,
      employee: {
        connect: {
          id: req.user.employeeId,
        },
      },
    },
  });
  res.json({ productivity });
}
async function employeeInfo(req, res) {
  const employee = await prisma.employee.findUnique({
    where: {
      id: req.user.employeeId,
    },
    include: {
      user: true,
    },
  });
  res.json(employee);
}

module.exports = { signUp, logIn, logOut, employeeInfo };
