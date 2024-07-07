import { SignedIn, SignedOut } from '@clerk/nextjs';
// import Image from 'next/image';
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; // This force the front to reload when new data is passed.

async function Gallery() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48 p-4 flex flex-col">
          <img src={image.url} style={{ objectFit: "contain" }} alt={image.name} width={192} height={192} />
          <div>{image.name}</div>
        </div>
      ))
      }
    </div>
  )
}


export default async function HomePage() {

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl p-4 text-center">Please Sign In to access the Gallery</div>
      </SignedOut>
      <SignedIn>
        <Gallery />
      </SignedIn>
    </main>
  );
}
