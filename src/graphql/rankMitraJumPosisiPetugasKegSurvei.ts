import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
const moment = require("moment");

export const RankMitraPosKegSurvei = objectType({
  name: "rankMitraPosKegSurvei",
  definition(t) {
    t.nonNull.id("rankmitraposkegsurvei_id");
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
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.field("Posisi", {
      type: "posisi",
      resolve(parent, _, context) {
        return context.prisma.posisi.findUnique({
          where: { kode: parent.posisi_kd },
        });
      },
    });
    t.nonNull.string("username");
    t.nonNull.field("User", {
      type: "user",
      resolve(parent, _, context) {
        return context.prisma.user.findUnique({
          where: { username: parent.username },
        });
      },
    });
    t.nonNull.float("nilai");
  },
});

export const RankMitraPosKegSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("RankMitraPosKegSurvei", {
      type: "rankMitraPosKegSurvei",
      args: {
        id: nullable(intArg()),
        survei_kd: nullable(stringArg()),
        keg_kd: nullable(stringArg()),
        branch_kd: nullable(stringArg()),
        posisi_kd: nullable(stringArg()),
        username: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const { id, survei_kd, keg_kd, branch_kd, posisi_kd, username, tahun } = args;
        if (id) {
          return [
            context.prisma.rankMitraJumPosisiPetugasKegSurvei.findUnique({
              where: {
                rankmitraposkegsurvei_id: id,
              },
            }),
          ];
        } else {
          return context.prisma.rankMitraJumPosisiPetugasKegSurvei.findMany({
            where: {
              survei_kd,
              keg_kd,
              branch_kd,
              posisi_kd,
              username,
            },
          });
        }
      },
    });
  },
});

export const RankMitraPosKegSurveiInputType = inputObjectType({
  name: "RankMitraPosKegSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("username");
    t.nullable.float("nilai");
  },
});

export const RankMitraPosKegSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRankMitraPosKegSurvei", {
      type: "rankMitraPosKegSurvei",
      args: { input: nonNull(RankMitraPosKegSurveiInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, nilai } = args.input;
        return context.prisma.rankMitraJumPosisiPetugasKegSurvei.create({
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
            branch_kd,
            Posisi: {
              connect: {
                kode: posisi_kd,
              },
            },
            User: {
              connect: { username },
            },
            nilai,
            created_by: userName,
          },
        });
      },
    });

    t.nonNull.field("updateRankMitraPosKegSurvei", {
      type: "rankMitraPosKegSurvei",
      args: { id: nonNull(intArg()), input: nonNull(RankMitraPosKegSurveiInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const rankmitraposkegsurvei_id = args.id;
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, nilai } = args.input;
        return context.prisma.rankMitraJumPosisiPetugasKegSurvei.update({
          where: {
            rankmitraposkegsurvei_id,
          },
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
            branch_kd,
            Posisi: {
              connect: {
                kode: posisi_kd,
              },
            },
            User: {
              connect: { username },
            },
            nilai,
            updated_by: userName,
            updated_at: moment().toISOString(),
          },
        });
      },
    });
  },
});
