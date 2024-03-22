import { objectType, extendType, intArg, inputObjectType } from "nexus";
import { Prisma } from "@prisma/client";
import { context } from "../context";

export const KategoriIndikator = objectType({
  name: "kategoriIndikator",
  definition(t) {
    t.nonNull.id("kategoriIndikator_id");
    t.nonNull.string("branch_kd");
    t.nonNull.id("indikator_id");
    t.nonNull.id("kategori_id");
    t.nonNull.string("bobot");
  },
});

export const KategoriIndikatorQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("kategoriIndikator", {
      type: "kategoriIndikator",
      args: {
        id: intArg(),
      },
      resolve(parent, args, context, info) {
        const kategoriIndikator = context.prisma.kategoriIndikator.findUnique({
          where: {
            kategoriIndikator_id: args.id,
          },
        });
        return kategoriIndikator;
      },
    });
    t.nonNull.list.nonNull.field("allKategoriIndikator", {
      type: "kategoriIndikator",
      resolve(parent, args, context, info) {
        const kategoriIndikator = context.prisma.kategoriIndikator.findMany();
        return kategoriIndikator;
      },
    });
  },
});

export const KategoriIndikatorInputType = inputObjectType({
  name: "KategoriIndikatorInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.id("indikator_id");
    t.nonNull.id("kategori_id");
    t.nonNull.string("bobot");
  },
});

export const KategoriIndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createKategoriIndikator", {
      type: "kategoriIndikator",
      args: { input: KategoriIndikatorInputType },
      resolve(parent, args, context, info) {
        const { branch_kd, indikator_id, kategori_id, bobot } = args.input;
        const newKategoriIndikator = context.prisma.KategoriIndikator.create({
          data: {
            branch_kd,
            indikator_id,
            kategori_id,
            bobot,
          },
        });
        return newKategoriIndikator;
      },
    });

    t.nonNull.field("updateIndikator", {
      type: "kategoriIndikator",
      args: { input: KategoriIndikatorInputType, id: intArg() },
      resolve(parent, args, context, info) {
        const { branch_kd, indikator_id, kategori_id, bobot } = args.input;
        const updatedKategoriIndikator = context.prisma.kategoriIndikator.update({
          where: {
            kategoriIndikator_id: args.id,
          },
          data: {
            branch_kd,
            indikator_id,
            kategori_id,
            bobot,
          },
        });
        return updatedKategoriIndikator;
      },
    });

    t.nullable.field("deleteKategoriIndikator", {
      type: "kategoriIndikator",
      args: { id: intArg() },
      resolve(parent, args, context, info) {
        const deletedKategoriIndikator = context.prisma.kategoriIndikator.delete({
          where: {
            kategoriIndikator_id: args.id,
          },
        });
        return deletedKategoriIndikator;
      },
    });
  },
});
