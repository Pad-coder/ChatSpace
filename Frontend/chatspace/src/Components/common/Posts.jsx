import Post from "./Post.jsx";
import PostSkeleton from "../skeletons/PostSkeleton.jsx";
import {useQuery} from '@tanstack/react-query'
import { useEffect } from "react";
const Posts = ({feedType,username,userId}) => {
	const isLoading = false;

	const getPostEndPoint =()=>{
		switch (feedType){
			case "forYou":
				return "/api/post/allPost";
				case "following":
					return "/api/post/followingPosts";
					case "posts":
						return `/api/post/user/${username}`;
						case "likes":
							return `/api/post/liked/${userId}`;
					default:
						return "/api/post/allPost";
		}
	}

	const POST_ENDPOINT = getPostEndPoint();

	const {data:posts, isPending, refetch, isRefetching} = useQuery({
		queryKey:["posts"],
		queryFn: async ()=>{
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if(!res.ok){
					throw new Error(data.error || "Somthing went wrong")
				}

				return data;
			} catch (error) {
				throw new Error(error)
			}
		}
	})

	useEffect(()=>{
		refetch();
	},[feedType,refetch,username])

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading &&  !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;