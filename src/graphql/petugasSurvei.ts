import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
import { Prisma } from "@prisma/client";

export const PetugasSurvei = objectType({
  name: "petugasSurvei",
  definition(t) {
    t.nonNull.id("petugassurvei_id");
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
    t.nullable.int("status");
  },
});

export const PetugasSurveiQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("PetugasSurvei", {
      type: "petugasSurvei",
      args: {
        id: nullable(intArg()),
        username: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        if (args.id) {
          return [
            context.prisma.petugasSurvei.findUnique({
              where: {
                petugassurvei_id: args.id,
              },
            }),
          ];
        } else if (args.username) {
          return [
            context.prisma.petugasSurvei.findMany({
              where: {
                username: args.username,
              },
            }),
          ];
        } else {
          return context.prisma.petugasSurvei.findMany();
        }
      },
    });
  },
});

export const PetugasSurveiInputType = inputObjectType({
  name: "PetugasSurveiInputType",
  definition(t) {
    t.nonNull.string("survei_kd");
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("username");
    t.nullable.int("status");
  },
});

export const PetugasSurveiMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPetugasSurvei", {
      type: "petugasSurvei",
      args: { input: nonNull(PetugasSurveiInputType) },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, username, status } = args.input;
        return context.prisma.petugasSurvei.create({
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
            status,
            created_by: userName,
          },
        });
      },
    });
    t.nonNull.list.nullable.field("createManyPetugasSurvei", {
      type: "petugasSurvei",
      args: {
        input: nonNull(PetugasSurveiInputType),
        usernames: nonNull(list(nullable(stringArg()))),
      },
      resolve(parent, args, context) {
        const { username: userName } = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const { survei_kd, keg_kd, posisi_kd, branch_kd, status } = args.input;
        const  usernames = args.usernames
        return createMany(survei_kd, keg_kd, posisi_kd, branch_kd, status, usernames, userName );
      },
    });
  },
});

function createMany(survei_kd:string, keg_kd:string, posisi_kd:string, branch_kd:string, status:number, usernames:string[], userName:string) {
  return prisma.$transaction(
    async (tx) => {
      let result=[]
      for (let i = 0; i < usernames.length; i++) {
        const temp = await tx.petugasSurvei.create({
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
              connect: { username: usernames[i] },
            },
            status,
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
