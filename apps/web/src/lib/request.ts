import ky from "ky";

// 创建实例
export const request = ky.create({
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        // 请求前处理
        // request.headers.set("Authorization", `Bearer ${getToken()}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 响应后处理
        if (response.status === 401) {
        }
        return response;
      },
    ],
  },
});
