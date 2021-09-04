import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

// Styles
import styles from './Styles/ReviewScreenStyle'
import { apply } from '@Themes/OsmiProvider'
import Empty from '@Components/Empty'
import Images from '@Images/index'
import { formatMoney } from '@Lib/TextUtils'

const ReviewScreen = ({}) => {
  const [initialApps, setInitialApps] = useState([])

  const { navigate } = useNavigation()

  const { applications } = useSelector((state) => state.applications)

  useEffect(() => {
    if (applications?.length > 0) {
      setInitialApps(applications.filter((app) => app.status === 'review'))
    } else {
      setInitialApps([])
    }
  }, [applications])

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {initialApps.length > 0 ? (
        <FlatList
          data={initialApps}
          keyExtractor={(item) => item._id}
          listKey='ReviewScreen'
          renderItem={({ item }) => {
            let date = new Date(item.createdAt).toString()
            const hari = date.split(' ')[2]
            const bulan = date.split(' ')[1]
            const tahun = date.split(' ')[3]
            date = `${hari} ${bulan} ${tahun}`

            return (
              <Pressable
                android_ripple={apply('text-devider-color')}
                onPress={() =>
                  navigate('ApplicationDetailsScreen', {
                    id: item._id,
                    screen: 'ApplicationScreen',
                  })
                }
              >
                <View
                  style={apply('row px-3 py-4 border-b-1 border-devider-color')}
                >
                  <Image
                    source={{ uri: item.job.image }}
                    resizeMode='center'
                    style={apply('w-50 h-50 mt-1')}
                  />
                  <View style={apply('flex ml-3')}>
                    <Text style={apply('text-heading-6 font-bold')}>
                      {item.job.title}
                    </Text>
                    <Text
                      style={apply(
                        'text-caption text-description-color mt-1 mb-2'
                      )}
                    >
                      {item.job.company}
                    </Text>
                    <Text style={apply('text-caption text-description-color')}>
                      Salary ${formatMoney(item.job.salary)} / month
                    </Text>
                  </View>
                  <Text
                    style={apply('text-description-color text-caption mt-1')}
                  >
                    {date}
                  </Text>
                </View>
              </Pressable>
            )
          }}
        />
      ) : (
        <View style={styles.container}>
          <Empty
            image={Images.empty1}
            title='No Job Review'
            subtitle="You don't save any jobs, let's explore new job and find your dream jobs"
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default ReviewScreen
