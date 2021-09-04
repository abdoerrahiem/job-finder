import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '@Redux/YourRedux'
import { ScrollView, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Styles
import styles from './Styles/MessagesScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import MessageCard from '@Components/MessageCard'

const MessagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={apply('flex bg-white')}>
      <Header title='Messages' />
      <MessageCard handlePress={() => navigation.navigate('MessageScreen')} />
      {/* <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard /> */}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)
