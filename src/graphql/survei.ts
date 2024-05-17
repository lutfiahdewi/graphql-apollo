import { objectType, extendType, intArg, inputObjectType, nonNull, nullable, list, stringArg } from "nexus";
import { prisma } from "../context";

export const Survei = objectType({
  name: "survei",
  definition(t) {
    t.nonNull.id("survei_id");
    t.nonNull.string("kode");
    t.nonNull.string("nama");
    t.nonNull.string("tahun");
    t.nonNull.int("tipe");
    t.nullable.string("unit_kd");
  },
});

export const SurveiInputType = inputObjectType({
  name: "SurveiInputType",
  definition(t) {
    t.nonNull.string("kode");
    t.nonNull.string("nama");
    t.nonNull.string("tahun");
    t.nonNull.int("tipe");
    t.nullable.string("unit_kd");
  },
});

export const SurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("Survei", {
      type: "survei",
      args: {
        kode: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        if (args.kode) {
          let temp: any[] = [];
          temp.push = context.prisma.survei.findUnique({
            where: {
              kode: args.kode,
            },
          });
          return temp;
        }
        return context.prisma.survei.findMany();
      },
    });
  },
});

export const SurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createSurvei", {
      type: "survei",
      args: { input: nonNull(SurveiInputType) },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { kode, nama, tahun, tipe, unit_kd } = args.input;
        return context.prisma.survei.create({
          data: { kode, nama, tahun, tipe, unit_kd, created_by: username },
        });
      },
    });
    t.nonNull.field("deleteSurvei", {
      type: "survei",
      args: {
        id: nullable(intArg()),
        kode: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot delete without logging in.");
        }
        const { id, kode } = args;
        return context.prisma.survei.delete({
          where: {
            survei_id: id,
          },
        });
      },
    });
  },
});
