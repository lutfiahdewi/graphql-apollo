/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  IndikatorInputType: { // input type
    branch_kd: string; // String!
    definisi: string; // String!
    is_benefit: string; // String!
    nama: string; // String!
  }
  IndikatorNestedInputType: { // input type
    bobot?: number | null; // Float
    branch_kd: string; // String!
    definisi: string; // String!
    is_benefit: string; // String!
    kategori_id: string; // String!
    nama: string; // String!
    no_urut: number; // Int!
    perbandingan?: string | null; // String
  }
  KategoriIndikatorInputType: { // input type
    bobot?: number | null; // Float
    branch_kd: string; // String!
    indikator_id: string; // String!
    kategori_id: string; // String!
    no_urut: number; // Int!
    perbandingan?: string | null; // String
  }
  KategoriInputType: { // input type
    definisi: string; // String!
    nama: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['user']; // user!
  }
  Mutation: {};
  Query: {};
  indikator: { // root type
    branch_kd: string; // String!
    definisi: string; // String!
    indikator_id: string; // ID!
    is_benefit: number; // Int!
    nama: string; // String!
  }
  kategori: { // root type
    definisi: string; // String!
    kategori_id: string; // ID!
    nama: string; // String!
  }
  kategoriIndikator: { // root type
    bobot?: number | null; // Float
    branch_kd: string; // String!
    indikator_id: string; // ID!
    kategoriIndikator_id: string; // ID!
    kategori_id: string; // ID!
    no_urut: number; // Int!
    perbandingan?: string | null; // String
  }
  user: { // root type
    ID: number; // Int!
    email: string; // String!
    is_pegawai?: boolean | null; // Boolean
    username?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['user']; // user!
  }
  Mutation: { // field return type
    createIndikator: NexusGenRootTypes['indikator']; // indikator!
    createIndikatorFull: NexusGenRootTypes['kategoriIndikator']; // kategoriIndikator!
    createIndikatorNested: NexusGenRootTypes['indikator']; // indikator!
    createKategori: NexusGenRootTypes['kategori']; // kategori!
    createKategoriIndikator: NexusGenRootTypes['kategoriIndikator']; // kategoriIndikator!
    createManyIndikator: number; // Int!
    deleteIndikator: NexusGenRootTypes['indikator'] | null; // indikator
    deleteKategori: NexusGenRootTypes['kategori'] | null; // kategori
    deleteKategoriIndikator: NexusGenRootTypes['kategoriIndikator'] | null; // kategoriIndikator
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateIndikator: NexusGenRootTypes['indikator']; // indikator!
    updateKategori: NexusGenRootTypes['kategori']; // kategori!
    updateKategoriIndikator: NexusGenRootTypes['kategoriIndikator']; // kategoriIndikator!
  }
  Query: { // field return type
    allIndikator: NexusGenRootTypes['indikator'][]; // [indikator!]!
    allKategori: NexusGenRootTypes['kategori'][]; // [kategori!]!
    allKategoriIndikator: NexusGenRootTypes['kategoriIndikator'][]; // [kategoriIndikator!]!
    indikator: NexusGenRootTypes['indikator']; // indikator!
    kategori: NexusGenRootTypes['kategori']; // kategori!
    kategoriIndikator: NexusGenRootTypes['kategoriIndikator']; // kategoriIndikator!
    someIndikator: NexusGenRootTypes['indikator'][]; // [indikator!]!
  }
  indikator: { // field return type
    branch_kd: string; // String!
    definisi: string; // String!
    indikator_id: string; // ID!
    is_benefit: number; // Int!
    nama: string; // String!
  }
  kategori: { // field return type
    definisi: string; // String!
    kategori_id: string; // ID!
    nama: string; // String!
  }
  kategoriIndikator: { // field return type
    bobot: number | null; // Float
    branch_kd: string; // String!
    indikator_id: string; // ID!
    kategoriIndikator_id: string; // ID!
    kategori_id: string; // ID!
    no_urut: number; // Int!
    perbandingan: string | null; // String
  }
  user: { // field return type
    ID: number; // Int!
    email: string; // String!
    is_pegawai: boolean | null; // Boolean
    username: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'user'
  }
  Mutation: { // field return type name
    createIndikator: 'indikator'
    createIndikatorFull: 'kategoriIndikator'
    createIndikatorNested: 'indikator'
    createKategori: 'kategori'
    createKategoriIndikator: 'kategoriIndikator'
    createManyIndikator: 'Int'
    deleteIndikator: 'indikator'
    deleteKategori: 'kategori'
    deleteKategoriIndikator: 'kategoriIndikator'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    updateIndikator: 'indikator'
    updateKategori: 'kategori'
    updateKategoriIndikator: 'kategoriIndikator'
  }
  Query: { // field return type name
    allIndikator: 'indikator'
    allKategori: 'kategori'
    allKategoriIndikator: 'kategoriIndikator'
    indikator: 'indikator'
    kategori: 'kategori'
    kategoriIndikator: 'kategoriIndikator'
    someIndikator: 'indikator'
  }
  indikator: { // field return type name
    branch_kd: 'String'
    definisi: 'String'
    indikator_id: 'ID'
    is_benefit: 'Int'
    nama: 'String'
  }
  kategori: { // field return type name
    definisi: 'String'
    kategori_id: 'ID'
    nama: 'String'
  }
  kategoriIndikator: { // field return type name
    bobot: 'Float'
    branch_kd: 'String'
    indikator_id: 'ID'
    kategoriIndikator_id: 'ID'
    kategori_id: 'ID'
    no_urut: 'Int'
    perbandingan: 'String'
  }
  user: { // field return type name
    ID: 'Int'
    email: 'String'
    is_pegawai: 'Boolean'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createIndikator: { // args
      input: NexusGenInputs['IndikatorInputType']; // IndikatorInputType!
    }
    createIndikatorFull: { // args
      input: NexusGenInputs['IndikatorNestedInputType']; // IndikatorNestedInputType!
    }
    createIndikatorNested: { // args
      input: NexusGenInputs['IndikatorNestedInputType']; // IndikatorNestedInputType!
    }
    createKategori: { // args
      input: NexusGenInputs['KategoriInputType']; // KategoriInputType!
    }
    createKategoriIndikator: { // args
      input: NexusGenInputs['KategoriIndikatorInputType']; // KategoriIndikatorInputType!
    }
    createManyIndikator: { // args
      input: NexusGenInputs['IndikatorInputType'][]; // [IndikatorInputType!]!
    }
    deleteIndikator: { // args
      id: number; // Int!
    }
    deleteKategori: { // args
      id: number; // Int!
    }
    deleteKategoriIndikator: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    updateIndikator: { // args
      id: number; // Int!
      input: NexusGenInputs['IndikatorInputType']; // IndikatorInputType!
    }
    updateKategori: { // args
      id: number; // Int!
      input: NexusGenInputs['KategoriInputType']; // KategoriInputType!
    }
    updateKategoriIndikator: { // args
      id: number; // Int!
      input: NexusGenInputs['KategoriIndikatorInputType']; // KategoriIndikatorInputType!
    }
  }
  Query: {
    indikator: { // args
      id: number; // Int!
    }
    kategori: { // args
      id: number; // Int!
    }
    kategoriIndikator: { // args
      id: number; // Int!
    }
    someIndikator: { // args
      id: number[]; // [Int!]!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}