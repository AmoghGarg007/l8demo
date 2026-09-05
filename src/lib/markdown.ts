/**
 * Minimal Markdown -> HTML for Layer8 blog posts.
 *
 * Ported from the standalone blog site's js/markdown.js. It only covers the
 * subset used in content/blogs: ATX headings, fenced code blocks, blockquotes
 * (rendered as .callout), unordered + ordered lists, and inline bold / italic /
 * code / links. The markdown is first-party content committed to this repo, so
 * the result is rendered with dangerouslySetInnerHTML.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Sanitise a markdown link target before it goes into an href.
 * `&`, `<`, `>` are already entity-escaped by escapeHtml upstream; here we
 * (1) reject dangerous schemes (javascript:/data:/vbscript:/file:), collapsing
 * whitespace first so a scheme can't be obfuscated ("java\tscript:"), and
 * (2) entity-escape the quote chars so a URL can't break out of href="...".
 */
function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  const scheme = trimmed.replace(/\s+/g, "").toLowerCase();
  if (/^(javascript|data|vbscript|file):/.test(scheme)) return "#";
  return trimmed
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "%60");
}

function inlineFormat(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/`([^`]+?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_m, label: string, url: string) =>
        `<a href="${sanitizeUrl(url)}" target="_blank" rel="noreferrer">${label}</a>`,
    );
}

export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inCode = false;
  let codeBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listType && listBuffer.length > 0) {
      html += `<${listType}>${listBuffer.join("")}</${listType}>\n`;
    }
    listType = null;
    listBuffer = [];
  };

  const flushCode = () => {
    html += `<div class="code-block">${escapeHtml(codeBuffer.join("\n"))}</div>\n`;
    codeBuffer = [];
  };

  for (const line of lines) {
    // fenced code blocks
    if (line.trimStart().startsWith("```")) {
      if (!inCode) {
        flushList();
        inCode = true;
        codeBuffer = [];
      } else {
        inCode = false;
        flushCode();
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    // blank line
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // headings
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushList();
      html += `<h${heading[1].length}>${inlineFormat(heading[2])}</h${heading[1].length}>\n`;
      continue;
    }

    // blockquote -> callout
    if (line.trimStart().startsWith("> ")) {
      flushList();
      html += `<div class="callout">${inlineFormat(line.replace(/^\s*>\s*/, ""))}</div>\n`;
      continue;
    }

    // unordered list
    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(`<li>${inlineFormat(ul[1])}</li>`);
      continue;
    }

    // ordered list
    const ol = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ol) {
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(`<li>${inlineFormat(ol[1])}</li>`);
      continue;
    }

    // paragraph
    flushList();
    html += `<p>${inlineFormat(line)}</p>\n`;
  }

  flushList();
  if (inCode && codeBuffer.length > 0) flushCode();

  return html;
}
