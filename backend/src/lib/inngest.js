import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "AlgoArena" });

const syncUser = inngest.createFunction(
  { id: "sync-user", name: "Sync User to DB" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    // ✅ Mark function as completed
    return { message: "User synced successfully", clerkId: id };

    await upsertStreamUser({
      id: newUser.clerkId,
      email: newUser.email,
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user", name: "Delete User from DB" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.findOneAndDelete({ clerkId: id });

    // ✅ Mark function as completed
    return { message: "User deleted successfully", clerkId: id };

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
