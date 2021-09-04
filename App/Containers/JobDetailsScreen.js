import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Text, View, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apply } from '@Themes/OsmiProvider'
import Header from '@Components/Header'
import Images from '@Images/index'
import Button from '@Components/Button'
import JobActions from '@Redux/JobRedux'
import BookmarkActions from '@Redux/BookmarkRedux'
import { formatMoney } from '@Lib/TextUtils'

const JobDetailsScreen = ({ navigation, route }) => {
  const [isBookmark, setIsBookmark] = useState(false)

  const { id } = route.params

  const dispatch = useDispatch()
  const { job, loading } = useSelector((state) => state.jobs)
  const { bookmarks } = useSelector((state) => state.bookmarks)

  useEffect(() => {
    if (id) {
      const data = {
        id,
      }

      dispatch(JobActions.getJobRequest(data))
    }
  }, [id])

  useEffect(() => {
    if (!loading && bookmarks.find((bm) => bm.id === job._id)) {
      setIsBookmark(true)
    } else {
      setIsBookmark(false)
    }
  }, [bookmarks, loading])

  const handleBookmark = () => {
    const data = {
      id: job._id,
      image: job.image,
      title: job.title,
      company: job.company,
      salary: job.salary,
    }

    if (isBookmark) {
      dispatch(BookmarkActions.removeBookmark(data))
    } else {
      dispatch(BookmarkActions.createBookmark(data))
    }
  }

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      <Header
        title='Job For You'
        image={isBookmark ? Images.bookmarkActive : Images.bookmark}
        onPress={handleBookmark}
      />
      {job ? (
        <>
          <ScrollView>
            <View style={apply('px-4 pt-8')}>
              <View style={apply('justify-center items-center')}>
                <Image
                  source={{ uri: job.image }}
                  resizeMode='center'
                  style={apply('w-80 h-80')}
                />
                <Text style={apply('font-bold text-heading-4')}>
                  {job.title}
                </Text>
                <Text
                  style={apply('text-description text-description-color my-3')}
                >
                  {job.company} - {job.location}
                </Text>
                <View style={apply('row')}>
                  {job.positions.map((position) => (
                    <View
                      key={position._id}
                      style={apply('bg-blue2-color rounded-md p-2 mx-3')}
                    >
                      <Text
                        style={apply('text-description text-primary-color')}
                      >
                        {position.position}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={apply('row items-center my-3')}>
                  <Text style={apply('text-description font-bold mr-1')}>
                    ${formatMoney(job.salary)}
                  </Text>
                  <Text style={apply('text-description')}>/ month</Text>
                </View>
              </View>

              <View style={apply('my-2')}>
                <Text style={apply('font-bold text-title mb-2')}>
                  Description
                </Text>
                <Text
                  style={apply(
                    'text-caption text-description-color leading-description'
                  )}
                >
                  {job.companyDescription}
                </Text>
              </View>

              <View style={apply('my-2')}>
                <Text style={apply('font-bold text-title mb-2')}>
                  Requirements
                </Text>
                {job.requirements.map((req, index) => (
                  <View key={req._id}>
                    <View style={apply('row')}>
                      <Text
                        style={apply(
                          'text-caption text-description-color leading-description mr-2'
                        )}
                      >
                        {index + 1}.
                      </Text>
                      <Text
                        style={apply(
                          'flex text-caption text-description-color leading-description'
                        )}
                      >
                        {req.requirement}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={apply('my-2')}>
                <Text style={apply('font-bold text-title mb-2')}>
                  Job Description
                </Text>
                {job.jobDescriptions.map((desc, index) => (
                  <View key={desc._id}>
                    <View style={apply('row')}>
                      <Text
                        style={apply(
                          'text-caption text-description-color leading-description mr-2'
                        )}
                      >
                        {index + 1}.
                      </Text>
                      <Text
                        style={apply(
                          'flex text-caption text-description-color leading-description'
                        )}
                      >
                        {desc.jobDescription}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={apply('mt-2 mb-8')}>
              <Text style={apply('font-bold text-title mb-2 ml-4')}>
                Skills Needed
              </Text>
              <View style={apply('row')}>
                <FlatList
                  contentContainerStyle={apply('px-4')}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={job.skills}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={apply('bg-blue2-color rounded-md p-2 mr-3')}>
                      <Text
                        style={apply('text-description text-primary-color')}
                      >
                        {item.skill}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
          <View style={apply('p-3 border-t-2 border-devider-color')}>
            <Button
              title='Apply'
              onPress={() =>
                navigation.navigate('ApplyJobScreen', {
                  item: job,
                })
              }
            />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  )
}

export default JobDetailsScreen
