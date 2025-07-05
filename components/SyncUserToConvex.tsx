// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useMutation, useQuery } from "convex/react";

// export function SyncUserToConvex() {
//   const { data: session } = useSession();
//   const createUserIfNotExists = useMutation(api.users.createUserIfNotExists);
//   const user = useQuery(api.users.getUserByEmail, {
//     email: session?.user?.email || "",
//   });

//   useEffect(() => {
//     if (
//       session?.user?.email &&
//       session?.user?.name &&
//       user === null // if user not found
//     ) {
//       createUserIfNotExists({
//         email: session.user.email,
//         name: session.user.name,
//         image: session.user.image ?? undefined,
//       });
//     }
//   }, [session, user]);

//   return null;
// }
