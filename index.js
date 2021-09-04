import './App/Config/ReactotronConfig'
import { AppRegistry, LogBox } from 'react-native'
import App from './App/Containers/App'
import { name as appName } from './app.json'

LogBox.ignoreLogs([
  'VirtualizedLists should',
  'Non-serializable values were found in the navigation state',
  "Can't perform a React state",
])

AppRegistry.registerComponent(appName, () => App)
