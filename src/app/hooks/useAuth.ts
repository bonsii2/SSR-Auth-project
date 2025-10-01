'use client'
import { useState, useEffect } from "react";
import { createClient, User } from "@supabase/supabase-js";
export function useAuth(){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        supabase.auth.getSession().then(({data: {session}})=>{
            setUser(session?.user || null)
            setLoading(false);
        })

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session)=>{
            setUser(session?.user || null)
        })

        return () =>{
            listener.subscription.unsubscribe()
        }
    }, [])

    return {user, loading}

}