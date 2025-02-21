import { signOut } from "@/auth";
import { Button } from "@/components/ui/button"; 
 
export function SignOut(p0: { callbackUrl: string; }) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo: "/",
        })
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}