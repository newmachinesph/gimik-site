// Crop the Android navigation bar off each capture and emit webp.
//
// screencap gives the whole physical display, which includes the system
// gesture/button bar at the bottom. That belongs to the phone, not to Gimik, so
// it is cropped away before the image reaches the site. The result is written
// as webp because these are large flat-colour UI screens and png costs about
// six times as much for no visible gain.
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] ?? './screens-raw';
const DEST = './public/app-screens';

// The two bands that belong to the phone rather than to Gimik, in device pixels
// on the capture device. Both are cropped away: the site renders these captures
// inside an iPhone chassis, so an Android status bar and gesture bar inside that
// frame would read as a mistake. The chassis supplies its own status band.
const STATUS_BAR_PX = 90;
const NAV_BAR_PX = 128;

const files = (await readdir(SRC)).filter((f) => f.endsWith('.png')).sort();
if (files.length === 0) {
  console.error(`No .png files in ${SRC}. Run ./scripts/capture-screens.sh first.`);
  process.exit(1);
}

await mkdir(DEST, { recursive: true });

for (const file of files) {
  const image = sharp(join(SRC, file));
  const { width, height } = await image.metadata();
  const out = join(DEST, `${parse(file).name}.webp`);

  await image
    .extract({
      left: 0,
      top: STATUS_BAR_PX,
      width,
      height: height - STATUS_BAR_PX - NAV_BAR_PX,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);

  console.log(
    `  ${file}  ->  ${out}  (${width}x${height - STATUS_BAR_PX - NAV_BAR_PX})`,
  );
}

console.log(`\n${files.length} screens written to ${DEST}`);
