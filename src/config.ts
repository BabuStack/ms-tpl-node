import objectAssignDeep from 'object-assign-deep';
const pkg = require('../package.json')

// External config file
// This can be powered by external sources such
// docker config, K8s config etc
let extConfig;
try {
  extConfig = require('../config.json')
} catch (error) {
  extConfig = {};
}

interface IConfigEnv {
  port: number;
  version: string;
  tree: {
    MAX_DEPTH: number;
    MAX_NODES: number;
  };

  db: {
    mongo: {
      url: string;
      db: string;
    }
  }
}

type Env = 'test' | 'dev' | 'staging' | 'production'
type IConfig = {
  [E in Env | 'global']: Partial<IConfigEnv>;
}

const config: IConfig = {
  global: {
    port   : Number(process.env.PORT || 3000),
    version: pkg.version,
    tree   : {
      MAX_DEPTH: 5,
      MAX_NODES: 100,
    }
  },
  test: {
    db: {
      mongo: {
        url: 'mongodb://localhost:27017',
        db : 'budget-service-test'
      }
    }
  },
  dev: {
    db: {
      mongo: {
        url: 'mongodb://localhost:27017',
        db : 'budget-service-dev'
      }
    }
  },
  staging: {

  },
  production: {

  },
};

const Config: IConfigEnv = objectAssignDeep(
  config.global,
  (config as any)[process.env.NODE_ENV || 'dev'],
  extConfig
) as any;

export default Config;
