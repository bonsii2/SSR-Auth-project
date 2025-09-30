export default function Login(){
    return <form action="/auth/signUp" method="post">
        <label htmlFor="email">email</label>
        <input type="email" placeholder="email" name="email" />
        <label htmlFor="password">password</label>
        <input type="password" placeholder="password" name="password" />
        <button type="submit">singup</button>

    </form>
}