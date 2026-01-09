import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className="h1-bold">Welcome to the world of nextjs</h1>
      <form
        className="px-10 pt-25"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
      {session?.user && (
        <div className="mt-6 flex items-center gap-4">
          <Image
            src={session.user.image!}
            alt={session.user.name || "User Avatar"}
            width={80}
            height={80}
            className="rounded-full"
          />

          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
