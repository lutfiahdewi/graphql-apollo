import { objectType, extendType, intArg, nonNull, nullable, list, stringArg, inputObjectType } from "nexus";
import { prisma } from "../context";
import { Prisma } from "@prisma/client";

export const PenugasanStruktur = objectType({
  name: "penugasanStruktur",
  definition(t) {
    t.nonNull.id("penugasanstruktur_id");
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
    t.nonNull.string("parent")
    t.nonNull.int("status")
  },
});

export const PenugasanStrukturQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nullable.field("PenugasanStruktur", {
      type: "penugasanStruktur",
      args: {
        id: nullable(intArg()),
        keg_kd: nullable(stringArg()),
        branch_kd: nullable(stringArg()),
        posisi_kd: nullable(stringArg()),
      },
      resolve(parent, args, context) {
        const {id, branch_kd, keg_kd, posisi_kd} = args
        if (id) {
          return [context.prisma.penugasanStruktur.findUnique({
            where: {
                PenugasanStruktur_id: id,
                
            },
          })];
        }else if(branch_kd || keg_kd || posisi_kd){
          return context.prisma.penugasanStruktur.findMany({
            where:{
              branch_kd,
              keg_kd,
              posisi_kd
            }
          })
        } 
        else {
          return context.prisma.penugasanStruktur.findMany();
        }
      },
    });
    t.nonNull.list.nullable.field("searchPenugasanStruktur", {
      type: "penugasanStruktur",
      args: {
        keg_kd: nonNull(stringArg()),
        branch_kd: nonNull(stringArg()),
        posisi_kd: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { username: userName} = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const {keg_kd,  branch_kd, posisi_kd} = args;
        return context.prisma.penugasanStruktur.findMany({
          where: {
              keg_kd,
              branch_kd,
              posisi_kd,
              parent: userName,
          }
        });
      },
    });
    t.nonNull.int("countSearchPenugasanStruktur", {
      args: {
        keg_kd: nonNull(stringArg()),
        branch_kd: nonNull(stringArg()),
        posisi_kd: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { username: userName} = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const {keg_kd,  branch_kd, posisi_kd} = args;
        return context.prisma.penugasanStruktur.count({
          where: {
              keg_kd,
              branch_kd,
              posisi_kd,
              parent: userName,
          }
        });
      },
    });
  },
});

export const PenugasanStrukturInputType = inputObjectType({
  name: "PenugasanStrukturInputType",
  definition(t) {
    t.nonNull.string("keg_kd");
    t.nonNull.string("branch_kd");
    t.nonNull.string("posisi_kd");
    t.nonNull.string("username");
    t.nullable.string("parent");
    t.nullable.int("status");
  },
});

export const PenugasanStrukturMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPenugasanStruktur", {
      type: "penugasanStruktur",
      args: { input: nonNull(PenugasanStrukturInputType) },
      resolve(_, args, context) {
        const { username: userName} = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const {keg_kd, posisi_kd, branch_kd, username, parent, status} = args.input;
        return context.prisma.penugasanStruktur.create({
          data: {
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
                connect : {username}
            },
            parent,
            status,
            created_by: userName,
          },
        });
      },
    });
    t.nonNull.list.nullable.field("createManyPenugasanStruktur", {
      type: "penugasanStruktur",
      args: { 
        input: nonNull(PenugasanStrukturInputType),
        usernames: nonNull(list(nullable(stringArg()))),
      },
      resolve(_, args, context) {
        const { username: userName} = context;
        if (!userName) {
          throw new Error("Cannot post without logging in.");
        }
        const {keg_kd, posisi_kd, branch_kd, parent, status} = args.input;
        const  usernames = args.usernames
        return createMany(keg_kd, posisi_kd, branch_kd, usernames, parent, status, userName);
      },
    });
  },
});

function createMany(keg_kd:string, posisi_kd:string, branch_kd:string,   usernames:string[], parent:string, status:number, userName:string,) {
  return prisma.$transaction(
    async (tx) => {
      let result=[]
      for (let i = 0; i < usernames.length; i++) {
        const temp = await tx.penugasanStruktur.create({
          data: {
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
                connect : {username: usernames[i]}
            },
            parent,
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