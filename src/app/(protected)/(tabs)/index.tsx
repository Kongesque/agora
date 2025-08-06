
import { FlatList, View } from 'react-native';
import PostListItem from '../../../components/PostListItem';
import { supabase } from '../../../lib/supabase'
import { useEffect, useState } from 'react';

export default function HomeScreen() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPost();
    }, [])

    const fetchPost = async () => {
        const { data, error } = await supabase.from('posts').select('*, group:groups(*), user:users!posts_user_id_fkey(*)');
        //console.log(error)
        //console.log('data', JSON.stringify(data, null, 2))

        setPosts(data)
    }

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostListItem post={item}/>}    
            />
        </View>
    )
}

