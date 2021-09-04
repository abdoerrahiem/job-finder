import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '@Redux/YourRedux'
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  Pressable,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/MessageScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Images from '@Images/index'
import Message from '@Components/Message'
// import IconButton from '@Components/IconButton'

const MessageScreen = (props) => {
  return (
    <SafeAreaView style={apply('flex bg-white')}>
      <Header
        title='Abdur Rahim'
        Image={
          <Image
            source={Images.profile}
            style={apply('w-25 h-25 mr-3')}
            resizeMode='center'
          />
        }
        // Icon={<IconButton name='phone' color={apply('black')} />}
      />
      <Message />
      <View style={apply('row items-center justify-center px-3 py-2')}>
        <TextInput
          multiline
          style={[
            apply('flex border border-primary-color px-5 text-black mr-3'),
            { minHeight: 25, borderRadius: 30 },
          ]}
        />
        <View
          style={apply(
            'rounded-full overflow-hidden bg-primary-color justify-center items-center'
          )}
        >
          <Pressable
            style={apply('w-50 h-50 justify-center items-center')}
            android_ripple={apply('text-devider-color')}
          >
            <Icon name='send-sharp' size={20} color={apply('white')} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
