import {readFileSync} from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../../../package.json'), 'utf-8'));

export function infoHandler(request, response) {
    response.json({
        app: {
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
        },
    });
}