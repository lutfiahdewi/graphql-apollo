import { objectType, extendType, intArg, nonNull, nullable, list, stringArg } from "nexus";
import { prisma } from "../context";

export const Kegiatan = objectType({
  name: "kegiatan",
  definition(t) {
    t.nonNull.id("kegiatan_id");
    t.nonNull.string("kode");
    t.nonNull.string("nama");
    t.nonNull.string("deskripsi");
    t.nonNull.int("status");
  },
});

export const KegiatanQuery = extendType({
    type: "Query",
    definition(t) {
      t.nonNull.list.nullable.field("Kegiatan", {
        type: "kegiatan",
        args: {
          kode: nullable(stringArg()),
        },
        resolve(parent, args, context) {
          if (args.kode) {
            return [context.prisma.kegiatan.findUnique({
              where: {
                kode: args.kode,
              },
            })];
          } else {
            return context.prisma.kegiatan.findMany();
          }
        },
      });
    },
  });

  export const KegiatanMutation = extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("createKegiatan", {
        type: "kegiatan",
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
          const data = context.prisma.kegiatan.create({
            data: { kode, nama, deskripsi, status, created_by: username},
          });
          return data;
        },
      });
    },
  });
