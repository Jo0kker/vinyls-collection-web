import { Badge } from "@components/Badge";
import { useEffect, useState } from "react";
import { useBearStore } from "@store/useBearStore";

export async function getStatsBanner() {
  const res = await fetch("http://localhost:8000/api/health");
  return await res.json();
}

export default function Banner() {
  return (
    <div className="inset-x-0 bottom-0 pb-2 sm:pb-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-black bg-opacity-10 p-2 shadow-lg sm:p-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <p className="ml-3 truncate font-medium text-white">
                <span className="lg:hidden text-red-500">
                  Le site fait peau neuve!
                </span>
                <span className="hidden lg:inline text-red-500">
                  Vous l'attendiez tous la nouvelle version du site est
                  disponible.
                </span>
              </p>
            </div>
            <div className="hidden md:flex gap-1 order-2 flex-shrink-0 sm:order-3 sm:ml-2 ">
              <Badge>
                <span className={"text-orange-500"}>3878 collectionneurs</span>
              </Badge>
              <Badge>
                <span className={"text-green-500"}>13488 collections</span>
              </Badge>
              <Badge>
                <span className={"text-blue-400"}>696766 disques</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
