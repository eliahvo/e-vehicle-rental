import path from 'path';

/**
 * Simple logger that adds a prefix based on the file name to the console output.
 */
export class Logger {
  tag: string;

  /**
   * Initialize the logger.
   * @param filename Just call "path.basename(__filename)" from the using file to set the prefix automatically.
   */
  constructor(filename: string) {
    const name: string = path.parse(filename).name;
    const moduleName: string = name.split('.')[0];
    this.tag = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  }

  /**
   * Print a message to the console with the added prefix.
   * @param msg The message to print.
   */
  log = (msg: string) => console.log(`[${this.tag}]: ${msg}`);
}
