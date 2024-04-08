import { objectType, extendType, intArg, inputObjectType, nonNull } from "nexus";
import { Prisma } from "@prisma/client";
import { context, prisma } from "../context";

export const Kategori = objectType({
  name: "kategori",
  definition(t) {
    t.nonNull.id("kategori_id");
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
  },
});
export const KategoriNested = objectType({
  name: "kategoriNested",
  definition(t) {
    t.nonNull.id("kategori_id");
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
    t.nonNull.list.nullable.field("KategoriIndikator", {
      type: "kategoriIndikatorNested",
      resolve(parent, _args, context) {
        const temp = context.prisma.kategoriIndikator.findMany({
          where: { kategori_id: parent.kategori_id },
          include: { indikator: true },
        });
        return temp;
      },
    });
  },
});

const created_by = "admin";
export const KategoriQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("Kategori", {
      type: "kategoriNested",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        return context.prisma.kategori.findUnique({
          where: {
            kategori_id: args.id,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("allKategori", {
      type: "kategori",
      resolve(parent, args, context, info) {
        const { userId } = context;

        if (!userId) {
          // 1
          throw new Error("Cannot post without logging in.");
        }
        return context.prisma.kategori.findMany();
      },
    });
    t.nonNull.list.nonNull.field("allKategoriNested", {
      type: "kategoriNested",
      resolve(parent, args, context, info) {
        return context.prisma.kategori.findMany();
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
      args: { input: nonNull(KategoriInputType) },
      resolve(parent, args, context, info) {
        const { nama, definisi } = args.input;
        const newKategori = context.prisma.kategori.create({
          data: {
            nama,
            definisi,
            created_by,
          },
        });
        return newKategori;
      },
    });

    t.nonNull.field("updateKategori", {
      type: "kategori",
      args: { input: nonNull(KategoriInputType), id: nonNull(intArg()) },
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
      args: { id: nonNull(intArg()) },
      resolve(parent, args, context, info) {
        const deletedKategori = context.prisma.kategori.delete({
          where: {
            kategori_id: args.id,
          },
        });
        return deletedKategori;
      },
    });
  },
});
