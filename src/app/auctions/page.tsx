import { ItemCard } from "@/app/item-card";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "./emptystate";
import { pageTitleStyles } from "@/styles";

export default async function MyAuctionPage() {
  const session = await auth();
  
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  
  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id)
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h2 className={pageTitleStyles}>Your Current Auctions</h2>
 
            {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
            {allItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
        ) : (
          <EmptyState />
        )}
      
    </main>
  );
}
