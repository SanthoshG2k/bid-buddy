import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { pageTitleStyles } from "@/styles";
import { getImageUrl } from "@/util/files";
import { formatDistance } from 'date-fns'
import Link from "next/link";
import Image from "next/image";
import { formatToRupees } from "@/util/currency";
import { createBidAction } from "@/app/items/[itemId]/actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";

interface ItemPageProps {
  params: {
    itemId: string;
  };
}

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp,new Date(), { addSuffix: true });
}

export default async function ItemPage({ params }: ItemPageProps) {
  const itemId = params.itemId;
  const session = await auth();
  const item = await getItem(parseInt(itemId));
  
  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" width={200} height={200} alt="package" />
        <h1 className={pageTitleStyles}>Item not found</h1>
        <p className="text-center">
          The item you are trying to view is invalid. <br />
          Please go back and search for a different auction item.
        </p>
        <Button asChild>
          <Link href="/">View Auctions</Link>
        </Button>
      </div>
    );
  }

 const allbids = await getBidsForItem(item.id);
 
 const hasBids = allbids.length > 0;

 const canPlaceBid = session && item.userId !== session.user.id;

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <h1 className={pageTitleStyles}>
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
            priority
          />
          <div className="text-xl space-y-4">
            <div>
              Current Bid{" "}
              <span className="font-bold">
                ₹{formatToRupees(item.currentBid)}
                </span>
            </div>
          </div>
          <div className="text-xl space-y-4">
            <div>
              Starting Price Of{" "}
              <span className="font-bold">
                ₹{formatToRupees(item.startingPrice)}
                </span>
            </div>
            <div>
              Bid Interval{" "} 
              <span className="font-bold">
              ₹{formatToRupees(item.bidInterval)}
                </span>
                </div>           
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {canPlaceBid && (
          <form action = {createBidAction.bind(null, item.id)}>         
            <Button>Place a Bid</Button>
          </form>
          )}
        </div>
        {hasBids ? (
          <ul className="space-y-4">
            {allbids.map((bid) => (     
              <li key={bid.id} className="bg-gray-100 rounded-xl p-8">   
                <div className="flex gap-4">
                  <div>
                    <span className="font-bold">₹{formatToRupees(bid.amount)}</span> by{" "}
                    <span className="font-bold">{bid.user.name}</span>
                  </div>
                  <div className="">{formatTimestamp(bid.timestamp)}</div>
                </div>
              </li>
            ))}
          </ul>
          ) : (
          <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl py-12">
            <Image src="/package.svg"
              width={200}
              height={200}
              alt="package"
              />
          <h2 className="text-2xl font-bold">No bids yet</h2>
          {canPlaceBid && (
          <form action = {createBidAction.bind(null, item.id)}>         
            <Button>Place a Bid</Button>
          </form>
          )}
          </div>          
          )}
        </div>
    </div>
    </main>
  );
}
