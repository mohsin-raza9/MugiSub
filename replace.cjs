const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  'import News from "@/components/News";\n',
  'import News from "@/components/News";\nimport CurrentSeasonList from "@/components/CurrentSeasonList";\nimport AnimeColumnList from "@/components/AnimeColumnList";\n'
);

// 2. Remove hardcoded arrays and unused variables
content = content.replace(/const currentSeasonAnime = \[[\s\S]*?\];\s*const recentReleases = \[[\s\S]*?\];\s*const airingSoon = \[[\s\S]*?\];\s*const currentPopularAnime = \[[\s\S]*?\];\s*const latestAnime = \[[\s\S]*?\];\s*const popularAnime = \[[\s\S]*?\];\s*const trendingAnime = \[[\s\S]*?\];/g, '');

// 3. Replace Current Season section
content = content.replace(/\{\/\* 3\. Current Season Section \*\/\}[\s\S]*?\{\/\* 4\. Split-Column Layout: Recent Releases & Airing Soon \*\/\}/, '<CurrentSeasonList />\n\n        {/* 4. Split-Column Layout: Recent Releases & Airing Soon */}');

// 4. Replace 4-Column Horizontal List Section
content = content.replace(/\{\/\* 5\. 4-Column Horizontal List Section \*\/\}[\s\S]*?<\/div>\s*\{\/\* Footer component \*\/\}/, '{/* 5. 4-Column Horizontal List Section */}\n        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">\n          <AnimeColumnList category="current-popular" title="Current Popular Anime" />\n          <AnimeColumnList category="latest" title="Latest Anime" />\n          <AnimeColumnList category="popular" title="Popular Anime" />\n          <AnimeColumnList category="trending" title="Trending Anime" />\n        </div>\n\n      </div>\n\n      {/* Footer component */}');

fs.writeFileSync('src/app/page.tsx', content);
