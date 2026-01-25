import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { _type: string; asset: { _ref: string } }) {
  return builder.image(source);
}
