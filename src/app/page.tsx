import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import {SignOut} from "@/components/sign-out";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { items , bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
const session = await auth();

const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space y-8">
      <h1 className="text-4xl font-bold nb-8">Item For Sale</h1>

        <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            {item.name}
            starting Price:${item.startingPrice / 100}
          </div>
        ))}
        </div>
    </main>
  );
}
