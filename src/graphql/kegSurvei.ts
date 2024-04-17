import { objectType, extendType, intArg, nonNull, nullable, stringArg, inputObjectType } from "nexus";
import { Survei, SurveiInputType } from "./survei";
import { Kegiatan } from "./kegiatan";

export const KegSurvei = objectType({
  name: "kegSurvei",
  definition(t) {
    t.nonNull.id("kegsurvei_id");
    t.nonNull.string("survei_kd");
    t.nonNull.field({ name: "Survei", type: "survei" });
    t.nonNull.string("keg_kd");
    t.nonNull.field({ name: "Kegiatan", type: "kegiatan" });
    t.nonNull.int("status");
    t.nullable.dateTime("tgl_buka");
    t.nullable.dateTime("tgl_rek_mulai");
    t.nullable.dateTime("tgl_rek_selesai");
    t.nullable.dateTime("tgl_mulai");
    t.nullable.dateTime("tgl_selesai");
    t.nullable.int("is_rekrutmen");
    t.nullable.int("is_multi");
    t.nullable.boolean("is_confirm");
    t.nullable.boolean("is_add_indicator");
  },
});

export const KegSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("KegSurvei", {
      type: "kegSurvei",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.kegSurvei.findUnique({
              where: {
                kegsurvei_id: args.id,
              },
		include: {
            Survei: true,
            Kegiatan: true,
          },
            }),
          ];
        } else {
          return context.prisma.kegSurvei.findMany({
include: {
            Survei: true,
            Kegiatan: true,
          },
});
        }
      },
    });
  },
});

export const KegSurveiInputType = inputObjectType({
  name: "KegSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.int("status");
    t.nullable.dateTime("tgl_buka");
    t.nullable.dateTime("tgl_rek_mulai");
    t.nullable.dateTime("tgl_rek_selesai");
    t.nullable.dateTime("tgl_mulai");
    t.nullable.dateTime("tgl_selesai");
    t.nullable.int("is_rekrutmen");
    t.nullable.int("is_multi");
    t.nullable.boolean("is_confirm");
    t.nullable.boolean("is_add_indicator");
  },
});

export const KegSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createKegSurvei", {
      type: "kegSurvei",
      args: { input: nonNull(KegSurveiInputType), survei: nullable(SurveiInputType) },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, status, tgl_buka, tgl_rek_mulai, tgl_rek_selesai, tgl_mulai, tgl_selesai, is_rekrutmen, is_multi, is_confirm, is_add_indicator } = args.input;
        const { kode, nama, tahun, tipe, unit_kd } = args.survei;
        return context.prisma.kegSurvei.create({
          data: {
            Survei: {
              connectOrCreate: {
                where: { kode: survei_kd },
                create: { kode, nama, tahun, tipe, unit_kd, created_by: username },
              },
            },
            Kegiatan: {
              connect: {
                kode: keg_kd,
              },
            },
            status,
            tgl_buka,
            tgl_rek_mulai,
            tgl_rek_selesai,
            tgl_mulai,
            tgl_selesai,
            is_rekrutmen,
            is_multi,
            is_confirm,
            is_add_indicator,
            created_by: username,
          },
          include: {
            Survei: true,
            Kegiatan: true,
          },
        });
      },
    });
  },
});
