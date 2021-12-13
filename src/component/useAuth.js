function useAuth() {
  const [authed, setAuthed] = useState(false);
  const login = () => {
    return new Promise((res) => {
      setAuthed(true);
      res();
    });
  };
  const logout = () => {
    return new Promise((res) => {
      setAuthed(false);
      res();
    });
  };
  return { authed, login, logout };
}

export default useAuth;
