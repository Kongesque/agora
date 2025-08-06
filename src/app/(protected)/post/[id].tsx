import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import posts from '../../../../assets/data/posts.json'
import PostListItem from "../../../components/PostListItem";
import comments from '../../../../assets/data/comments.json'
import CommentListItem from "../../../components/commentListItem";
import { useCallback, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPostById } from '../../../services/postService'
import { useQuery } from "@tanstack/react-query";


export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id:string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id),
  })

  const detailedPost = posts.find((post) => post.id === id)

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !data) {
    return <Text>Post Not Found</Text>
  }

  return (
    <View>
      <PostListItem post={data} isDetailedPost/>
    </View>
  );
}
