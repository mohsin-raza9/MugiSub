const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add imports safely
if (!content.includes('CurrentSeasonList')) {
  content = content.replace(
    'import News from "@/components/News";',
    'import News from "@/components/News";\nimport CurrentSeasonList from "@/components/CurrentSeasonList";\nimport AnimeColumnList from "@/components/AnimeColumnList";'
  );
}

// 2. Remove ONLY specific arrays by finding their exact block boundaries
function removeArray(content, arrayName) {
  const startIdx = content.indexOf(`const ${arrayName} = [`);
  if (startIdx === -1) return content;
  
  // find the corresponding '];'
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0 && content.substring(i, i+2) === '];') {
      endIdx = i + 2;
      break;
    }
  }
  if (endIdx !== -1) {
    return content.substring(0, startIdx) + content.substring(endIdx);
  }
  return content;
}

content = removeArray(content, 'currentSeasonAnime');
content = removeArray(content, 'currentPopularAnime');
content = removeArray(content, 'latestAnime');
content = removeArray(content, 'popularAnime');
content = removeArray(content, 'trendingAnime');

// 3. Replace JSX Sections
const startSection3 = content.indexOf('{/* 3. Current Season Section */}');
const endSection3 = content.indexOf('{/* 4. Split-Column Layout: Recent Releases & Airing Soon */}');
if (startSection3 !== -1 && endSection3 !== -1) {
  content = content.substring(0, startSection3) + '<CurrentSeasonList />\n\n        ' + content.substring(endSection3);
}

const startSection5 = content.indexOf('{/* 5. 4-Column Horizontal List Section */}');
const endSection5 = content.indexOf('</div>\n\n      {/* Footer component */}');
if (startSection5 !== -1 && endSection5 !== -1) {
  const replacement = `{/* 5. 4-Column Horizontal List Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <AnimeColumnList category="current-popular" title="Current Popular Anime" />
          <AnimeColumnList category="latest" title="Latest Anime" />
          <AnimeColumnList category="popular" title="Popular Anime" />
          <AnimeColumnList category="trending" title="Trending Anime" />
        </div>\n\n      `;
  content = content.substring(0, startSection5) + replacement + content.substring(endSection5);
}

fs.writeFileSync('src/app/page.tsx', content);
