import { objectType, extendType, intArg, nonNull, inputObjectType, list } from "nexus";
import { KategoriIndikator } from "./kategoriIndikator";
import { Prisma } from "@prisma/client";
import { context } from "../context";

interface inputIndikator {
  branch_kd: String;
  nama: String;
  is_benefit: number;
  definisi: String;
}

export const Indikator = objectType({
  name: "indikator",
  definition(t) {
    t.nonNull.id("indikator_id");
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.int("is_benefit");
    t.nonNull.string("definisi");
  },
});

export const IndikatorQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("indikator", {
      type: "indikator",
      args: {
        id: nonNull(intArg()),
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
    t.nonNull.list.nonNull.field("someIndikator", {
      type: "indikator",
      args: {
        id: nonNull(list(nonNull(intArg()))),
      },
      resolve(parent, args, context, info) {
        const indikator = context.prisma.indikator.findMany();
        return indikator;
      },
    });
  },
});

export const IndikatorNestedInputType = inputObjectType({
  name: "IndikatorNestedInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.string("is_benefit");
    t.nonNull.string("definisi");
    t.nonNull.string("kategori_id");
    t.nullable.float("bobot");
    t.nonNull.int("no_urut");
    t.nullable.string("perbandingan");
  },
});

export const IndikatorInputType = inputObjectType({
  name: "IndikatorInputType",
  definition(t) {
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.string("is_benefit");
    t.nonNull.string("definisi");
  },
});

export const IndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createIndikator", {
      type: "indikator",
      args: { input: nonNull(IndikatorInputType) },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi, is_benefit } = args.input;
        const newIndikator = context.prisma.indikator.create({
          data: {
            branch_kd,
            nama,
            definisi,
            is_benefit: parseInt(is_benefit),
          },
        });
        return newIndikator;
      },
    });

    t.nonNull.field("createIndikatorFull", {
      type: "kategoriIndikator",
      args: { input: nonNull(IndikatorNestedInputType) },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi, is_benefit,  kategori_id,  bobot, no_urut, perbandingan } = args.input;
        const newIndikator = context.prisma.indikator.create({
          data: {
            branch_kd,
            nama,
            definisi,
            is_benefit: parseInt(is_benefit),
          },
        });
        console.log(() => {return newIndikator.toString()})
        const newKategoriIndikator = context.prisma.kategoriIndikator.create({
          data: {
            branch_kd,
            kategori: {
              connect: {
                kategori_id: parseInt(kategori_id),
              }
            },
            // kategori_id: parseInt(kategori_id),
            // indikator_id: newIndikator.data?.indikator_id,
            indikator: {
              connect: {
                indikator_id: newIndikator.data?.indikator_id
              }
            },
            bobot,
            no_urut,
            perbandingan,
          },
        });
        return newKategoriIndikator;
      },
    });

    t.nonNull.field("createIndikatorNested", {
      type: "indikator",
      args: { input: nonNull(IndikatorNestedInputType) },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi, is_benefit, kategori_id,  bobot, no_urut, perbandingan} = args.input;
        const newIndikator = context.prisma.indikator.create({
          data: {
            branch_kd,
            nama,
            definisi,
            is_benefit: parseInt(is_benefit),
            KategoriIndikator: {
              create: [{
                branch_kd,
                kategori: {
                  connect: {
                    kategori_id: parseInt(kategori_id),
                  }
                },
                bobot,
                no_urut,
                perbandingan,
              }],
            },
          },
          // include: {
          //   KategoriIndikator: true,
          // },
        });
        return newIndikator;
      },
    });

    t.nonNull.field("createManyIndikator", {
      type: "Int",
      args: { input: nonNull(list(nonNull(IndikatorInputType))) },
      resolve(parent, args, context, info) {
        const { list } = args.input;
        let listInput: inputIndikator[] = [];
        for (let i = 0; i < list.length; i++) {
          listInput[i] = {
            branch_kd: list[i].branch_kd,
            nama: list[i].nama,
            definisi: list[i].definisi,
            is_benefit: parseInt(list[i].is_benefit),
          };
        }
        // const { branch_kd, nama, definisi, is_benefit } = args.input;
        const { count } = context.prisma.indikator.createMany({
          data: listInput,
        });
        return count;
      },
    });

    t.nonNull.field("updateIndikator", {
      type: "indikator",
      args: { input: nonNull(IndikatorInputType), id: nonNull(intArg()) },
      resolve(parent, args, context, info) {
        const { branch_kd, nama, definisi, is_benefit } = args.input;
        const updatedIndikator = context.prisma.indikator.update({
          where: {
            indikator_id: args.id,
          },
          data: {
            branch_kd,
            nama,
            definisi,
            is_benefit: parseInt(is_benefit),
          },
        });
        return updatedIndikator;
      },
    });

    t.nullable.field("deleteIndikator", {
      type: "indikator",
      args: { id: nonNull(intArg()) },
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
