import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { apply } from '@Themes/OsmiProvider'
import Images from '@Images/index'
import RoundedButton from '@Components/RoundedButton'
import TitleMore from '@Components/TitleMore'
import JobCard from '@Components/JobCard'
import PostCard from '@Components/PostCard'
import FreelanceCard from '@Components/FreelanceCard'
import Loader from '@Components/Loader'
import JobActions from '@Redux/JobRedux'
import UserActions from '@Redux/UserRedux'
import SearchModal from '@Components/SearchModal'
import Icon from 'react-native-vector-icons/Ionicons'

const HomeScreen = ({ navigation }) => {
  const [jobsForYou, setJobsForYou] = useState([])
  const [recentlyPostedJobs, setRecentlyPostedJobs] = useState([])
  const [freelancingJobs, setFreelancingJobs] = useState([])
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  const { loading, jobs } = useSelector((state) => state.jobs)
  const { user, loading: userLoading } = useSelector((state) => state.user)

  useEffect(() => {
    const data = {
      token: user.token,
    }

    dispatch(JobActions.getJobsRequest())
    dispatch(UserActions.getCurrentUserRequest(data))
  }, [])

  useEffect(() => {
    if (jobs?.length > 0) {
      setJobsForYou(jobs.filter((job) => !job.isNewer && !job.isFreelance))
      setRecentlyPostedJobs(jobs.filter((job) => job.isNewer))
      setFreelancingJobs(jobs.filter((job) => job.isFreelance))
    }
  }, [jobs])

  const handleRefresh = () => {
    dispatch(JobActions.getJobsRequest())
  }

  return (
    <SafeAreaView style={apply('flex bg-white')}>
      {loading && <Loader />}
      {userLoading && <Loader />}
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#475BD8']}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={apply('p-3')}>
          <View style={apply('row mt-6 mb-4')}>
            <View style={apply('flex ')}>
              <Text style={apply('text-heading-3 font-bold -mb-1')}>
                Let's Find
              </Text>
              <Text style={apply('text-heading-3 font-bold ')}>
                Your Dream Jobs
              </Text>
            </View>
            {/* <RoundedButton
              Icon={
                <Icon
                  name='chatbubbles'
                  size={20}
                  color={apply('description-color')}
                />
              }
              onPress={() => navigation.navigate('MessagesScreen')}
            /> */}
            <RoundedButton
              image={Images.notification}
              onPress={() => navigation.navigate('NotificationScreen')}
            />
          </View>
          <TouchableOpacity
            style={apply(
              'row items-center border border-description-color rounded-10 h-45 px-3'
            )}
            onPress={() => setShowModal(true)}
          >
            <Image
              source={Images.search}
              resizeMode='center'
              style={apply('w-14 h-14')}
            />
            <Text
              style={apply('text-description-color text-description flex ml-2')}
            >
              Search a job or position
            </Text>
          </TouchableOpacity>
        </View>
        {jobs ? (
          <>
            <TitleMore
              title='Jobs For You'
              subTitle='See All'
              onPress={() => setShowModal(true)}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={jobsForYou}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <JobCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('JobDetailsScreen', {
                      id: item._id,
                    })
                  }
                  index={index}
                  length={jobsForYou.length}
                />
              )}
              contentContainerStyle={apply('px-1 mb-2')}
            />
            <TitleMore
              title='Recently Posted'
              subTitle='See All'
              onPress={() => setShowModal(true)}
            />
            <View style={apply('row wrap items-start justify-center')}>
              {recentlyPostedJobs.map((item, index) => (
                <PostCard
                  key={item._id}
                  item={item}
                  onPress={() =>
                    navigation.navigate('JobDetailsScreen', {
                      id: item._id,
                    })
                  }
                  index={index}
                  length={recentlyPostedJobs.length}
                />
              ))}
            </View>
            <TitleMore title='Freelance Jobs' />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={freelancingJobs}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <FreelanceCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('JobDetailsScreen', {
                      id: item._id,
                    })
                  }
                  index={index}
                  length={freelancingJobs.length}
                />
              )}
              contentContainerStyle={apply('px-1 mb-2')}
            />
          </>
        ) : null}
      </ScrollView>
      {showModal && <SearchModal handleClose={() => setShowModal(false)} />}
    </SafeAreaView>
  )
}

export default HomeScreen
