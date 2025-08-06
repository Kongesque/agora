
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import PostListItem from '../../../components/PostListItem';
import { supabase } from '../../../lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../../../services/postService'

export default function HomeScreen() {
    const { data: posts, isLoading, error, refetch, isRefetching } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPost(),
        staleTime: 10000
    });

    if(isLoading){
        <ActivityIndicator/>
    }
    if(error){
        <Text>Error fetching posts</Text>
    }

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostListItem post={item}/>}    
                onRefresh={refetch}
                refreshing={isRefetching}
            />
        </View>
    )
}

