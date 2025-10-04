import EditOrganization from '@/app/components/editOrganizations'



export default async function Page({params} : {params: {id: string}}){
    const orgId = params.id;
    if(!orgId) return <p>loading...</p>

    return <EditOrganization orgId={orgId} />;
}