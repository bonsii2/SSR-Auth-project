// export default function SignUp(){
//     return <form action="/auth/signup" method="post">
//         <label htmlFor="email">email</label>
//         <input type="email" placeholder="email" name="email" />
//         <label htmlFor="password">password</label>
//         <input type="password" placeholder="password" name="password" />
//         <button type="submit">singup</button>

//     </form>
// }

export default function Login() {
  return (
    <form action="/auth/login" method="post">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="password"
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}
