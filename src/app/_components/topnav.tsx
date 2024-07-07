"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthings";

export function TopNav() {
    const router = useRouter();

    return (
        <nav className="w-full flex justify-between items-center p-4 font-semibold text-xl border-b">
            <div >Gallery</div>

            <div className="flex flex-rows">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={() => {
                            router.refresh();
                        }}
                    />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
