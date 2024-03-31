import { objectType } from "nexus";

export const User = objectType({
    name: "user",
    definition(t) {
        t.nonNull.int("user_id");
        t.nullable.string("username");
        t.nonNull.string("email");
        t.nullable.boolean("is_pegawai");
    },
});