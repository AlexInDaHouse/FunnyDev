const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;
const { spawn } = require('child_process');

run(getEnv(process.argv));

// Deployment
function run(env) {
	console.info(`Starting deployment (env: ${env.name})...`);

	try {
		runNpmInstall();
		createConfigFile(env);

		switch (env.alias) {
			case 'dev':
				//
				break;
			case 'prod':
				//
				break;
			case 'test':
				//
				break;
			default:
				throw new Error('Environment is undefined!');
		}
	}
	catch (ex) {
		console.error(ex.name);
		console.error(ex.message);
		console.error(ex.stack);
	}

	// Run npm install
	function runNpmInstall() {
		console.info('Installing dependencies...');
		const npmInstall = spawn('npm', ['install']);
		
		npmInstall.stderr.on('data', (data) => {
			console.error(`Error: ${data}`);
			throw new Error('Runtime exception. Failed on `npm install`');
		});

		npmInstall.on('close', (code) => {
			console.info('`npm install` executed successfully.');
		});
	}

	function createConfigFile(env) {
		try {
			if (env.alias === 'dev') {
				fs.createReadStream('config.example.js')
					.pipe(fs.createWriteStream('config.js'));
			}
			else {
				fs.renameSync('config.example.js', 'config.js');
			}
		}
		catch (ex) {
			console.error(ex.message);
		}
	}
}

// Returns environment or throws exception
function getEnv(args) {
	const availableEnvs = {
		dev: {
			name: 'development',
			alias: 'dev',
			args: [
				'--dev', '-d', '-dev', '--d', '-development', '--development'
			]
		},
		prod: {
			name: 'production',
			alias: 'prod',
			args: [
				'--prod', '-p', '-prod', '--p', '-production', '--production'
			]
		},
		test: {
			name: 'test',
			alias: 'prod',
			args: [
				'--test', '-t', '-test', '--t'
			]
		}
	}

	if (args.length < 3) {
		return 'dev';
	}
	else {
		for (let env in availableEnvs) {
			for (let alias of availableEnvs[env].args) {
				if (alias === args[2]) {
					return availableEnvs[env];
				}
			}
		}
		throw new Error('Incorrect argument. This script expects 1 argument: --dev, --test or --prod');
	}
}
