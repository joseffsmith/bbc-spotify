import axios from "https://esm.sh/axios";
import cheerio from "https://esm.sh/cheerio";

export const main = async (brandId: string = "b01dmw9x") => {
  const url = "https://www.bbc.co.uk/sounds/brand/";
  const { data: body } = await axios.get(url + brandId);

  const $ = cheerio.load(body);

  const blobRegex = /__PRELOADED_STATE__/;
  const blobs: string[] = [];
  $("script").each(function () {
    if (blobRegex.test($(this).text())) {
      blobs.push($(this).text());
    }
  });

  const blob = blobs[0];
  const obj = JSON.parse(
    blob.substring(blob.indexOf("{"), blob.lastIndexOf(";")),
  );

  const list = obj.modules.data[1];

  const shows = list.data;

  return shows.map((s: any) => {
    return {
      brand_id: brandId,
      show_id: s.urn.split(":").at(-1),
      release_timestamp: s.release.date,
      name: s.titles.primary,
      backup_name: s.titles.secondary,
      image_url: s.image_url.replace("{recipe}", "512x512"),
      duration_seconds: s.duration.value,
    };
  });
};
