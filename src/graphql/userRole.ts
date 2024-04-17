import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { User } from "./user";

export const UserRole = objectType({
  name: "userRole",
  definition(t) {
    t.nonNull.id("user_role_id");
    // t.nullable.field({name: "user", type:"user"});
    t.nullable.string("username");
    t.nonNull.int("role_id");
    t.nullable.int("status");
  },
});

export const queryUserRole = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUserRole", {
      type: "userRole",
      args: { username: nonNull(stringArg()), role_id: nonNull(intArg()), status: nonNull(intArg()) },
      resolve(parent, args, context, info) {
        const { username, role_id, status } = args.input;
        return context.prisma.userRole.create({
          data: {
            username,
            role_id,
            status,
          },
          user: {
            connect: {
              username,
            },
          },
        });
      },
    });
  },
});
