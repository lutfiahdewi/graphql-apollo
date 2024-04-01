import { objectType, extendType, intArg, nonNull, inputObjectType, list } from "nexus";
import { KategoriIndikator } from "./kategoriIndikator";
import { Prisma } from "@prisma/client";
import { context, createContext, prisma} from "../context";

interface inputIndikator {
  branch_kd: String;
  nama: String;
  is_benefit: number;
  definisi: String;
  created_by?: String;
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
export const IndikatorNested = objectType({
  name: "indikatorNested",
  definition(t) {
    t.nonNull.id("indikator_id");
    t.nonNull.string("branch_kd");
    t.nonNull.string("nama");
    t.nonNull.int("is_benefit");
    t.nonNull.string("definisi");
    t.nonNull.list.nullable.field({
      type: "kategoriIndikator",
      name: "KategoriIndikator",
    });
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
      resolve(_parent, args, context, _info) {
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
      resolve(_parent, _args, context, _info) {
        const indikator = context.prisma.indikator.findMany();
        return indikator;
      },
    });
    t.nonNull.list.nonNull.field("allIndikatorNested", {
      type: "indikatorNested",
      resolve(_parent, _args, context, _info) {
        const indikator = context.prisma.indikator.findMany({
          include: {
            KategoriIndikator: true,
          },
      });
        return indikator;
      },
    });
    t.nonNull.list.nonNull.field("someIndikator", {
      type: "indikator",
      args: {
        id: nonNull(list(nonNull(intArg()))),
      },
      resolve(_parent, _args, context, _info) {
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
const created_by = "admin"
export const IndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createIndikator", {
      type: "indikator",
      args: { input: nonNull(IndikatorInputType) },
      resolve(_parent, args, context, _info) {
        const { branch_kd, nama, definisi, is_benefit } = args.input;
        const newIndikator = context.prisma.indikator.create({
          data: {
            branch_kd,
            nama,
            definisi,
            is_benefit: parseInt(is_benefit),
            created_by,
          },
        });
        return newIndikator;
      },
    });

    /*t.nonNull.field("createIndikatorFull", {
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
    });*/

    t.nonNull.field("createIndikatorNested", {
      type: "indikatorNested",
      args: { input: nonNull(IndikatorNestedInputType) },
      resolve(_parent, args, context, _info) {
        const { branch_kd, nama, definisi, is_benefit, kategori_id, bobot, no_urut, perbandingan } = args.input;
        /*const newIndikator = context.prisma.indikator.create({
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
          include: {
            KategoriIndikator: true,
          },
        });
        return newIndikator;*/
        return creationNested(branch_kd, nama, definisi, is_benefit, kategori_id, bobot, no_urut, perbandingan);
      },
    });

    t.nonNull.field("createManyIndikator", {
      type: "Int",
      args: { input: nonNull(list(nonNull(IndikatorInputType))) },
      resolve(_parent, args, context, _info) {
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
      resolve(_parent, args, context, _info) {
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
      resolve(_parent, args, context, _info) {
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


function creationNested(branch_kd : string, nama : string, definisi : string, is_benefit : string, kategori_id : string, bobot:number, no_urut:number, perbandingan:string) {
  return prisma.$transaction(
    async (tx) => {
    // 1. createIndikator
    const indikator = await tx.indikator.create({
      data: {
        branch_kd,
        nama,
        definisi,
        is_benefit: parseInt(is_benefit),
        created_by,
      },
    });
    // 2. get indikator_id
    const indikator_id : string = (indikator.indikator_id).toString()

    // 3. create kategoriIndikator
    const kategoriIndikator = await tx.kategoriIndikator.create({
      data: {
        branch_kd,
        indikator: {
          connect: {
            indikator_id: parseInt(indikator_id),
          }
        },
        kategori: {
          connect: {
            kategori_id: parseInt(kategori_id),
          }
        },
        bobot,
        no_urut,
        perbandingan,
        created_by,
      },
    });

    // 4. query connected indikator(?)
    const nestedIndikator = await tx.indikator.findUnique({
      where: {
        indikator_id: parseInt(indikator_id),
      },
      include: {
        KategoriIndikator: true,
      }
    })
    return nestedIndikator;
  },
  {
    isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
    maxWait: 30000, // default: 2000
    timeout: 30000, // default: 5000
  },
  )
}

/*
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
          include: {
            KategoriIndikator: true,
          },
        });
        return newIndikator;
        */

/*const MAX_RETRIES = 5;
        let retries = 0;
        let [newIndikator] = [undefined];
        while (retries < MAX_RETRIES) {
          try {
            [newIndikator] = await context.prisma.$transaction(
              [
                context.prisma.indikator.create({
                  data: {
                    branch_kd,
                    nama,
                    definisi,
                    is_benefit: parseInt(is_benefit),
                    KategoriIndikator: {
                      create: [
                        {
                          branch_kd,
                          kategori: {
                            connect: {
                              kategori_id: parseInt(kategori_id),
                            },
                          },
                          bobot,
                          no_urut,
                          perbandingan,
                        },
                      ],
                    },
                  },
                  include: {
                    KategoriIndikator: true,
                  },
                }),
              ],
              {
                isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
              }
            );
            return newIndikator;
          } catch (error: unknown) {
            if (error.code === "P2034") {
              retries++;
              continue;
            }
            throw error;
          }
        }*/
