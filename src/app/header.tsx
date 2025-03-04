"use client";

import { Button } from "@/components/ui/button";
import { formatToRupees } from "@/util/currency";
import { NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, RefObject } from "react";

export function Header() {
  
  const [isVisible,setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement | null>(null);

  const session = useSession(); 
  const userId = session?.data?.user?.id;

  return (
    <div className="bg-gray-200 py-4">
      <div className="container flex justify-between items-center flex-end">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-2 ">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          BidBuddy.com
          </Link>

        <div className="flex items-center gap-8">
          <Link 
              href="/" 
              className="hover:underline flex items-center gap-1"
          >
              All Auctions
          </Link>

          {userId && (
              <>
          <Link 
            href="/items/create" 
            className="hover:underline flex items-center gap-1"
          >
            Create Auction
          </Link>
          
          
          <Link 
            href="/auctions" 
            className="hover:underline flex items-center gap-1">
            My Auctions
          </Link>
          </>
        )}
        </div>
        </div>
        <div className="flex items-center gap-4 ">
          {userId &&(
            <>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
              <NotificationFeedPopover
              
                buttonRef={notifButtonRef as RefObject<HTMLElement>}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => ( 
                  <NotificationCell key={item.id} {...props} item={item}>
                    
                      <div className="bg-gray-100 rounded-xl p-2">
                        <Link 
                          onClick={() => setIsVisible(false)}
                          href={item.data?.itemId ? `/items/${item.data.itemId}` : "#"}
                        >
                          Someone outbidded you on{" "}
                          <span className="font-bold">{item.data?.itemName ?? "an item"}</span>{" "}
                          by ₹{formatToRupees(item.data?.bidAmount ?? 0)}
                        </Link>
                      </div>                    
                  </NotificationCell>
                )}
                
              />
            </>
            
          )} 
          {session?.data?.user.image&& (      
          <Image
          src={session.data.user.image}
          width={40}
          height={40}
          alt="user avatar"
          className="rounded-full"
          />
          )}
          <div>{session?.data?.user?.name}
          </div>
          <div>
            {userId ? (
            <Button 
            onClick={() =>
               signOut({
                callbackUrl: "/",
               })
               }
               >
                Sign Out
              </Button> 
              ) : (  
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
