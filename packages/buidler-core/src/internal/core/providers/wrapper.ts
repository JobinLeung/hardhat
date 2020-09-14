import { EIP1193Provider, RequestArguments } from "../../../types";
import { EventEmitterWrapper } from "../../util/event-emitter";

export abstract class ProviderWrapper extends EventEmitterWrapper
  implements EIP1193Provider {
  constructor(protected readonly _wrappedProvider: EIP1193Provider) {
    super(_wrappedProvider);
  }

  public abstract async request(args: RequestArguments): Promise<unknown>;

  protected _getParams<ParamsT = any[]>(args: RequestArguments): ParamsT | [] {
    if (args.params === undefined) {
      return [];
    }

    if (typeof args.params === "object") {
      // tslint:disable-next-line only-buidler-error
      throw new Error(
        "Buidler EVM doesn't support JSON-RPC params sent as an object"
      );
    }

    return args.params as ParamsT;
  }
}
