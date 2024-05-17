import { booleanArg, extendType, nonNull, nullable, objectType, stringArg } from "nexus";
import { prisma } from "../context";

export const User = objectType({
  name: "user",
  definition(t) {
    t.nonNull.id("user_id");
    t.nonNull.string("username");
    t.nullable.string("nama");
    t.nonNull.string("email");
    // t.nonNull.string("password");
    t.nullable.boolean("is_pegawai");
    t.nullable.list.nullable.field("UserRole", {
      type: "userRole",
      resolve(parent, args, context) {
        return context.prisma.userRole.findMany({
          where: {
            username: parent.username,
          },
        });
      },
    });
    t.nullable.list.nullable.field("MitraTahunKerja", {
      type: "mitraTahunKerja",
      resolve(parent, args, context) {
        return context.prisma.mitraTahunKerja.findMany({
          where: {
            username: parent.username,
          },
        });
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("profile", {
      type: "user",
      resolve(parent, args, context, info) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot get profile without logging in.");
        }
        return prisma.user.findUnique({
          where: {
            username,
          },
        });
      },
    });
  },
});
