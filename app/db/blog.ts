import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  category: string;
  summary: string;
  image?: string;
  imageDescription?: string;
};

type BlogPost = {
  slug: string;
  metadata: Metadata;
};

const BLOG_DIR = path.join(process.cwd(), "app/blog/(post)");

/**
 * MDX 파일 경로 탐색
 */
function getMDXFolders(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((folder) => fs.statSync(path.join(dir, folder)).isDirectory());
}

/**
 * MDX 파일에서 metadata 가져오기
 */
async function getMetadataFromMDX(folder: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, folder, "page.mdx");

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }

  try {
    const { metadata } = await import(`../blog/(post)/${folder}/page.mdx`);

    return {
      slug: folder, // 폴더 이름을 slug로 사용
      metadata,
    };
  } catch (error) {
    console.error(`Error importing metadata from ${filePath}:`, error);
    return null;
  }
}

/**
 * 전체 블로그 글 목록 가져오기
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const folders = getMDXFolders(BLOG_DIR);

  const posts = await Promise.all(
    folders.map((folder) => getMetadataFromMDX(folder))
  );

  return posts
    .filter((post): post is BlogPost => post !== null) // null 제거
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });
}
