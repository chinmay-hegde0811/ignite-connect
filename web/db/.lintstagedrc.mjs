import * as fs from 'fs';
import micromatch from 'micromatch';

const path = './db';
const extensions = 'ts';
const rootFolder = 'src';

/**
 * Generate a temp tsconfig file with staged files as included
 * @param {*} stagedFilenames
 * @returns command string to check compilation error in typescript files.
 */
const generateTSConfig = (stagedFilenames) => {
  const tsconfigFile = fs.readFileSync(`${path}/tsconfig.json`, 'utf8');
  const tsconfig = JSON.parse(tsconfigFile);
  tsconfig.include = stagedFilenames;
  fs.writeFileSync(`${path}/tsconfig.lint.json`, JSON.stringify(tsconfig));
  return `tsc --noEmit --project tsconfig.lint.json`;
};

/**
 * Validate if any ignite files restricted to this repository is being edited.
 * @param {*} stagedFilenames
 * @returns throws error or return printing success message.
 */
const validateIgniteFiles = (stagedFilenames) => {
  //read package json and get the restricted folders and files.
  const packageJsonFile = fs.readFileSync(`${path}/package.json`, 'utf8');
  const packageJson = JSON.parse(packageJsonFile);
  const restrictedFolders = packageJson.ignite.restrictedFolders;
  const restrictedFiles = packageJson.ignite.restrictedFiles;

  //generate pattern and run match for restricted folders and files.
  const restrictedFoldersPattern = restrictedFolders
    ? restrictedFolders.map((folder) => `**/${rootFolder}/**/${folder}/**`)
    : [];
  const restrictedFilesPattern = restrictedFiles
    ? restrictedFiles.map((file) => `**/${rootFolder}/**/${file}`)
    : [];
  const igniteFiles = micromatch(stagedFilenames, [
    ...restrictedFoldersPattern,
    ...restrictedFilesPattern,
  ]);

  //if restricted ignite files, don't proceed.
  if (igniteFiles && igniteFiles.length > 0) {
    console.log("Can't edit these ignite files:", igniteFiles);
    throw new Error("Can't edit these ignite files:", igniteFiles);
  }
  return `echo "validation of ignite files successfull"`;
};

export default {
  [`${rootFolder}/**/*`]: [validateIgniteFiles],
  [`${rootFolder}/**/*.${extensions}`]: [
    'eslint --fix',
    'prettier --write',
    generateTSConfig,
  ],
};
