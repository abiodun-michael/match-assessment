import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IncomingMessage } from "http";


@Injectable()
export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean {
        const request = this.getRequest<
        IncomingMessage & { session?: Record<string, unknown> }
      >(context);
      try {
      const user = request.session?.user as any
      if(user){
          return true;
      }
      return false
      } catch (e) {
        return false;
      }
    }

    protected getRequest<T>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest();
      }
}