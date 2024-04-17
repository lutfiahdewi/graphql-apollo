import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";

export const PetugasKinerjaSurvei = objectType({
  name: "petugasKinerjaSurvei",
  definition(t) {
    t.nonNull.id("petugaskinerjasurvei_id");
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
    t.nonNull.string("penilai");
    t.nonNull.field("User", {
        type: "user",
        resolve(parent, _, context) {
          return context.prisma.user.findUnique({
            where: { username: parent.penilai },
          });
        },
      });
    t.nonNull.int("nilai")
  },
});

export const PetugasKinerjaSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("PetugasKinerjaSurvei", {
      type: "petugasKinerjaSurvei",
      args: {
        id: nullable(intArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [context.prisma.petugasKinerjaSurvei.findUnique({
            where: {
                petugaskinerjasurvei_id: args.id,
            },
          })];
        } else {
          return context.prisma.petugasKinerjaSurvei.findMany();
        }
      },
    });
  },
});

export const PetugasKinerjaSurveiInputType = inputObjectType({
  name: "PetugasKinerjaSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("penilai");
    t.nullable.int("nilai");
  },
});

export const PetugasKinerjaSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPetugasKinerjaSurvei", {
      type: "petugasKinerjaSurvei",
      args: { input: nonNull(PetugasKinerjaSurveiInputType) },
      resolve(parent, args, context) {
        const { username} = context;
        if (!username) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd,branch_kd,penilai, nilai} = args.input;
        return context.prisma.petugasKinerjaSurvei.create({
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
            User:{
                connect : {username:penilai}
            },
            nilai,
            created_by: username,
          },
        });
      },
    });
  },
});
