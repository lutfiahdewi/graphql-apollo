import { objectType } from "nexus";

export const UserRole = objectType({
    name: "userRole",
    definition(t) {
        t.nonNull.id("user_role_id");
        // t.nullable.field({name: "user", type:"user"});
        t.nullable.string("username");
        t.nonNull.int("role_id");
        t.nullable.int("status");
    },
});

