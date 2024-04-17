import { objectType, extendType, intArg, inputObjectType, nonNull, nullable, list, stringArg } from "nexus";
import { prisma } from "../context";

export const Posisi = objectType({
  name: "posisi",
  definition(t) {
    t.nonNull.id("posisi_id");
    t.nonNull.string("kode");
    t.nonNull.string("nama");
    t.nonNull.string("deskripsi");
    t.nonNull.int("status");
  },
});

export const PosisiQuery = extendType({
    type: "Query",
    definition(t) {
      t.nonNull.list.nullable.field("Posisi", {
        type: "posisi",
        args: {
          kode: nullable(stringArg()),
        },
        resolve(parent, args, context) {
          if (args.kode) {
            return [context.prisma.posisi.findUnique({
              where: {
                kode: args.kode,
              },
            })];
          } else {
            return context.prisma.posisi.findMany();
          }
        },
      });
    },
  });

  export const PosisiMutation = extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("createPosisi", {
        type: "posisi",
        args: {
          kode: nonNull(stringArg()),
          nama: nonNull(stringArg()),
          deskripsi: nonNull(stringArg()),
          status: nonNull(intArg()),
        },
        resolve(parent, args, context) {
          const { username } = context;
          if (!username) {
            throw new Error("Cannot post without logging in.");
          }
          const { kode, nama, deskripsi, status } = args;
          return context.prisma.posisi.create({
            data: { kode, nama, deskripsi, status, created_by: username},
          });
        },
      });
    },
  });
  