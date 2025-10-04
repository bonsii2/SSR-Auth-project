import EditOrganization from '@/app/components/editOrganizations'



export default async function Page({params} : {params: Promise<{id: string}>}){
    const {id} =  await params;
    const orgId = id;
    if(!orgId) return <p>loading...</p>

    return <EditOrganization orgId={orgId} />;
}

