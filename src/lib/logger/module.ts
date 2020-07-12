import {getLogger, getFormatter, getLoggerOptions} from './index'

export default function GetModuleLogger(prefix = '') {
  return getLogger({
    ...getLoggerOptions(),
    formatter: getFormatter(() => prefix)
  })
}