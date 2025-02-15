import { ItemCard } from "@/app/item-card";
import { database } from "@/db/database";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h2 className="text-2xl font-bold nb-8">Item For Sale</h2>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </main>
  );
}
