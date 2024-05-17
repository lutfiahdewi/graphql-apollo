import { objectType, extendType, stringArg, nonNull, nullable, intArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// import { APP_SECRET } from "../utils/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "user",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        // 1
        const user = await context.prisma.user.findUnique({
          where: { email: args.email },
        });
        if (!user) {
          throw new Error("No such user found");
        }

        // 2
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error("Invalid password");
        }

        // 3
        const token = jwt.sign({ userId: user.user_id, username: user.username }, process.env.APP_SECRET || "");

        // 4
        return {
          token,
          user,
        };
      },
    });

    t.nonNull.field("signup", {
      // 1
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        username: nonNull(stringArg()),
        nama: nonNull(stringArg()),
        is_pegawai: nonNull(intArg()),
        role_id: nonNull(intArg()),
        tahun: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { email, username, nama, role_id, tahun } = args;
        const is_pegawai = args.is_pegawai || 0;
        // 2
        const password = await bcrypt.hash(args.password, 10);

        // 3
        const user = await context.prisma.user.create({
          data: {
            email,
            username,
            password,
            is_pegawai,
            nama,
            created_by: username,
          },
        });
        const userRole = await context.prisma.userRole.create({
          data: {
            user: {
              connect: { username },
            },
            role_id,
            status: 1,
            created_by: username,
          },
        });
        let mitraTahunKerja;
        if (is_pegawai != 1) {
          mitraTahunKerja = await context.prisma.mitraTahunKerja.create({
            data: {
              branch_kd: "0123ABC",
              User: {
                connect: { username },
              },
              tahun,
              status: 1,
              created_by: username,
            },
          });
        }
        
        const userNested = await context.prisma.user.findUnique({
          where: {
            username: userRole.username,
          },
          include: {
            UserRole: true,
            MitraTahunKerja: true,
          },
        });

        // 4
        const token = jwt.sign({ userId: user.user_id, username: user.username }, process.env.APP_SECRET || "");

        // 5
        return {
          token,
          user: userNested,
        };
      },
    });
  },
});
