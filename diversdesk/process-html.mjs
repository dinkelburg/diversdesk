import fs from 'node:fs/promises'
import { globby } from 'globby'
import { minify } from 'html-minifier-terser'

// Get all HTML files from the output directory
const path = './.vercel/output/static'
const files = await globby(`${path}/**/*.html`)
const vercelConfigPath = './.vercel/output/config.json'

await Promise.all(
    files.map(async (file) => {
   	 console.log('Processing file:', file)
   	 let html = await fs.readFile(file, 'utf-8')

   	 // Minify the HTML
   	 html = await minify(html, {
   		 removeComments: true,
   		 preserveLineBreaks: true,
   		 collapseWhitespace: true,
		 minifyJS: false
   	 })
   	 await fs.writeFile(file, html)
    })
)

const vercelConfig = JSON.parse(await fs.readFile(vercelConfigPath, 'utf-8'))

for (const route of vercelConfig.routes ?? []) {
	if (route.status === 301 && typeof route.src === 'string' && route.src.startsWith('^/') && route.src.endsWith('$') && !route.src.endsWith('/?$')) {
		route.src = `${route.src.slice(0, -1)}/?$`
	}
}

await fs.writeFile(vercelConfigPath, `${JSON.stringify(vercelConfig, null, 2)}\n`)