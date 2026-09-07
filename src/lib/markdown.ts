/**
 * Minimal Markdown -> HTML for Layer8 blog posts.
 *
 * Ported from the standalone blog site's js/markdown.js. It only covers the
 * subset used in content/blogs: ATX headings, fenced code blocks, blockquotes
 * (rendered as .callout), unordered + ordered lists, and inline bold / italic /
 * code / links. The markdown is first-party content committed to this repo, so
 * the result is rendered with dangerouslySetInnerHTML — but link targets are
 * still sanitised so a post can't inject script.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Allowlist a link target. Only http(s), mailto, in-page anchors and
 * root-relative paths become real hrefs; everything else (javascript:,
 * data:, vbscript:, blob:, …) collapses to "#". Whitespace is stripped
 * before the scheme test so it can't be obfuscated ("java\tscript:"), and
 * quote chars are entity-escaped so the value can't break out of href="…".
 */
function sanitizeUrl(url: string): string {
  const probe = url.replace(/\s+/g, "").toLowerCase();
  const ok =
    probe.startsWith("http://") ||
    probe.startsWith("https://") ||
    probe.startsWith("mailto:") ||
    probe.startsWith("#") ||
    probe.startsWith("/");
  if (!ok) return "#";
  return url
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "%60");
}

function formatSegment(seg: string): string {
  return seg
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(
      // URL: <...> autolink form, or a space-free target with balanced ()
      /\[([^\]]+)\]\((<[^>]*>|[^()\s]*(?:\([^()]*\)[^()\s]*)*)\)/g,
      (_m, label: string, rawUrl: string) => {
        const target = rawUrl.replace(/^<([\s\S]*)>$/, "$1").trim();
        const external = /^https?:\/\//i.test(target);
        const attrs = external ? ' target="_blank" rel="noreferrer"' : "";
        return `<a href="${sanitizeUrl(target)}"${attrs}>${label}</a>`;
      },
    );
}

function inlineFormat(text: string): string {
  // Split on inline-code spans (kept via the capture group) so the
  // bold/italic/link passes never run inside `code`.
  return escapeHtml(text)
    .split(/(`[^`]+?`)/g)
    .map((part, i) =>
      i % 2 === 1 ? `<code>${part.slice(1, -1)}</code>` : formatSegment(part),
    )
    .join("");
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
