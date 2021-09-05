import { memo, createRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/SearchModalStyle'
import { apply } from '@Themes/OsmiProvider'
import Images from '@Images/index'
import JobCard from './JobCard'
import SearchCard from './SearchCard'
import Statusbar from './Statusbar'

const SearchModal = ({ handleClose }) => {
  const ref = createRef()
  const [text, setText] = useState('')
  const [initialJobs, setInitialJobs] = useState([])

  const { navigate } = useNavigation()

  const { jobs } = useSelector((state) => state.jobs)

  useEffect(() => {
    setTimeout(() => ref.current.focus(), 100)
  }, [])

  const handleChange = (text) => {
    setText(text)

    if (text) {
      setInitialJobs(
        jobs.filter((job) =>
          job.title.toLowerCase().includes(text.toLowerCase())
        )
      )
    } else {
      setInitialJobs([])
    }
  }

  return (
    <>
      <Statusbar backgroundColor={apply('primary-color')} />
      <Modal visible onRequestClose={handleClose} animationType='slide'>
        <View style={apply('bg-primary-color p-2 mb-1')}>
          <View
            style={apply('row items-center rounded-10 h-45 px-3 bg-white')}
            onPress={() => setShowModal(true)}
          >
            <Image
              source={Images.search}
              resizeMode='center'
              style={apply('w-14 h-14')}
            />
            <TextInput
              ref={ref}
              style={apply('text-description-color text-description flex ml-1')}
              placeholder=' Search a job or position'
              placeholderTextColor={apply('description-color')}
              onChangeText={handleChange}
            />
          </View>
        </View>
        {initialJobs.length > 0 ? (
          <FlatList
            data={initialJobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SearchCard
                item={item}
                onPress={() => {
                  handleClose()

                  navigate('JobDetailsScreen', {
                    id: item._id,
                  })
                }}
              />
            )}
          />
        ) : (
          <View style={apply('flex justify-center items-center')}>
            <Image source={Images.search} resizeMode='center' />
            <Text style={apply('font-bold text-primary-color text-title')}>
              {text.length !== 0 ? 'Job not found' : 'Search job here'}
            </Text>
          </View>
        )}
      </Modal>
    </>
  )
}

// // Prop type warnings
// SearchModal.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// SearchModal.defaultProps = {
//   someSetting: false
// }

export default memo(SearchModal)
