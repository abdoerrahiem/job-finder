import { apply } from '@Themes/OsmiProvider'
import { Text } from 'react-native'

const ErrorMessage = ({ error }) => {
  return <Text style={apply('text-error-color my-1')}>{error}</Text>
}

export default ErrorMessage
