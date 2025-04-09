import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@clerk/clerk-react";
import {Endpoints} from "@/core/endpoints.ts";
import type {User} from "@/core/types.ts";
// import type {User} from "@/core/types.ts";

async function fetchUser(clerkId: string){
    const res = await fetch(Endpoints.user(clerkId))
    return await res.json()
}

export default function useGetUser(){
    const {userId} = useAuth()

    return useQuery<{user: User}>({
        queryKey: ['user', {clerkId: userId}],
        //TODO: use real clerkId
        queryFn: () => fetchUser('clerkid' as string)
    })
}