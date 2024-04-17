import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";

export const PosKegSurvei = objectType({
  name: "posKegSurvei",
  definition(t) {
    t.nonNull.id("poskegsurvei_id");
    t.nonNull.string("survei_kd");
    t.nonNull.field("Survei", {
      type: "survei",
      resolve(parent, _, context) {
        return context.prisma.survei.findUnique({
          where: { kode: parent.survei_kd },
        });
      },
    });
    t.nonNull.string("keg_kd");
    t.nonNull.field("Kegiatan", {
      type: "kegiatan",
      resolve(parent, _, context) {
        return context.prisma.kegiatan.findUnique({
          where: { kode: parent.keg_kd },
        });
      },
    });
    t.nonNull.string("posisi_kd");
    t.nonNull.field("Posisi", {
      type: "posisi",
      resolve(parent, _, context) {
        return context.prisma.posisi.findUnique({
          where: { kode: parent.posisi_kd },
        });
      },
    });
    t.nullable.int("urutan");
    t.nullable.int("is_view_mitra");
    t.nullable.int("is_multi");
  },
});

export const PosKegSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("PosKegSurvei", {
      type: "posKegSurvei",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [context.prisma.posKegSurvei.findUnique({
            where: {
              poskegsurvei_id: args.id,
            },
          })];
        } else {
          return context.prisma.posKegSurvei.findMany();
        }
      },
    });
  },
});

export const PosKegSurveiInputType = inputObjectType({
  name: "PosKegSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("posisi_kd");
    t.nullable.int("urutan");
    t.nullable.int("is_view_mitra");
    t.nullable.int("is_multi");
  },
});

export const PosKegSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPosKegSurvei", {
      type: "posKegSurvei",
      args: { input: nonNull(PosKegSurveiInputType) },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, urutan, is_view_mitra, is_multi } = args.input;
        return context.prisma.posKegSurvei.create({
          data: {
            Survei: {
              connect: {
                kode: survei_kd,
              },
            },
            Kegiatan: {
              connect: {
                kode: keg_kd,
              },
            },
            Posisi: {
              connect: {
                kode: posisi_kd,
              },
            },
            urutan,
            is_view_mitra,
            is_multi,
            created_by: username,
          },
        });
      },
    });
  },
});
