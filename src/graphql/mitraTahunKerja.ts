import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";

export const MitraTahunKerja = objectType({
  name: "mitraTahunKerja",
  definition(t) {
    t.nonNull.id("mitratahunkerja_id");
    t.nonNull.string("branch_kd");
    t.nonNull.string("username");
    t.nonNull.field("User", {
      type: "user",
      resolve(parent, _, context) {
        return context.prisma.user.findUnique({
          where: { username: parent.username },
        });
      },
    });
    t.nonNull.string("tahun");
    t.nonNull.int("status");
  },
});

export const MitraTahunKerjaQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("MitraTahunKerja", {
      type: "mitraTahunKerja",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.mitraTahunKerja.findUnique({
              where: {
                mitratahunkerja_id: args.id,
              },
            }),
          ];
        } else {
          return context.prisma.mitraTahunKerja.findMany();
        }
      },
    });
  },
});

export const MitraTahunKerjaInputType = inputObjectType({
  name: "MitraTahunKerjaInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.string("username");
    t.nonNull.string("tahun");
    t.nonNull.int("status");
  },
});


export const MitraTahunKerjaMutation = extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("createMitraTahunKerja", {
        type: "mitraTahunKerja",
        args: { input: nonNull(MitraTahunKerjaInputType) },
        resolve(parent, args, context) {
          const { username: userName } = context;
          if (!userName) {
            throw new Error("Cannot post without logging in.");
          }
          const { branch_kd, username, tahun, status } = args.input;
          return context.prisma.mitraTahunKerja.create({
            data: {
              branch_kd,
              User: {
                connect: { username },
              },
              tahun,
              status,
              created_by: userName,
            },
          });
        },
      });
    },
  });
  