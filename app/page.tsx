import fs from "fs";
import path from "path";
import ShowcaseClient from "@/app/ShowcaseClient";

function getHtmlFiles(): string[] {
  const htmlsDir = path.join(process.cwd(), "public", "htmls");
  try {
    const files = fs.readdirSync(htmlsDir);
    return files.filter((f) => f.endsWith(".html"));
  } catch {
    return [];
  }
}

export default function Home() {
  const files = getHtmlFiles();
  return <ShowcaseClient files={files} />;
}
