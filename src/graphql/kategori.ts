import { objectType, extendType, intArg, inputObjectType } from "nexus";
import { Prisma } from "@prisma/client";
import { context } from "../context";

export const Kategori = objectType({
  name: "kategori",
  definition(t) {
    t.nonNull.id("kategori_id");
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
  },
});

export const KategoriQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("kategori", {
      type: "kategori",
      args: {
        id: intArg(),
      },
      resolve(parent, args, context, info) {
        const kategori = context.prisma.kategori.findUnique({
          where: {
            kategori_id: args.id,
          },
        });
        return kategori;
      },
    });
    t.nonNull.list.nonNull.field("allKategori", {
      type: "kategori",
      resolve(parent, args, context, info) {
        const kategori = context.prisma.kategori.findMany();
        return kategori;
      },
    });
  },
});

export const KategoriInputType = inputObjectType({
  name: "KategoriInputType",
  definition(t) {
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
  },
});

export const KategoriMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createKategori", {
      type: "kategori",
      args: { input: KategoriInputType },
      resolve(parent, args, context, info) {
        const { nama, definisi } = args.input;
        const newKategori = context.prisma.kategori.create({
          data: {
            nama,
            definisi,
          },
        });
        return newKategori;
      },
    });

    t.nonNull.field("updateKategori", {
      type: "kategori",
      args: { input: KategoriInputType, id: intArg() },
      resolve(parent, args, context, info) {
        const { nama, definisi } = args.input;
        const updatedKategori = context.prisma.kategori.update({
          where: {
            kategori_id: args.id,
          },
          data: {
            nama,
            definisi,
          },
        });
        return updatedKategori;
      },
    });

    t.nullable.field("deleteKategori", {
      type: "kategori",
      args: { id: intArg() },
      resolve(parent, args, context, info) {
        const deletedKategori = context.prisma.kategori.delete({
          where: {
            kategori_id: args.id,
          },
        });;
        return deletedKategori;
      },
    });
  },
});