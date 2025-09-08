"use client";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

import { SupportEmailAddress } from "@/components/ui/copy-email";
import { SHOW_GLOBAL_ANNOUNCEMENT } from "@/constants/constants";
import { GlobalAnnouncement } from "@/components/ui/global-annoucement";

export default function NotFoundComponent() {
  return (
    <div className="min-h-screen flex font-body flex-col items-center justify-center text-center px-4">
      <div className="flex gap-2 items-center mb-4">
        <Image
          src="/logo-lighter.png"
          alt={`Page not found`}
          width={400}
          height={400}
          className="size-12"
        />
        <h1 className="text-3xl font-bold  text-primary">Page not found</h1>
        <Image
          src="/logo-lighter.png"
          alt={`Page not found`}
          width={400}
          height={400}
          className="size-12"
        />
      </div>

      <div className="text-muted-foreground mb-8 text-sm max-w-md">
        <p className="mb-1">
          The Page you&apos;re looking for doesn&apos;t exist or has been
          unpublished.
        </p>

        <p>
          Mistake? Please reach out: <SupportEmailAddress />
        </p>

        {SHOW_GLOBAL_ANNOUNCEMENT && (
          <div className="text-sm text-muted-foreground my-4">
            {GlobalAnnouncement}
          </div>
        )}
      </div>

      <Link
        href={"/"}
        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-lighter 
        hover:scale-105 transition-all duration-200
        flex flex-row gap-1 items-center font-bold"
      >
        <FaChevronLeft className="translate-y-[1px]" /> Homepage
      </Link>
    </div>
  );
}
