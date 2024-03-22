import { objectType, extendType, intArg, inputObjectType } from "nexus";
import { Prisma } from "@prisma/client";
import { context } from "../context";

export const Indikator = objectType({
  name: "indikator",
  definition(t) {
    t.nonNull.id("indikator_id");
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
  },
});

export const IndikatorQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("indikator", {
      type: "indikator",
      args: {
        id: intArg(),
      },
      resolve(parent, args, context, info) {
        const indikator = context.prisma.indikator.findUnique({
          where: {
            indikator_id: args.id,
          },
        });
        return indikator;
      },
    });
    t.nonNull.list.nonNull.field("allIndikator", {
      type: "indikator",
      resolve(parent, args, context, info) {
        const indikator = context.prisma.indikator.findMany();
        return indikator;
      },
    });
  },
});

export const IndikatorInputType = inputObjectType({
  name: "IndikatorInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.string("definisi");
  },
});

export const IndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createIndikator", {
      type: "indikator",
      args: { input: IndikatorInputType },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi } = args.input;
        const newIndikator = context.prisma.indikator.create({
          data: {
            branch_kd,
            nama,
            definisi,
          },
        });
        return newIndikator;
      },
    });

    t.nonNull.field("updateIndikator", {
      type: "indikator",
      args: { input: IndikatorInputType, id: intArg() },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi } = args.input;
        const updatedIndikator = context.prisma.indikator.update({
          where: {
            indikator_id: args.id,
          },
          data: {
            branch_kd,
            nama,
            definisi,
          },
        });
        return updatedIndikator;
      },
    });

    t.nullable.field("deleteIndikator", {
      type: "indikator",
      args: { id: intArg() },
      resolve(parent, args, context, info) {
        const deletedIndikator = context.prisma.indikator.delete({
          where: {
            indikator_id: args.id,
          },
        //   select: {
        //     indikator_id: true,
        //   },
        });
        // return deletedIndikator;
        // return `main-feed:${JSON.stringify(deletedIndikator.indikator_id)}`;
        // return JSON.parse(deletedIndikator).indikator_id;
        return deletedIndikator;
      },
    });
  },
});
