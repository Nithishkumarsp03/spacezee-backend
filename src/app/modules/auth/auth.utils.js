import jwt from "jsonwebtoken";
export const createToken = (jwtPayload, secret, expiresIn) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
