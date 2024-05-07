import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
// import moment from 'moment';

const moment = require("moment");
export const RankMitra = objectType({
  name: "rankMitra",
  definition(t) {
    t.nonNull.id("rankmitra_id");
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
    t.nonNull.string("kategori_id");
    t.nonNull.field({ name: "kategori", type: "kategori" });
    t.nonNull.float("nilai");
  },
});

export const RankMitraQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("RankMitra", {
      type: "rankMitra",
      args: {
        id: nullable(intArg()),
        branch_kd: nullable(stringArg()),
        username: nullable(stringArg()),
        kategori_id: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const { id, branch_kd, username, kategori_id } = args;
        if (args.id) {
          return [
            context.prisma.rankMitra.findUnique({
              where: {
                rankmitra_id: args.id,
              },
              include: {
                kategori: true,
              },
            }),
          ];
        } else if (branch_kd || username || kategori_id) {
          return context.prisma.rankMitra.findMany({
            where:{
              branch_kd,
              username,
              kategori_id
            }
          })
        } else {
          return context.prisma.rankMitra.findMany({
            include: {
              kategori: true,
            },
          });
        }
      },
    });
  },
});

export const RankMitraInputType = inputObjectType({
  name: "RankMitraInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.string("username");
    t.nonNull.int("kategori_id");
    t.nonNull.float("nilai");
  },
});

export const RankMitraMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRankMitra", {
      type: "rankMitra",
      args: { input: nonNull(RankMitraInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { branch_kd, username, kategori_id, nilai } = args.input;
        return context.prisma.rankMitra.create({
          data: {
            branch_kd,
            User: {
              connect: { username },
            },
            kategori: {
              connect: { kategori_id },
            },
            nilai,
            created_by: userName,
          },
          include: {
            kategori: true,
          },
        });
      },
    });
    t.nonNull.field("updateRankMitra", {
      type: "rankMitra",
      args: { id: nonNull(intArg()), input: nonNull(RankMitraInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        let nowMoment = moment.utc();
        nowMoment.local();
        const updated_at = nowMoment.toISOString(true);
        console.log(updated_at);
        const rankmitra_id = args.id;
        const { branch_kd, username, kategori_id, nilai } = args.input;
        return context.prisma.rankMitra.update({
          where: {
            rankmitra_id,
          },
          data: {
            branch_kd,
            User: {
              connect: { username },
            },
            kategori: {
              connect: { kategori_id },
            },
            nilai,
            updated_by: userName,
            updated_at,
          },
          include: {
            kategori: true,
          },
        });
      },
    });
  },
});
