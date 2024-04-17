import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
const moment = require('moment');

export const RankMitraTahunKerja = objectType({
  name: "rankMitraTahunKerja",
  definition(t) {
    t.nonNull.id("rankmitratahunkerja_id");
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
    t.nonNull.string("tahun");
    t.nonNull.float("nilai");
  },
});

export const RankMitraTahunKerjaQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("RankMitraTahunKerja", {
      type: "rankMitraTahunKerja",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.rankMitraTahunKerja.findUnique({
              where: {
                rankmitratahunkerja_id: args.id,
              },
            }),
          ];
        } else {
          return context.prisma.rankMitraTahunKerja.findMany();
        }
      },
    });
  },
});

export const RankMitraTahunKerjaInputType = inputObjectType({
  name: "RankMitraTahunKerjaInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("username");
    t.nonNull.string("tahun");
    t.nullable.float("nilai");
  },
});

export const RankMitraTahunKerjaMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRankMitraTahunKerja", {
      type: "rankMitraTahunKerja",
      args: { input: nonNull(RankMitraTahunKerjaInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, nilai, tahun } = args.input;
        return context.prisma.rankMitraTahunKerja.create({
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
            tahun,
            nilai,
            created_by: userName,
          },
        });
      },
    });

    t.nonNull.field("updateRankMitraTahunKerja", {
      type: "rankMitraTahunKerja",
      args: { id: nonNull(intArg()), input: nonNull(RankMitraTahunKerjaInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const rankmitratahunkerja_id = args.id;
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, nilai, tahun } = args.input;
        return context.prisma.rankMitraTahunKerja.update({
          where: {
            rankmitratahunkerja_id,
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
            tahun,
            nilai,
            updated_by: userName,
            updated_at: moment().toISOString(),
          },
        });
      },
    });
  },
});
