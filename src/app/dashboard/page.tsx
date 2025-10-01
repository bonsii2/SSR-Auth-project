import Link from "next/link";

Link
export  default function Page(){
    return (
      <>
        <div>dashboard Page</div>
        <form action="/api/auth/logout" method="post">
        <button type="submit">logout</button>
        </form>
        
      </>
    );
}