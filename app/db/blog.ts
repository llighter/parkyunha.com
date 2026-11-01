import fs from "fs";
import path from "path";
import { POST_TYPES } from "@/lib/constants";
import type { BlogPost } from "@/lib/types";

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
 * type 은 필수 — MDX 의 metadata 는 타입 검사를 받지 않으므로 여기서 막는다 (빌드가 멈춘다)
 */
function assertPostType(post: BlogPost) {
  if (!Object.hasOwn(POST_TYPES, post.metadata.type)) {
    throw new Error(
      `${post.slug}: metadata.type 은 ${Object.keys(POST_TYPES).join(" · ")} 중 하나여야 한다 (지금 ${post.metadata.type})`,
    );
  }
}

/**
 * 전체 블로그 글 목록 가져오기
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const folders = getMDXFolders(BLOG_DIR);

  const posts = await Promise.all(
    folders.map((folder) => getMetadataFromMDX(folder)),
  );

  const loaded = posts.filter((post): post is BlogPost => post !== null); // null 제거
  loaded.forEach(assertPostType); // 숨긴 글도 검사한다

  return loaded
    .filter((post) => !post.metadata.hidden) // 테스트 · 초안은 목록 · sitemap 에서 뺀다
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });
}

/**
 * 시리즈 하나의 글 — 최근 순 (getBlogPosts 와 같은 순서, 숨긴 글 제외)
 */
export async function getSeriesPosts(series: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.metadata.series === series);
}

/**
 * 글 하나의 metadata — 숨긴 글도 돌려준다(주소로는 열리므로). 없는 slug 면 null
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await getMetadataFromMDX(slug);
  if (post) assertPostType(post);
  return post;
}
