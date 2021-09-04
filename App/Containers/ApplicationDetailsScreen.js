import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Text, Image, View, Pressable, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ApplicationActions from '@Redux/ApplicationRedux'

// Styles
import styles from './Styles/ApplicationDetailsStyle'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Images from '@Images/index'
import Loader from '@Components/Loader'
import { formatMoney } from '@Lib/TextUtils'

const ApplicationDetailsScreen = ({ route, navigation }) => {
  const { id, screen } = route.params

  const dispatch = useDispatch()
  const { application, loading, error } = useSelector(
    (state) => state.applications
  )
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (id) {
      const data = { id }
      dispatch(ApplicationActions.getApplicationRequest(data))
    }
  }, [id])

  let date = new Date(application?.createdAt).toString()
  const hari = date?.split(' ')[2]
  const bulan = date?.split(' ')[1]
  const tahun = date?.split(' ')[3]
  const jam = date?.split(' ')[4]?.split(':')[0]
  const menit = date?.split(' ')[4]?.split(':')[1]
  date = `${hari} ${bulan} ${tahun}`

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {loading && <Loader />}
      <Header
        title='Your Application'
        handleBack={() =>
          screen ? navigation.navigate(screen) : navigation.goBack()
        }
      />
      {application && (
        <>
          <View style={apply('row p-4 border-b-1 border-devider-color')}>
            <Image
              source={{ uri: application.job.image }}
              resizeMode='center'
              style={apply('w-50 h-50')}
            />
            <View style={apply('flex ml-3')}>
              <View style={apply('row items-center')}>
                <Text style={apply('font-bold text-heading-6 flex')}>
                  {application.job.title}
                </Text>
                <Text style={apply('text-caption text-description-color')}>
                  {date}
                </Text>
              </View>
              <Text
                style={apply('text-caption text-description-color mb-2 mt-1')}
              >
                {application.job.company}
              </Text>
              <View style={apply('row items-center')}>
                <Text style={apply('flex text-caption')}>
                  Salary ${formatMoney(application.job.salary)} / month
                </Text>
                <View
                  style={apply(
                    'rounded bg-secondary-color py-1 px-2 rounded-10 justify-center items-center'
                  )}
                >
                  <Text style={apply('text-caption')}>
                    {application.status === 'review'
                      ? 'In review'
                      : application.status === 'not-suitable'
                      ? 'Not suitable'
                      : application.status === 'interview'
                      ? 'In interview'
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={apply('p-4 border-b-1 border-devider-color')}>
            <Text style={apply('font-bold text-title mb-3')}>Detail Jobs</Text>
            <View style={apply('row items-center mb-2')}>
              <Image
                source={Images.edit}
                resizeMode='center'
                style={apply('w-16 h-16')}
              />
              <View style={apply('row')}>
                {application?.job?.skills?.map((skill, index) => (
                  <Text key={skill._id} style={apply('ml-2 text-caption')}>
                    {skill.skill}
                    {application.job.skills.length !== index + 1 && ','}
                  </Text>
                ))}
              </View>
            </View>
            <View style={apply('row items-center mb-2')}>
              <Image
                source={Images.time}
                resizeMode='center'
                style={apply('w-16 h-16')}
              />
              <View style={apply('row')}>
                {application?.job?.positions?.map((position, index) => (
                  <Text key={position._id} style={apply('ml-2 text-caption')}>
                    {position.position}
                    {application.job.positions.length !== index + 1 && ','}
                  </Text>
                ))}
              </View>
            </View>
            <View style={apply('row items-center mb-2')}>
              <Image
                source={Images.edit}
                resizeMode='center'
                style={apply('w-16 h-16')}
              />
              <Text style={apply('ml-2 text-caption')}>
                {application.job.experience} of experience
              </Text>
            </View>
          </View>

          <Pressable
            android_ripple={apply('text-devider-color')}
            onPress={() => Linking.openURL(application.resume)}
          >
            <View style={apply('p-4 border-b-1 border-devider-color')}>
              <Text style={apply('font-bold text-title mb-3')}>Resume</Text>
              <View style={apply('row items-start')}>
                <Image
                  source={Images.document}
                  resizeMode='center'
                  style={apply('w-16 h-16')}
                />
                <View style={apply('flex ml-2 -mt-1')}>
                  <Text style={apply('font-bold text-title mb-1')}>
                    {user.name} CV.pdf
                  </Text>
                  <Text style={apply('text-caption text-description-color')}>
                    Uploaded {date}, {jam}:{menit}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  )
}

export default ApplicationDetailsScreen
