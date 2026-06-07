const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /\{\/\* 5\. 4-Column Horizontal List Section \*\/\}[\s\S]*?<\/div>\s*\{\/\* Footer component \*\/\}/;

const replacement = `{/* 5. 4-Column Horizontal List Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <AnimeColumnList category="current-popular" title="Current Popular Anime" />
          <AnimeColumnList category="latest" title="Latest Anime" />
          <AnimeColumnList category="popular" title="Popular Anime" />
          <AnimeColumnList category="trending" title="Trending Anime" />
        </div>

      </div>

      {/* Footer component */}`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/app/page.tsx', content);
