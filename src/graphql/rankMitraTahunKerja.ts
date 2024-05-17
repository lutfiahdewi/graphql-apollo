import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
const moment = require("moment");

export const RankMitraTahunKerja = objectType({
  name: "rankMitraTahunKerja",
  definition(t) {
    t.nonNull.id("rankmitratahunkerja_id");
    t.nonNull.string("branch_kd");
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
    t.nonNull.string("kategori_id");
    t.nonNull.field("kategori", {
      type: "kategori",
      resolve(parent, _, context) {
        return context.prisma.user.findUnique({
          where: { kategori_id: parent.kategori_id },
        });
      },
    });
    t.nonNull.dateTime("created_at");
    t.nullable.dateTime("updated_at");
  },
});

export const RankMitraTahunKerjaQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("RankMitraTahunKerja", {
      type: "rankMitraTahunKerja",
      args: {
        id: nullable(intArg()),
        branch_kd: nullable(stringArg()),
        username: nullable(stringArg()),
        tahun: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const { id, branch_kd, username, tahun } = args;
        if (id) {
          return [
            context.prisma.rankMitraTahunKerja.findUnique({
              where: {
                rankmitratahunkerja_id: args.id,
              },
            }),
          ];
        } else if (branch_kd || username || tahun) {
          return context.prisma.rankMitraTahunKerja.findMany({
            where: {
              branch_kd,
              username,
              tahun,
            },
          });
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
    t.nonNull.string("branch_kd");
    t.nonNull.string("username");
    t.nonNull.string("tahun");
    t.nonNull.int("kategori_id");
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
        const { branch_kd, username, kategori_id, nilai, tahun } = args.input;
        return context.prisma.rankMitraTahunKerja.create({
          data: {
            branch_kd,
            User: {
              connect: { username },
            },
            kategori: {
              connect: { kategori_id },
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
        const { branch_kd, username, kategori_id, nilai, tahun } = args.input;
        return context.prisma.rankMitraTahunKerja.update({
          where: {
            rankmitratahunkerja_id,
          },
          data: {
            branch_kd,
            User: {
              connect: { username },
            },
            kategori: {
              connect: { kategori_id },
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
