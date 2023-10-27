import React from "react";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

import PlatformFinder from "@/components/socialPlatformList";
import { cn } from "@/lib/utils";


interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      socials: true,
    },
  });
  if (!user) {
    return <div>User can't be found</div>;
  }

  return (
    <div className="w-full h-fit ">
      <div className=" md:grid md:grid-cols-3 border-2 border-red-900 min-w-full h-fit w-fit min-h-screen pt-14">
        {user.profilepic ? <div className="flex items-center mt-5 md:mt-0 justify-center col-span-1">
          <Image
            src={user?.profilepic as string}
            width={100}
            height={100}
            className=" shadow-[rgba(17,_17,_26,_0.1)_0px_0px_30px]  inset-0 spread-x-4 shadow-mid rounded-full lg:w-80 lg:h-80 md:w-60 md:h-60 w-48 h-48  fill"
            alt={user?.name as string}
          />
        </div> : null}
        <div className={cn(" px-2 flex flex-col md:pr-10 items-center justify-center", user.profilepic ? "col-span-2" : "col-span-3")}>
          <div className=" text-center items-center flex flex-col h-full py-3 justify-between w-5/6 ">

            <p className="text-sm my-5 ">Hey I am</p>


            <p className="text-6xl my-5  text-light">
              {user?.name}{" "}
              <Link href={`/${user.username}`} className="text-xs  hidden md:block text-dark">
                @{user?.username}
              </Link>
            </p>

            <p className="  my-3  flex justify-center items-center  w-5/6 max-h-[100px]">
              {user.bio}
            </p>
            {user.labels.length > 0 ? <div className="my-3 flex items-center justify-center gap-2 flex-wrap max-h-[100px]">
              {user.labels.map(label => <div key={label} className="py-2 px-3 rounded-3xl bg-mid text-darkest">{label}</div>)}
            </div> : null}

            <div className="my-3 px-3 md:px-6">
              <div className="  max-w-fit gap-3 md:gap-7 flex flex-wrap ">
                {user.socials.length > 0 ? user.socials.map(social => <Link href={social.url} target="_blank" className="rounded-full bg-light p-2  border-mid hover:scale-105 shadow-mid  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] w-10 h-10" key={social.url}><PlatformFinder social={social as any} /></Link>


                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
