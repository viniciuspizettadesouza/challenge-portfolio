import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const portfolioRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(portfolioRoot, "../..");
const screenshotDirectory = resolve(
  repositoryRoot,
  "docs/portfolio/screenshots",
);
const projectImageDirectory = resolve(portfolioRoot, "public/images/projects");
const socialImageDirectory = resolve(portfolioRoot, "public/images/social");
const entries = JSON.parse(
  await readFile(
    resolve(repositoryRoot, "docs/portfolio/entries.json"),
    "utf8",
  ),
);

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function wrapTitle(title, limit = 13) {
  const words = title.split(" ");
  const lines = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > limit) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 3);
}

function projectFrame(entry) {
  const titleLines = wrapTitle(entry.title);
  const title = titleLines
    .map(
      (line, index) =>
        `<text x="64" y="${244 + index * 68}" class="title">${escapeXml(line)}</text>`,
    )
    .join("");
  const themes = escapeXml(entry.themes.slice(0, 2).join(" · ").toUpperCase());

  return Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0b0d0c"/>
      <circle cx="190" cy="40" r="300" fill="#b8f34a" opacity="0.08"/>
      <rect x="64" y="72" width="48" height="6" rx="3" fill="#b8f34a"/>
      <style>
        .brand { fill: #b8f34a; font: 700 20px Arial, sans-serif; letter-spacing: 2px; }
        .theme { fill: #a4ada6; font: 700 17px Arial, sans-serif; letter-spacing: 1px; }
        .title { fill: #f2f5ef; font: 650 56px Arial, sans-serif; }
        .footer { fill: #a4ada6; font: 400 18px Arial, sans-serif; }
      </style>
      <text x="64" y="118" class="brand">CHALLENGE PORTFOLIO</text>
      <text x="64" y="174" class="theme">${themes}</text>
      ${title}
      <text x="64" y="558" class="footer">Interactive demo · Preserved source</text>
      <rect x="526" y="54" width="674" height="522" fill="#303732"/>
    </svg>
  `);
}

function portfolioFrame() {
  return Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0b0d0c"/>
      <circle cx="180" cy="40" r="330" fill="#b8f34a" opacity="0.09"/>
      <rect x="64" y="72" width="48" height="6" rx="3" fill="#b8f34a"/>
      <style>
        .eyebrow { fill: #b8f34a; font: 700 20px Arial, sans-serif; letter-spacing: 2px; }
        .title { fill: #f2f5ef; font: 650 64px Arial, sans-serif; }
        .copy { fill: #a4ada6; font: 400 23px Arial, sans-serif; }
      </style>
      <text x="64" y="125" class="eyebrow">A LIVING WORK ARCHIVE</text>
      <text x="64" y="244" class="title">Challenge</text>
      <text x="64" y="316" class="title">Portfolio</text>
      <text x="64" y="398" class="copy">9 curated entries.</text>
      <text x="64" y="432" class="copy">23 preserved sources.</text>
    </svg>
  `);
}

async function removeDemoToolbar(source) {
  const { data, info } = await sharp(source)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const matchingRows = [];
  const scanStart = Math.max(0, info.width - 280);
  const scanEnd = info.width - 20;

  for (let y = 0; y < info.height; y += 1) {
    let accentPixels = 0;
    for (let x = scanStart; x < scanEnd; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      if (green > 150 && green > red * 1.15 && green > blue * 1.4) {
        accentPixels += 1;
      }
    }
    if (accentPixels > 40) matchingRows.push(y);
  }

  const runs = [];
  for (const row of matchingRows) {
    const current = runs.at(-1);
    if (current && row === current.end + 1) current.end = row;
    else runs.push({ start: row, end: row });
  }
  const button = runs.find(({ start, end }) => end - start >= 20);
  if (!button)
    throw new Error(`Could not locate the demo toolbar in ${source}`);

  const toolbarTop = Math.max(0, button.start - 13);
  const toolbarBottom = Math.min(info.height, button.end + 14);
  const toolbarHeight = toolbarBottom - toolbarTop;
  const sections = [];

  if (toolbarTop > 0) {
    sections.push({
      input: await sharp(source)
        .extract({ left: 0, top: 0, width: info.width, height: toolbarTop })
        .png()
        .toBuffer(),
      left: 0,
      top: 0,
    });
  }
  if (toolbarBottom < info.height) {
    sections.push({
      input: await sharp(source)
        .extract({
          left: 0,
          top: toolbarBottom,
          width: info.width,
          height: info.height - toolbarBottom,
        })
        .png()
        .toBuffer(),
      left: 0,
      top: toolbarTop,
    });
  }

  return sharp({
    create: {
      width: info.width,
      height: info.height - toolbarHeight,
      channels: 4,
      background: "#0b0d0c",
    },
  })
    .composite(sections)
    .png()
    .toBuffer();
}

await Promise.all([
  mkdir(projectImageDirectory, { recursive: true }),
  mkdir(socialImageDirectory, { recursive: true }),
]);

for (const entry of entries) {
  const source = resolve(screenshotDirectory, `${entry.slug}.png`);
  const cleanSource = await removeDemoToolbar(source);
  const thumbnail = resolve(projectImageDirectory, `${entry.slug}.webp`);
  const social = resolve(socialImageDirectory, `${entry.slug}.png`);
  const socialPreview = await sharp(cleanSource)
    .resize(640, 502, { fit: "cover", position: "north" })
    .png()
    .toBuffer();

  await Promise.all([
    sharp(cleanSource)
      .resize(800, 500, { fit: "cover", position: "north" })
      .webp({ quality: 82 })
      .toFile(thumbnail),
    sharp({
      create: { width: 1200, height: 630, channels: 3, background: "#0b0d0c" },
    })
      .composite([
        { input: projectFrame(entry), left: 0, top: 0 },
        { input: socialPreview, left: 544, top: 64 },
      ])
      .png({ compressionLevel: 9 })
      .toFile(social),
  ]);
}

const featured = entries
  .filter(({ featuredRank }) => featuredRank)
  .sort((left, right) => left.featuredRank - right.featuredRank);
if (featured.length !== 3)
  throw new Error("Exactly three featured entries are required.");

const featuredPreviews = await Promise.all(
  featured.map(async (entry) =>
    sharp(
      await removeDemoToolbar(
        resolve(screenshotDirectory, `${entry.slug}.png`),
      ),
    )
      .resize(208, 374, { fit: "cover", position: "north" })
      .png()
      .toBuffer(),
  ),
);

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#0b0d0c" },
})
  .composite([
    { input: portfolioFrame(), left: 0, top: 0 },
    ...featuredPreviews.map((input, index) => ({
      input,
      left: 504 + index * 224,
      top: 128,
    })),
  ])
  .png({ compressionLevel: 9 })
  .toFile(resolve(socialImageDirectory, "portfolio.png"));

const expected = [
  ...entries.map((entry) =>
    resolve(projectImageDirectory, `${entry.slug}.webp`),
  ),
  ...entries.map((entry) => resolve(socialImageDirectory, `${entry.slug}.png`)),
  resolve(socialImageDirectory, "portfolio.png"),
];
for (const imagePath of expected) {
  const metadata = await sharp(imagePath).metadata();
  const isThumbnail = imagePath.endsWith(".webp");
  const expectedSize = isThumbnail ? [800, 500] : [1200, 630];
  if (
    metadata.width !== expectedSize[0] ||
    metadata.height !== expectedSize[1]
  ) {
    throw new Error(`Unexpected dimensions for ${imagePath}`);
  }
}

console.log(
  `Generated ${entries.length} thumbnails and ${entries.length + 1} social images.`,
);
