import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="Login">
      <form action="/login" method="post">
        <div>
          <label>
            Username: <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            Password: <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
