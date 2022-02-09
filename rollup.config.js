import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs-extra';
import ps from 'path';

export default {
    input: 'md5-ts',
    output: [{
        file: './lib/md5-ts-bundle.js',
        format: 'esm',
    }],
    plugins: [
        resolve({}),
        {
            name: 'types',
            async renderStart({ file }) {
                await fs.outputFile(ps.join(ps.dirname(file), 'package.json'), `{ "type": "module" }\n`, 'utf8');
                await fs.outputFile(file.replace(/\.js$/, '.d.ts'), `export * from 'md5-ts';\n`, 'utf8');
            },
        },
    ],
};