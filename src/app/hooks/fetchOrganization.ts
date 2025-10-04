import { supabase } from "@/app/hooks/useSupabase";

export async function FetchOrganization() {

    const { data, error} = await supabase
    .from('organization')
    .select('*');

    if(error){
        console.log('error fetching organizations:', error.message);
        return[];
    }

    return data;
    
}