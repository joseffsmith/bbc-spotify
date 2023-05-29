import axios from "https://esm.sh/axios";
import cheerio from "https://esm.sh/cheerio";

export const getSongs = async (showId: string = "m001lvx7") => {
  const url = "https://www.bbc.co.uk/sounds/play/";
  const { data: body } = await axios.get(url + showId);

  const $ = cheerio.load(body);

  const blobRegex = /spotify/;
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

  const tracklist = obj.modules.data[1];
  if (tracklist.title !== "Tracklist") {
    throw new Error("Tracklist title mismatch");
  }
  const tracks = tracklist.data;

  const to_insert: any[] = [];
  // console.log(tracks[0]);
  for (const track of tracks) {
    const links = track.uris;
    const poss_spot = links.filter((l: { uri: string | string[] }) =>
      l.uri.includes("spotify")
    ).map(
      (l: { uri: string }) => l.uri,
    );
    const uri: string | undefined = poss_spot[0];

    const newTrack = {
      "generated_id": showId + track.titles.primary + track.titles.secondary +
        track.titles.tertiary,
      "name": track.titles.secondary,
      "backup_name": track.titles.tertiary,
      "artist": track.titles.primary,
      "spotify_url": uri,
      spotify_id: uri?.split("/").at(-1) ?? null,
      "show_id": showId,
    };
    to_insert.push(newTrack);
  }
  return to_insert;
};
