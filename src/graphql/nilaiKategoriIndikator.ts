import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType, booleanArg } from "nexus";
import { prisma } from "../context";
import { Prisma } from "@prisma/client";
const moment = require("moment");

export const NilaiKategoriIndikator = objectType({
  name: "nilaiKategoriIndikator",
  definition(t) {
    t.nonNull.id("nilaikategoriindikator_id");
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
    t.nonNull.int("kategoriIndikator_id");
    t.nullable.list.nullable.field("KategoriIndikator", {
      type: "kategoriIndikator",
      resolve(parent, _args, context) {
        const temp = context.prisma.kategoriIndikator.findMany({
          where: { kategoriIndikator_id: parent.kategoriIndikator_id },
          include: { indikator: true, kategori: true },
        });
        return temp;
      },
    });
    t.nullable.int("nilai");
    t.nonNull.boolean("is_final");
    t.nonNull.string("tahun");
  },
});
export const BatchPayload = objectType({
  name: "BatchPayload",
  definition(t) {
    t.nonNull.int("count");
  },
});


export const NilaiKategoriIndikatorQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("NilaiKategoriIndikator", {
      type: "nilaiKategoriIndikator",
      args: {
        id: nullable(intArg()),
        survei_kd: nullable(stringArg()),
        keg_kd: nullable(stringArg()),
        branch_kd: nullable(stringArg()),
        posisi_kd: nullable(stringArg()),
        kategoriIndikator_id: nullable(intArg()),
        username: nullable(stringArg()),
        tahun: nullable(stringArg()),
      },

      resolve(parent, args, context) {
        const { id, survei_kd, keg_kd, branch_kd, posisi_kd, username, tahun, kategoriIndikator_id } = args;
        if (id) {
          return [
            context.prisma.nilaiKategoriIndikator.findUnique({
              where: {
                nilaikategoriindikator_id: args.id,
              },
            }),
          ];
        } else if (survei_kd || keg_kd || branch_kd || posisi_kd || kategoriIndikator_id || tahun) {
          return context.prisma.nilaiKategoriIndikator.findMany({
            where: {
              survei_kd,
              keg_kd,
              branch_kd,
              posisi_kd,
              kategoriIndikator_id,
              username,
              tahun,
            },
          });
        } else {
          return context.prisma.nilaiKategoriIndikator.findMany();
        }
      },
    });
  },
});

export const NilaiKategoriIndikatorInputType = inputObjectType({
  name: "NilaiKategoriIndikatorInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("username");
    t.nonNull.list.nullable.int("kategoriIndikator_id");
    t.nonNull.list.nullable.int("nilai");
    t.nonNull.boolean("is_final");
    t.nonNull.string("tahun");
  },
});

export const NilaiKategoriIndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.nonNull.field("createNilaiKategoriIndikator", {
      type: "nilaiKategoriIndikator",
      args: { input: nonNull(NilaiKategoriIndikatorInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, kategoriIndikator_id, nilai, is_final, tahun } = args.input;
        if (kategoriIndikator_id.length < 1) {
          throw new Error("kategoriIndikator_id at least have one item");
        } else if (kategoriIndikator_id.length !== nilai.length) {
          throw new Error("kategoriIndikator_id and nilai should have same array length");
        }
        return createMany(survei_kd, keg_kd, posisi_kd, branch_kd, username, kategoriIndikator_id, nilai, is_final, tahun, userName);
      },
    });
    t.nonNull.list.nonNull.field("updateNilaiKategoriIndikator", {
      type: "nilaiKategoriIndikator",
      args: {
        input: nullable(NilaiKategoriIndikatorInputType),
        id: nullable(intArg()),
        nilai: nullable(intArg()),
        is_final: nullable(booleanArg()),
      },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        if (args.input) {
          const { survei_kd, keg_kd, posisi_kd, branch_kd, username, kategoriIndikator_id, nilai, is_final, tahun } = args.input;
          if (kategoriIndikator_id.length < 1) {
            throw new Error("kategoriIndikator_id at least have one item");
          } else if (kategoriIndikator_id.length !== nilai.length) {
            throw new Error("kategoriIndikator_id and nilai should have same array length");
          }
          return updateMany(survei_kd, keg_kd, posisi_kd, branch_kd, username, kategoriIndikator_id, nilai, is_final, userName, tahun);
        } else if (args.id) {
          if (args.is_final === null || args.is_final === undefined) {
            throw new Error("is_final(boolean) cannot be null or undefined");
          }
          const { id, nilai, is_final } = args;
          return [
            context.prisma.nilaiKategoriIndikator.update({
              where: {
                nilaikategoriindikator_id: id,
              },
              data: {
                nilai,
                is_final,
                updated_by: userName,
                updated_at: moment().toISOString(),
              },
            }),
          ];
        } else {
          throw new Error("Fill at least input or id and is_final args!");
        }
      },
    });
    t.nonNull.field("finalizeNilaiKategoriIndikator", {
      type: "BatchPayload",
      args: {
        survei_kd: nonNull(stringArg()),
        keg_kd: nonNull(stringArg()),
        branch_kd: nonNull(stringArg()),
        posisi_kd: nonNull(stringArg()),
        tahun: nonNull(stringArg()),
        is_final: nonNull(booleanArg()),
      },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, branch_kd, posisi_kd, tahun, is_final } = args;
        return context.prisma.nilaiKategoriIndikator.updateMany({
          where: {
            survei_kd,
            keg_kd,
            branch_kd,
            posisi_kd,
            tahun,
          },
          data: {
            is_final,
          },
        });
      },
    });
  },
});

function createMany(survei_kd: string, keg_kd: string, posisi_kd: string, branch_kd: string, username: string, kategoriIndikator_id: number[], nilai: number[], is_final: boolean, tahun: string, userName: string) {
  return prisma.$transaction(
    async (tx) => {
      let result = [];
      for (let i = 0; i < kategoriIndikator_id.length; i++) {
        const temp = await tx.nilaiKategoriIndikator.create({
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
            KategoriIndikator: {
              connect: {
                kategoriIndikator_id: kategoriIndikator_id[i],
              },
            },
            nilai: nilai[i],
            is_final,
            tahun,
            created_by: userName,
          },
        });
        result.push(temp);
      }
      return result;
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
      maxWait: 30000, // default: 2000
      timeout: 30000, // default: 5000
    }
  );
}

function updateMany(survei_kd: string, keg_kd: string, posisi_kd: string, branch_kd: string, username: string, kategoriIndikator_id: number[], nilai: number[], is_final: boolean, tahun: string, userName: string) {
  return prisma.$transaction(
    async (tx) => {
      let result = [];
      for (let i = 0; i < kategoriIndikator_id.length; i++) {
        // const temp = await tx.nilaiKategoriIndikator.update({
        const { count } = await tx.nilaiKategoriIndikator.updateMany({
          where: {
            survei_kd,
            keg_kd,
            branch_kd,
            posisi_kd,
            kategoriIndikator_id: kategoriIndikator_id[i],
            username,
          },
          data: {
            nilai: nilai[i],
            is_final,
            updated_by: userName,
            updated_at: moment().toISOString(),
          },
        });
        if (count > 0) {
          const temp = await tx.nilaiKategoriIndikator.findMany({
            where: {
              survei_kd,
              keg_kd,
              branch_kd,
              posisi_kd,
              kategoriIndikator_id: kategoriIndikator_id[i],
              username,
              tahun,
            },
          });
          result.push(...temp);
        }
        // result.push(temp);
      }
      return result;
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
      maxWait: 30000, // default: 2000
      timeout: 30000, // default: 5000
    }
  );
}
