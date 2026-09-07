// Regenerates the responsive WebP variants in public/img from the full-size
// masters in img-source/. Run with `yarn images` after adding or replacing a
// photo. Only public/img is deployed; img-source/ never ships.
//
// sharp is held at 0.33.x on purpose. It is a dev-only tool that the site
// build never touches, but Netlify still installs it, and 0.34+ requires Node
// >=20.9 while the Netlify environment runs Node 18. A newer sharp fails the
// dependency install and takes the whole deploy down. Raise the Node version
// there before raising this.
//
// Widths are chosen from how each image is actually laid out in style.css, at
// up to 2x device pixel ratio. If the layout changes, change these too.
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'img-source');
const OUT = path.join(root, 'public', 'img');

const jobs = [
  // Full-bleed hero images on the index page (100vw).
  { file: 'starlaces-shoelaces-star.jpeg', widths: [800, 1400, 2000, 2500], quality: 72 },
  { file: 'starlaces-pronouns.jpeg', widths: [800, 1400, 2000, 2500], quality: 72 },
  // Header logo: a 320px box, up to 3x DPR. Single width on purpose - see the
  // comment in components/star-header.vue for why it must not use a srcset.
  { file: 'starlaces.png', widths: [960], quality: 80 },
];

// Product grid: 25vw above 1000px, 50vw below, so ~540px CSS at most. The
// 1440w variant only exists so a large retina display is never served fewer
// pixels than the original PNG gave it.
for (const entry of await readdir(path.join(SRC, 'products'))) {
  if (/\.(png|jpe?g)$/i.test(entry)) {
    jobs.push({ file: path.join('products', entry), widths: [480, 960, 1440], quality: 78 });
  }
}

let sourceBytes = 0;
let outputBytes = 0;

for (const job of jobs) {
  const input = path.join(SRC, job.file);
  const meta = await sharp(input).metadata();
  sourceBytes += (await stat(input)).size;

  const base = job.file.replace(/\.(png|jpe?g)$/i, '');
  await mkdir(path.join(OUT, path.dirname(job.file)), { recursive: true });

  const written = [];
  for (const width of job.widths) {
    if (width > meta.width) continue;
    const output = path.join(OUT, `${base}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      // The product cutouts have real transparency, so WebP (not JPEG) is what
      // lets them stay small without losing the alpha channel.
      .webp({ quality: job.quality, alphaQuality: 90, effort: 6 })
      .toFile(output);
    const { size } = await stat(output);
    outputBytes += size;
    written.push(`${width}w ${(size / 1024).toFixed(0)}KB`);
  }

  console.log(`${job.file.padEnd(30)} ${meta.width}x${meta.height}  ->  ${written.join('  ')}`);
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;
console.log(`\nmasters ${mb(sourceBytes)}  ->  variants ${mb(outputBytes)}`);
