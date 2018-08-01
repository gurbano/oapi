import FetchService from './fetch';
import ApiParser from './parse';
import GeneratorService from './gen'
import TransformerService from './transform'
import fs from 'fs';
import program from 'commander';

require("babel-polyfill");

const fetcher = new FetchService();
const parser = new ApiParser();
const generator = new GeneratorService();
const transformer = new TransformerService();

program
  .version('0.0.1')
  .usage('<inputFile> <outputDir>')
  .arguments('<input> <outputDir>')
  .action(function (input, outputDir) {
   	const writer = {
		async write(filename: string, content: string): Promise<string>{
			let path = [outputDir, filename].join('/');
			if (typeof content == 'string'){
				fs.writeFileSync(path, content, 'utf8');
			}else{
				fs.writeFileSync(path, JSON.stringify(content), 'utf8');
			}
			console.log('file created in ',path);
			return content;
		}
	};

    fetcher.fetch(input)
	.then(parser.parse)
	//.then(writer.write.bind(null, 'parsed.json'))
  .then(parser.extractReference)
  .then(parser.extractReference)
  .then(parser.extractReference)
	//.then(writer.write.bind(null, 'processed.json'))
	.then(transformer.extractEndpoints)
	.then(writer.write.bind(null, 'processed.json'))
	.then(generator.generateService)
	.then(writer.write.bind(null, 'src/services.out.ts')) 
  })
  .parse(process.argv); // end with parse to parse through the input

if (!process.argv.slice(2).length) {
  	program.outputHelp();
}

