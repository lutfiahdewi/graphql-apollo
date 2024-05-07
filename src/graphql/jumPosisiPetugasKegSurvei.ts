import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType, booleanArg } from "nexus";
import { Kategori } from "./kategori";
import { Survei } from "./survei";
import moment from "moment";

export const JumPosisiPetugasKegSurvei = objectType({
  name: "jumPosisiPetugasKegSurvei",
  definition(t) {
    t.nonNull.id("jumposisipetugaskegsurvei_id");
    t.nonNull.string("survei_kd");
    t.nonNull.field({ name: "Survei", type: "survei" });
    t.nonNull.string("keg_kd");
    t.nonNull.field({ name: "Kegiatan", type: "kegiatan" });
    t.nonNull.string("posisi_kd");
    t.nonNull.field({ name: "Posisi", type: "posisi" });
    t.nullable.string("unit_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("kategori_id");
    t.nonNull.field({ name: "kategori", type: "kategori" });
    t.nonNull.int("jumlah");
    t.nullable.boolean("is_confirmed");
  },
});

export const JumPosisiPetugasKegSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("JumPosisiPetugasKegSurvei", {
      type: "jumPosisiPetugasKegSurvei",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.jumPosisiPetugasKegSurvei.findUnique({
              where: {
                jumposisipetugaskegsurvei_id: args.id,
              },
              include: {
                Survei: true,
                Posisi: true,
                Kegiatan: true,
                kategori: true,
              },
            }),
          ];
        } else {
          return context.prisma.jumPosisiPetugasKegSurvei.findMany({
            include: {
              Survei: true,
              Posisi: true,
              Kegiatan: true,
              kategori: true,
            },
          });
        }
      },
    });
    t.nonNull.list.nullable.field("searchJumPosisiPetugasKegSurvei", {
      type: "jumPosisiPetugasKegSurvei",
      args: {
        survei_kd: nonNull(stringArg()),
        keg_kd: nonNull(stringArg()),
        branch_kd: nonNull(stringArg()),
        posisi_kd: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, branch_kd, posisi_kd } = args;
        return context.prisma.jumPosisiPetugasKegSurvei.findMany({
          where: {
            survei_kd,
            keg_kd,
            branch_kd,
            posisi_kd,
          },
          include: {
            Survei: true,
            Posisi: true,
            Kegiatan: true,
            kategori: true,
          },
        });
      },
    });
  },
});

export const JumPosisiPetugasKegSurveiInputType = inputObjectType({
  name: "JumPosisiPetugasKegSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("kategori_id");
    t.nonNull.int("jumlah");
    t.nullable.boolean("is_confirmed");
  },
});

export const JumPosisiPetugasKegSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createJumPosisiPetugasKegSurvei", {
      type: "jumPosisiPetugasKegSurvei",
      args: { input: nonNull(JumPosisiPetugasKegSurveiInputType) },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, kategori_id, jumlah, is_confirmed } = args.input;
        return context.prisma.jumPosisiPetugasKegSurvei.create({
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
            Posisi: {
              connect: {
                kode: posisi_kd,
              },
            },
            kategori: {
              connect: { kategori_id: parseInt(kategori_id) },
            },
            branch_kd,
            jumlah,
            created_by: username,
            is_confirmed,
          },
          include: {
            Survei: true,
            Posisi: true,
            Kegiatan: true,
            kategori: true,
          },
        });
      },
    });
    t.nonNull.field("updateJumPosisiPetugasKegSurvei", {
      type: "jumPosisiPetugasKegSurvei",
      args: { 
        id: nonNull(intArg()), 
        // kategori_id: nullable(stringArg()),
        jumlah: nullable(intArg()),
        is_confirmed: nullable(booleanArg()),
       },
      resolve(parent, args, context) {
        const { username } = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { id, kategori_id, jumlah, is_confirmed } = args;
        return context.prisma.jumPosisiPetugasKegSurvei.update({
          where:{
            jumposisipetugaskegsurvei_id: id,
          },
          data: {
            // kategori: {
            //   connect: { kategori_id: parseInt(kategori_id) },
            // },
            jumlah,
            is_confirmed,
            updated_by: username,
            updated_at: moment().toISOString(),
          },
          include: {
            Survei: true,
            Posisi: true,
            Kegiatan: true,
            kategori: true,
          },
        });
      },
    });
  },
});
