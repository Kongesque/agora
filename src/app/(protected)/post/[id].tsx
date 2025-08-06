import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import posts from '../../../../assets/data/posts.json'
import PostListItem from "../../../components/PostListItem";
import comments from '../../../../assets/data/comments.json'
import CommentListItem from "../../../components/commentListItem";
import { useCallback, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [comment,setComment] = useState<string>("")
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const inputRef = useRef<TextInput | null>(null)

  const insets = useSafeAreaInsets()
  
  const detailedPost = posts.find((post) => post.id === id)

  const postComments = comments.filter((comment) => comment.post_id === 'post-1')

  const handleReplyPress = useCallback((commentId: string) => {
    console.log(commentId)
    inputRef.current?.focus();
  }, [])

  if (!detailedPost) return <Text>Post not found!</Text>;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={{ flex: 1 }} 
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList 
        data={postComments} 
        renderItem={({ item }) => <CommentListItem comment={item} depth={0} handleReplyPress={handleReplyPress}/>}
        ListHeaderComponent={<PostListItem post={detailedPost} isDetailedPost/>}
      />
      <View
        style={{
          paddingBottom: insets.bottom,
          borderBottomWidth: 1, 
          borderBottomColor: 'lightgrey', 
          padding: 10, 
          backgroundColor: 'white', 
          borderRadius: 10, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 4,
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder="Join the conversation"
          style={{ backgroundColor: '#E4E4E4', padding: 5, borderRadius: 5 }}
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {isInputFocused && (
          <Pressable 
            style={{ 
              backgroundColor: !comment ? "lightgrey" : '#0d469b', 
              borderRadius: 15, 
              marginLeft: 'auto', 
              marginTop: 15 
            }}>
            <Text 
              style={{ 
                color: 'white', 
                paddingVertical: 5, 
                paddingHorizontal: 10, 
                fontWeight: 'bold', 
                fontSize: 13 
              }}>
                Reply
              </Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
