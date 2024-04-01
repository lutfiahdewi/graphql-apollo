import { objectType } from "nexus";

export const User = objectType({
    name: "userRole",
    definition(t) {
        t.nonNull.id("user_role_id");
        t.nullable.string("username");
        t.nonNull.int("role_id");
        t.nullable.int("status");
    },
});

