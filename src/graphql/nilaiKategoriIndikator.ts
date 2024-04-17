import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";

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
      type: "kategoriIndikatorNested",
      resolve(parent, _args, context) {
        const temp = context.prisma.kategoriIndikator.findMany({
          where: { kategoriIndikator_id: parent.kategoriIndikator_id },
          include: { indikator: true, kategori: true},
        });
        return temp;
      },
    });
    t.nullable.int("nilai");
  },
});

export const NilaiKategoriIndikatorQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("NilaiKategoriIndikator", {
      type: "nilaiKategoriIndikator",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.nilaiKategoriIndikator.findUnique({
              where: {
                nilaikategoriindikator_id: args.id,
              },
            }),
          ];
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
    t.nullable.int("kategoriIndikator_id");
    t.nullable.int("nilai");
  },
});

export const NilaiKategoriIndikatorMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createNilaiKategoriIndikator", {
      type: "nilaiKategoriIndikator",
      args: { input: nonNull(NilaiKategoriIndikatorInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, kategoriIndikator_id, nilai } = args.input;
        return context.prisma.nilaiKategoriIndikator.create({
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
            KategoriIndikator:{
                connect: {
                    kategoriIndikator_id,
                }
            },
            nilai,
            created_by: userName,
          },
        });
      },
    });
  },
});
