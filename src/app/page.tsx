import Image from 'next/image';
import { db } from "~/server/db";


const mockUrls = [
  'https://utfs.io/f/fed619db-a824-4bda-a060-ab8ebbf7ba04-2dks.avif',
  'https://utfs.io/f/d8a40b76-eac8-41c8-a75c-48163ceba96b-2dkt.avif',
  'https://utfs.io/f/b964aa3e-0384-4f74-b148-3ff4d7cfc038-2rc.avif',
  'https://utfs.io/f/2833efce-b889-45de-a8e4-0a76fe2c83ec-2dkr.avif',
  'https://utfs.io/f/52ae9049-fb6e-48d0-a185-dee0bbb6dc28-2dkq.avif'
];

const mockImages = mockUrls.map((url, index) => ({
  id: index,
  url
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48 p-4">
            <p>{post.name}</p>
          </div>
        ))}

        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image, idx) => (
          <div key={image.id + '-' + idx} className="w-48 p-4">
            <Image src={image.url} alt={`image about ${idx}`} width={192} height={192} />
          </div>
        ))
        }
      </div>
      <h1>Hello! ( Gallery in progress... )</h1>
    </main>
  );
}
