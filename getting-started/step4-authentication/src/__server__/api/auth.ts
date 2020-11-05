import { RequestHandler, rest } from 'msw';
interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  username: string;
}

const loginHandler = rest.post<LoginRequest, LoginResponse>('/auth/login', (req, res, ctx) => {
  const { username } = req.body;
  return res(
    ctx.cookie('username', username),
    ctx.json({
      username,
    }),
  );
});

const authHandlers = (): RequestHandler<any, any, any, any, any>[] => {
  return [loginHandler];
};

export default authHandlers;
