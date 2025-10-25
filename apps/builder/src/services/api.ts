import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import { Effect, flow } from "effect";

export class Api extends Effect.Service<Api>()("Api", {
  dependencies: [FetchHttpClient.layer],
  effect: Effect.gen(function* () {
    const baseClient = yield* HttpClient.HttpClient;
    const client = baseClient.pipe(
      // HttpClient.mapRequest(
      //   pipe(
      //     HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"),
      //     HttpClientRequest.acceptJson,
      //   ),
      // ),
      HttpClient.mapRequest(
        flow(
          HttpClientRequest.prependUrl("https://jsonplaceholder.typicode.com"),
          HttpClientRequest.acceptJson,
        ),
      ),
    );
    return {
      getPostById: (id: string) =>
        client.get(`/posts/${id}`).pipe(Effect.scoped),
    };
  }),
}) {}
