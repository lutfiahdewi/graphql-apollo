import { booleanArg, extendType, nonNull, nullable, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "user",
  definition(t) {
    t.nonNull.id("user_id");
    t.nonNull.string("username");
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
  },
});

/*
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("creatUser", {
      type: "user",
      args: { username: nonNull(stringArg()), email: nonNull(stringArg()), password: nonNull(stringArg()), is_pegawai: nullable(booleanArg()) },
      resolve(parent, args, context, info) {
        const { username, email, password, is_pegawai } = args;
        return context.prisma.user.create({
          data: {
            username,
            email,
            password,
            is_pegawai,
            created_by: username,
          },
        });
      },
    });

    //update delete
  },
});*/
