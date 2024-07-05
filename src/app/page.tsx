import Image from 'next/image';
import { db } from "~/server/db";

export const dynamic = "force-dynamic"; // This force the front to reload when new data is passed.

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48 p-4 flex flex-col">
            <Image src={image.url} alt={image.name} width={192} height={192} />
            <div>{image.name}</div>
          </div>
        ))
        }
      </div>
    </main>
  );
}
